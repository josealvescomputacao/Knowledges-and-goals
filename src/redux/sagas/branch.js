import {put} from 'redux-saga/effects'
import ActionCreator from '../actionCreators'

export  function* getBranches(database, action){
    try{
        const pathBranch = `users/${action.uid}/branches`
        const data = yield database.ref(pathBranch)
        yield data.once('value', snapshot => {
            data.data = snapshot.val()
        })
        yield put(ActionCreator.getBranchesSuccess(data.data))
    }catch({message}){
        yield put(ActionCreator.getBranchesFailure(message))
    }
}

export  function* createBranch(database, action){
    try{
        let branch = action.branch
        if (action.branch.changeTopicToNewBranch){
            branch = action.branch.branchName
        }

        const id = yield database.ref().child(`users/${action.uid}/branches`).push().key
        const newBranch = {
            branch
        }
        const pathBranch = `users/${action.uid}/branches/${id}`
        yield database.ref(pathBranch).update(newBranch)
        yield put(ActionCreator.createBranchSuccess(branch))
        if (!action.branch.changeTopicToNewBranch){
            yield getBranches(database, action) 
        }else{
            return id
        }
        
        
    }catch({message}){
        yield put(ActionCreator.createBranchFailure(message))
    }
}

export function* updateBranch(database, action){  
    try{  
        const url = `users/${action.uid}/branches/${action.branch.value}`
        yield database.ref(url).update(action.branch) 
        yield put(ActionCreator.updateBranchSuccess())
        yield getBranches(database, action)
    }catch({message}){
        yield put(ActionCreator.updateBranchFailure(message))
    }  
}

export  function* deleteBranch(database, action){
    try{
        const pathBranch = `users/${action.uid}/branches/${action.branchId}`
        yield database.ref(pathBranch).remove()
        yield put(ActionCreator.deleteBranchSuccess())
        yield getBranches(database, action)
    }catch({message}){
        yield put(ActionCreator.deleteBranchFailure(message))
    }
}

export  function* getTopics(database, action){
    try{
        const data = yield database.ref(`users/${action.uid}/branches/${action.branch.branchId}/topics`)
        yield data.once('value', snapshot => {
            data.data = snapshot.val()
        })
        yield put(ActionCreator.getTopicsSuccess(data.data, action.branch.branchId))
    }catch({message}){
        yield put(ActionCreator.getTopicsFailure(message))
    }
}


export  function* createTopic(auth, database, storage, action){
    try{  
        const user = yield auth.currentUser
        const {topicName, titles, contents, dates, image} = action.topic
        let imageName = ''
        let imagePath = ''
        if (image){
            const uploadTask = yield storage.ref(`users/${user.uid}/${action.branch.branchName}/${topicName}/${image[0].name}`).put(image[0])   
            imagePath = yield new Promise(resolve => {
                uploadTask.ref.getDownloadURL().then(downloadURL => {
                    resolve(downloadURL)
                    imageName = image[0].name
                })
            })
        }
        
        const id = yield database.ref().child(`users/${action.uid}/branches/${action.branch.branchId}/topics}`).push().key    
        const newpath = `users/${action.uid}/branches/${action.branch.branchId}/topics/${id}`
        const topic = {
            topicName,
            titles, 
            contents,
            imagePath,
            imageName,
            dates: {
                created: dates,
                lastEdit: [''],
            }
        }
        yield database.ref(newpath).update(topic)
        yield put(ActionCreator.createTopicSuccess(topic))
        yield getTopics(database, action)
    }catch({message}){
        yield put(ActionCreator.createTopicFailure(message))
    }
}

export function* updateTopic(database, storage, action){  
    try{  
        const {branchName, branchId, oldBranchName, listOfBranches} = action.branch
        const {topicName, topicId, image, lastImageName, lastImagePath, justDeleteImage, titles, contents, dates} = action.topic
        let imageName = lastImageName
        let imagePath = lastImagePath

        if (image || justDeleteImage){ 
            if (justDeleteImage){    //if just delete an image
                let uploadTask = yield storage.ref(`users/${action.uid}/${branchName}/${topicName}/${lastImageName}`)
                yield uploadTask.delete()
                imageName = ''
                imagePath = ''
            }else{                   //if will put an image
                let uploadTask = ''
                if (lastImageName){   //if have an image
                    uploadTask = yield storage.ref(`users/${action.uid}/${branchName}/${topicName}/${lastImageName}`)
                    yield uploadTask.delete()
                }
                uploadTask = yield storage.ref(`users/${action.uid}/${branchName}/${topicName}/${image[0].name}`).put(image[0])
                imagePath = yield new Promise(resolve => {
                    uploadTask.ref.getDownloadURL().then(downloadURL => {
                       resolve(downloadURL)
                       imageName = image[0].name
                   })
               })
            }
        }
        const topic = {
            titles,
            contents,
            imageName,
            imagePath,
            topicName,
            dates: {
                created: dates.created,
                lastEdit: dates.lastEdit,
            },
        }

        const changedBranch = oldBranchName && Object.keys(listOfBranches)
            .filter(value => listOfBranches[value] === branchName)

        let createdBranch = ''
        if (oldBranchName && !changedBranch[0]){ // get id of new branch created
            createdBranch =  yield createBranch(
                database, 
                action = {
                    ...action, 
                    branch: {
                        ...action.branch, 
                        changeTopicToNewBranch: true
                    }
                }
            )
        }
        const url = !oldBranchName ? 
            `users/${action.uid}/branches/${branchId}/topics/${topicId}` //just change topicName
            :
            changedBranch[0] ?
                `users/${action.uid}/branches/${changedBranch}/topics/${topicId}` //change branchName(it was already created)
                :
                `users/${action.uid}/branches/${createdBranch}/topics/${topicId}` //create a new branchName 

        yield database.ref(url).update(topic) 
        if (!oldBranchName){     //just change topicName (put topic in other branch, and then remove topic of the old branch, and then get all topics of selected branch)
            yield put(ActionCreator.updateTopicSuccess())
            yield getTopics(database, action)
        }else{ //(put topic in other branch, and then remove topic of the old branch, and then get all branches)
            yield put(ActionCreator.updateTopicSuccess()) 
            action = {
                ...action,
                branch: {
                    ...action.branch,
                    changeTopicToAnotherBranch: true
                }
            }
            yield deleteTopic(database, action)
        }
    }catch({message}){
        yield put(ActionCreator.updateTopicFailure(message))
    }  
}

export  function* deleteTopic(database, action){
    try{  
        const newpath = `users/${action.uid}/branches/${action.branch.branchId}/topics/${action.topic.topicId}`
        yield database.ref(newpath).remove()
        yield put(ActionCreator.deleteTopicSuccess())
        if (!action.branch.changeTopicToAnotherBranch){
            yield getTopics(database, action)
        }else{
            yield getBranches(database, action)
        }
    }catch({message}){
        yield put(ActionCreator.deleteTopicFailure(message))
    }
}