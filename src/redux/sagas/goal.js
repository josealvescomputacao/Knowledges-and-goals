import {put} from 'redux-saga/effects'
import ActionCreator from '../actionCreators'

export  function* getGoals(database, action){
    try{
        const goalPath = `users/${action.uid}/goals`
        const data = yield database.ref(goalPath)
        yield data.once('value', snapshot => {
            data.data = snapshot.val()
        })
        yield put(ActionCreator.getGoalsSuccess(data.data))
    }catch({message}){
        yield put(ActionCreator.getGoalsFailure(message))
    }
}

export  function* createGoal(database, action){
    try{
        const id = yield database.ref().child(`users/${action.uid}/goals`).push().key
        const {goal} = action
        const newGoal = {
            ...goal
        }
        const goalPath = `users/${action.uid}/goals/${id}`
        yield database.ref(goalPath).update(newGoal)
        yield put(ActionCreator.createGoalSuccess(id))
        yield getGoals(database, action)
    }catch({message}){
        yield put(ActionCreator.createGoalFailure(message))
    }
}

export  function* updateGoal(database, action){
    
    try{
        let {goalId, goalValue, isNewItem, content} = action.goal
        let goalPath = ''
        if (goalValue === '0' && isNewItem){
            goalPath = `users/${action.uid}/goals/${goalId}`
        }else{
            goalPath = `users/${action.uid}/goals/${goalId}/${goalValue}`
        }
        yield database.ref(goalPath).update({...content})
        yield put(ActionCreator.updateGoalSuccess())
        yield getGoals(database, action)
        
    }catch({message}){
        yield put(ActionCreator.updateGoalFailure(message))
    }
}

export  function* deleteGoal(database, action){
    try{  
        const {goalId, goalValue, content} = action.goal
        let goalPath = ''

        if (goalValue === '0'){
            goalPath = `users/${action.uid}/goals/${goalId}`
            yield database.ref(goalPath).remove()
        }else{
            goalPath = `users/${action.uid}/goals`
            yield database.ref(goalPath).update({...content})
        }
         
        yield put(ActionCreator.deleteGoalSuccess())
        yield getGoals(database, action)
    }catch({message}){
        yield put(ActionCreator.deleteGoalFailure(message))
    }
}