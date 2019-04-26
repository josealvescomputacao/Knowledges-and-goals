import { createReducer } from 'reduxsauce'
import {Types} from '../actionCreators'

export const INITIAL_STATE = {
    isLoadding: false,
    branches: {},
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    error: false,
    errorMessage: ''
}

export const getBranchesRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: '',
    }
}
export const getBranchesSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        branches: action.branches
    }
}
export const getBranchesFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error
    }
}


export const createBranchRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const createBranchSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isCreated: true
    }
}
export const createBranchFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        isCreated: false,
        error: true,
        errorMessage: action.error
    }
}

export const updateBranchRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const updateBranchSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdated: true
    }
}
export const updateBranchFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        isUpdated: false,
        error: true,
        errorMessage: action.error
    }
}

export const deleteBranchRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const deleteBranchSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isDeleted: true,
        isLoadding: false,
    }
}
export const deleteBranchFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error
    }
}



export const getTopicsRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
} 
export const getTopicsSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        branches:{
            ...state.branches,
            [action.branchId]:{
                ...state.branches[action.branchId],
                topics:{
                    ...action.topics
                } 
            }
        } 
    }
}
export const getTopicsFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error,
    }
}


export const createTopicRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const createTopicSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isCreated: true
    }
}
export const createTopicFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state, 
        isLoadding: false,
        error: true,
        errorMessage: action.error
    }
}

export const updateTopicRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const updateTopicSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdated: true,
        isLoadding: true
    }
}
export const updateTopicFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error
    }
}

export const deleteTopicRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const deleteTopicSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        isDeleted: true
    }
}
export const deleteTopicFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error
    }
}

export const reset = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,   
        error: false,
        errorMessage: ''
    }
}


export const destroyBranch = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        isLoadding: false,
        branches: {},
        isCreated: false,
        isUpdated: false,
        error: false,
        errorMessage: ''
    }
}  


const HANDLERS = {

    [Types.RESET] : reset,

    [Types.GET_BRANCHES_REQUEST] : getBranchesRequest,
    [Types.GET_BRANCHES_SUCCESS] : getBranchesSuccess,
    [Types.GET_BRANCHES_FAILURE] : getBranchesFailure,

    [Types.CREATE_BRANCH_REQUEST] : createBranchRequest,
    [Types.CREATE_BRANCH_SUCCESS] : createBranchSuccess,
    [Types.CREATE_BRANCH_FAILURE] : createBranchFailure,

    [Types.UPDATE_BRANCH_REQUEST] : updateBranchRequest,
    [Types.UPDATE_BRANCH_SUCCESS] : updateBranchSuccess,
    [Types.UPDATE_BRANCH_FAILURE] : updateBranchFailure,

    [Types.DELETE_BRANCH_REQUEST] : deleteBranchRequest,
    [Types.DELETE_BRANCH_SUCCESS] : deleteBranchSuccess,
    [Types.DELETE_BRANCH_FAILURE] : deleteBranchFailure,

    [Types.GET_TOPICS_REQUEST] : getTopicsRequest,
    [Types.GET_TOPICS_SUCCESS] : getTopicsSuccess,
    [Types.GET_TOPICS_FAILURE] : getTopicsFailure,

    [Types.CREATE_TOPIC_REQUEST] : createTopicRequest,
    [Types.CREATE_TOPIC_SUCCESS] : createTopicSuccess,
    [Types.CREATE_TOPIC_FAILURE] : createTopicFailure,

    [Types.UPDATE_TOPIC_REQUEST] : updateTopicRequest,
    [Types.UPDATE_TOPIC_SUCCESS] : updateTopicSuccess,
    [Types.UPDATE_TOPIC_FAILURE] : updateTopicFailure,

    [Types.DELETE_TOPIC_REQUEST] : deleteTopicRequest,
    [Types.DELETE_TOPIC_SUCCESS] : deleteTopicSuccess,
    [Types.DELETE_TOPIC_FAILURE] : deleteTopicFailure,

    [Types.DESTROY_BRANCH] : destroyBranch,


}

export default createReducer(INITIAL_STATE, HANDLERS)