import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isLoadding: false,
    goals: {},
    goalCreated: '',
    isUpdate: false,
    isDeleted: false,
    error: false,
    errorMessage: ''
}


export const getGoalsRequest = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const getGoalsSuccess = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        goals: action.goals
    }
}
export const getGoalsFailure = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error
    }
}


export const createGoalRequest = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const createGoalSuccess = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        goalCreated: action.id
    }
}
export const createGoalFailure = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        goalCreated: '',
        error: true,
        errorMessage: action.error
    }
}


export const updateGoalRequest = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const updateGoalSuccess = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        isUpdate: true
    }
}
export const updateGoalFailure = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        isUpdate: false,
        error: true,
        errorMessage: action.error
    }
}


export const deleteGoalRequest = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const deleteGoalSuccess = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        isDeleted: true
    }
}
export const deleteGoalFailure = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        isDeleted: true,
        error: true,
        errorMessage: action.error
    }
}

export const destroyGoal = (state = INITIAL_STATE, action) => {
    return{
        isLoadding: false,
        goals: {},
        goalCreated: '',
        isUpdate: false,
        isDeleted: false,
        error: false,
        errorMessage: ''
    }
}

export const resetGoal = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        goalCreated: '',
        isUpdate: false,
        isDeleted: false,
        error: false,
        errorMessage: ''
    }
}

export const HANDLERS = {
    
    [Types.RESET_GOAL]: resetGoal,

    [Types.GET_GOALS_REQUEST]: getGoalsRequest,
    [Types.GET_GOALS_SUCCESS]: getGoalsSuccess,
    [Types.GET_GOALS_FAILURE]: getGoalsFailure, 

    [Types.CREATE_GOAL_REQUEST]: createGoalRequest,
    [Types.CREATE_GOAL_SUCCESS]: createGoalSuccess,
    [Types.CREATE_GOAL_FAILURE]: createGoalFailure, 

    [Types.UPDATE_GOAL_REQUEST]: updateGoalRequest,
    [Types.UPDATE_GOAL_SUCCESS]: updateGoalSuccess,
    [Types.UPDATE_GOAL_FAILURE]: updateGoalFailure,

    [Types.DELETE_GOAL_REQUEST]: deleteGoalRequest,
    [Types.DELETE_GOAL_SUCCESS]: deleteGoalSuccess,
    [Types.DELETE_GOAL_FAILURE]: deleteGoalFailure,

    [Types.DESTROY_GOAL] : destroyGoal,
}

export default createReducer(INITIAL_STATE, HANDLERS)