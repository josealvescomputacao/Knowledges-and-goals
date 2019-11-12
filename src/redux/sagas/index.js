import { takeLatest, all, put } from 'redux-saga/effects'
import ActionCreator, { Types } from '../actionCreators'

import { auth, database, storage } from '../../firebase'

import { isAuth, login, sendEmail, createProfile, updateSetting, removeProfile, destroyAuth } from './auth'
import { getBranches, createBranch, updateBranch, deleteBranch, getTopics, createTopic, updateTopic, deleteTopic } from './branch'
import { getGoals, createGoal, updateGoal, deleteGoal } from './goal'


export default function* rootSaga(){
    const user = yield new Promise(resolve => {
        auth.onAuthStateChanged(data => {
            resolve(data)
        })  
    })

    yield all([
        takeLatest(Types.AUTH_REQUEST, isAuth, auth, database),
        takeLatest(Types.SIGNIN_REQUEST, login, auth, database),
        takeLatest(Types.SEND_EMAIL_REQUEST, sendEmail, auth),
        takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile, auth, database),
        takeLatest(Types.UPDATE_SETTING_REQUEST, updateSetting, auth, database),
        takeLatest(Types.REMOVE_PROFILE_REQUEST, removeProfile, auth, database),
        takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth, auth),
     
        
        takeLatest(Types.GET_BRANCHES_REQUEST, getBranches, database),
        takeLatest(Types.CREATE_BRANCH_REQUEST, createBranch, database),
        takeLatest(Types.UPDATE_BRANCH_REQUEST, updateBranch, database, storage),    
        takeLatest(Types.DELETE_BRANCH_REQUEST, deleteBranch, database, storage),

        takeLatest(Types.GET_TOPICS_REQUEST, getTopics, database),
        takeLatest(Types.CREATE_TOPIC_REQUEST, createTopic, auth, database, storage),
        takeLatest(Types.UPDATE_TOPIC_REQUEST, updateTopic, database, storage),
        takeLatest(Types.DELETE_TOPIC_REQUEST, deleteTopic, database),


        takeLatest(Types.GET_GOALS_REQUEST, getGoals, database),
        takeLatest(Types.CREATE_GOAL_REQUEST, createGoal, database),
        takeLatest(Types.UPDATE_GOAL_REQUEST, updateGoal, database),  
        takeLatest(Types.DELETE_GOAL_REQUEST, deleteGoal, database),    
        
        put(ActionCreator.authRequest()),
        user && put(ActionCreator.getBranchesRequest(user.uid)),
        user && put(ActionCreator.getGoalsRequest(user.uid))
    ])
}