import { createActions } from 'reduxsauce' 

export const {
    Types,
    Creators
} = createActions({ 
  
    resetAuth: null,

    authRequest: null,
    authSuccess: ['user'],
    authFailure: ['error'],

    signinRequest: ['user', 'provider'],
    signinSuccess: ['user'],
    signinFailure: ['error'],

    sendEmailRequest: ['email'],
    sendEmailSuccess: null,
    sendEmailFailure: ['error'],

    createProfileRequest: ['user', 'provider'],
    createProfileSuccess: ['user'],
    createProfileFailure: ['error'],

    updateSettingRequest: ['setting'],
    updateSettingSuccess: ['setting', 'user'],
    updateSettingFailure: ['error'],

    
    removeProfileRequest: ['user'],
    removeProfileSuccess: null,
    removeProfileFailure: ['error'],

    destroyAuthRequest: null,
    destroyAuthSuccess: null,
    destroyAuthFailure: ['error'],


    reset: null,

    getBranchesRequest: ['uid'],
    getBranchesSuccess: ['branches'],
    getBranchesFailure: ['error'],

    createBranchRequest: ['branch', 'uid'],
    createBranchSuccess: null,
    createBranchFailure: ['error'],

    updateBranchRequest: ['branch', 'aboutImage', 'uid'],
    updateBranchSuccess: null,
    updateBranchFailure: ['error'],

    deleteBranchRequest: ['branchId', 'aboutImage', 'uid'],
    deleteBranchSuccess: null,
    deleteBranchFailure: ['error'],

    getTopicsRequest: ['branch', 'uid'],
    getTopicsSuccess: ['topics', 'branchId'],
    getTopicsFailure: ['error'],

    createTopicRequest: ['uid','branch','topic'],
    createTopicSuccess: null,
    createTopicFailure: ['error'],

    updateTopicRequest: ['uid','branch','topic'],
    updateTopicSuccess: null,
    updateTopicFailure: ['error'],

    deleteTopicRequest: ['uid','branch','topic'],
    deleteTopicSuccess: null,
    deleteTopicFailure: ['error'],

    destroyBranch: null,


    getGoalsRequest: ['uid'],
    getGoalsSuccess: ['goals'],
    getGoalsFailure: ['error'],

    createGoalRequest: ['goal', 'uid'],
    createGoalSuccess: ['id'],
    createGoalFailure: ['error'],

    updateGoalRequest: ['goal', 'uid'],
    updateGoalSuccess: null,
    updateGoalFailure: ['error'],

    deleteGoalRequest: ['goal', 'uid'],
    deleteGoalSuccess: null,
    deleteGoalFailure: ['error'],

    destroyGoal: null,

    resetGoal: null

})


export default Creators