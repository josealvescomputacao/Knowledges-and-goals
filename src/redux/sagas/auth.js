import { put, call } from 'redux-saga/effects'
import ActionCreator from '../actionCreators'
import {providers} from './../../firebase'
import axios from 'axios'

export function* login(auth, database, action){
    try{
        let user = ''
        if (action.provider === 'emailPassword'){
            const {signInWithEmailAndPassword} = auth
            const {email, password} = action.user 
            user = yield call([auth, signInWithEmailAndPassword], email, password)        
        }

        if (action.provider === 'google'){
            user = yield auth.signInWithPopup(providers.google)
            if (user.additionalUserInfo.isNewUser){
                yield user.user.delete()
                yield put(ActionCreator.createProfileFailure("This user don't exists yet!"))
                return
            }
        }
        if (action.provider === 'facebook f'){
            user = yield auth.signInWithPopup(providers.facebook)
            if (user.additionalUserInfo.isNewUser){
                yield user.user.delete()
                yield put(ActionCreator.createProfileFailure("This user don't exists yet!"))
                return
            }
        } 
        const pathUser = `users/${user.user.uid}`
        const data = yield database.ref(pathUser)
        yield data.once('value', snapshot => {
            data.data = snapshot.val()
        })
        const userStore = {
            uid: user.user.uid,
            name: user.user.displayName,
            email: user.user.email
        }
        yield put(ActionCreator.signinSuccess(userStore))
    }catch({message}){
        if (message.split(' ')[4] === 'facebook.com'){
            yield put(ActionCreator.signinFailure('Erro com o facebook'))
            return
        }
        yield put(ActionCreator.signinFailure(message))
    }        
}


export function* isAuth(auth, database) {
    try{
        const wrapper = {
            authFunction : () => auth.currentUser
        }
        const {authFunction} = wrapper
        const user = yield call([wrapper, authFunction])
        
        if (user !== null){
            const pathUser = `users/${user.uid}`
            const data = yield database.ref(pathUser)
            yield data.once('value', snapshot => {
                data.data = snapshot.val()
            })
            const userStore = {
                uid: user.uid,
                name: user.displayName,
                email: user.email
                
            }
            yield put(ActionCreator.authSuccess(userStore))
        } 
    }catch({message}){
        yield put(ActionCreator.authFailure(message))
    } 
}

export function* sendEmail(auth, action){
    try{
        const {sendPasswordResetEmail} = auth
        yield call([auth, sendPasswordResetEmail], action.email)
        yield put(ActionCreator.sendEmailSuccess())
    }catch({message}){
        yield put(ActionCreator.sendEmailFailure(message))
    }        
}

export function* createProfile(auth, database, action){
    try{
      
        let user = ''
        let name = action.user.name
        
        if (action.provider === 'emailPassword') {
            const {createUserWithEmailAndPassword} = auth
            const {email, password} = action.user
            user = yield call([auth, createUserWithEmailAndPassword], email, password)
        }
        
        if (action.provider === 'google'){
            user = yield auth.signInWithPopup(providers.google)
            if (user.additionalUserInfo.isNewUser){
                name = user.user.displayName
            }else{
                yield put(ActionCreator.createProfileFailure('This user already exists!'))
                return
            }
        }

        if (action.provider === 'facebook f'){
            user = yield auth.signInWithPopup(providers.facebook)
            if (user.additionalUserInfo.isNewUser){
                name = user.user.displayName
            }else{
                yield put(ActionCreator.createProfileFailure('This user already exists!'))
                return
            }
        } 

        const {uid} = user.user 
        const pathUser = `users/${uid}`
        const newCadaster = {
            uid,
            name,
            email: user.user.email,
            created: user.user.metadata.creationTime,
            lastSignInTime: user.user.metadata.lastSignInTime
        }
        const {ref} = database
        const result = yield call([database,ref], pathUser) 
        const {update} = database.ref()
        yield call([result, update], newCadaster) 
        yield put(ActionCreator.createProfileSuccess(newCadaster)) 
    }catch({message}){
         yield put(ActionCreator.createProfileFailure(message))      
    }     
}

export function* updateSetting(auth, database, action){
    try{
        const {setting} = action
        const {updateProfile, updateEmail, updatePassword, ra, uid} = yield auth.currentUser
        if (setting.email){ 
            const datas = yield new Promise(resolve => {
                resolve(axios.post('https://us-central1-knowledgesandgoals.cloudfunctions.net/token?token='+ra)) 
            })
            if (datas.data === uid){
                yield call([auth.currentUser, updateEmail], setting.email)
            }    
        }
        if (setting.name){  
            const datas = yield new Promise(resolve => {
                resolve(axios.post('https://us-central1-knowledgesandgoals.cloudfunctions.net/token?token='+ra)) 
            })
            if (datas.data === uid){
                yield call([auth.currentUser, updateProfile], {displayName: setting.name})
            }  
        }
        
        if (setting.passwordConfirm){
            const datas = yield new Promise(resolve => {
                resolve(axios.post('https://us-central1-knowledgesandgoals.cloudfunctions.net/token?token='+ra)) 
            })
            if (datas.data === uid){
                yield call([auth.currentUser, updatePassword], setting.passwordConfirm)
            }     
        }
        const user = yield auth.currentUser
        let profile = {}
        Object.keys(action.setting).map(value => action.setting[value] && value !== 'passwordConfirm' ? profile = {...profile, [value]: action.setting[value]} : null)
        const pathUser = `users/${uid}`
        yield database.ref(pathUser).update({...profile})
        const data = yield database.ref(pathUser)
        yield data.once('value', snapshot => {
            data.data = snapshot.val()
        })

        const userStore = {
            uid: user.uid,
            name: user.displayName,
            email: user.email
        }
        yield put(ActionCreator.updateSettingSuccess(setting, userStore))
        
    }catch({message}){
        const emailFalse = 'This operation is sensitive and requires recent authentication. Log in again before retrying this request.'
        if (message === emailFalse){
            yield put(ActionCreator.updateSettingFailure('Change email is sensitive and requires recent authentication. Log in again before retrying this request.'))
            return
        }
        yield put(ActionCreator.updateSettingFailure(message))
    }
}

export function* removeProfile(auth, database){
    try{  
        const user = auth.currentUser
    
        const deleteFunction = () => user.delete()
        yield call([user, deleteFunction])

        const url = `/users/${user.uid}` 
        const {ref} = database
        const result = yield call([database, ref], url)
        const {remove} = database.ref() 
        yield call([result, remove])   

        yield put(ActionCreator.removeProfileSuccess()) 
        yield destroyAuth(auth)  
    }catch({message}){
         yield put(ActionCreator.removeProfileFailure(message))      
    }  
}
 

export function* destroyAuth(auth){
    try{
        const {signOut} = auth
        yield call([auth, signOut])
        yield put(ActionCreator.destroyAuthSuccess())
        yield put(ActionCreator.destroyBranch())
        yield put(ActionCreator.destroyGoal())
    }catch({message}){
        yield put(ActionCreator.destroyAuthFailure(message))
    }  
} 



