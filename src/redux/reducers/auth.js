import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isAuth: false,
    isLoadding: false,
    authenticationChecked: false,
    afterLoggedIn: false,
    isLoggedOut: false, 
    user: {},
    nameChanged: false,
    emailChanged: false,
    passwordChanged: false,
    emailSended: false,
    error: false,
    errorMessage: ''
}


export const authRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        authenticationChecked: false,
        error: false,
        errorMessage: ''
    }
}
export const authSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        authenticationChecked: true,
        isAuth: true,
        user: action.user
    }
}
export const authFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        authenticationChecked: true,
        isAuth: false,
        error: true,
        errorMessage: action.error
    }
}  

export const sendEmailRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: '',
        emailSended: false,
        isLoadding: true,
    }
}


export const sendEmailSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        emailSended: true,
        isLoadding: false,
    }
}
export const sendEmailFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error,
    }
}


export const destroyAuthRequest = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        error: false,
        errorMessage: ''
    }
} 
export const destroyAuthSuccess = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        isAuth: false,
        authenticationChecked: true,
        isLoggedOut: true, 
        user : {}
    }
}  
export const destroyAuthFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        error: true,
        errorMessage: action.error
    }
}


export const signinRequest  = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const signinSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoadding: false,
        authenticationChecked: false,
        isLoggedOut: false,
        afterLoggedIn:true,
        isAuth: true,
        user: action.user,
    }
}
export const signinFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        isLoadding: false,
        isAuth: false,
        error: true,
        errorMessage: action.error
    }
}

export const createProfileRequest  = (state = INITIAL_STATE, action) => {
    return {    
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const createProfileSuccess = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        afterLoggedIn:true,
        isAuth: true,
        user: action.user,
    }
}
export const createProfileFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        isLoadding: false,
        error: true,
        isAuth: false,
        errorMessage: action.error
    }
}

export const updateSettingRequest = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        error: false,
        errorMessage: '',
        nameChanged: false,
        passwordChanged: false,
        emailChanged: false,
        isLoadding: true    
    }
}
export const updateSettingSuccess = (state = INITIAL_STATE, action) => { 
    const {name, email, passwordConfirm} = action.setting
    return {
        ...state,
        isLoadding: false,
        nameChanged: name && name,
        emailChanged: email && email,
        passwordChanged: passwordConfirm && passwordConfirm,
        user: {...state.user, ...action.user}
    }
}
export const updateSettingFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        isLoadding: false,
        emailChanged: false,
        passwordChanged: false,
        error: true,
        errorMessage: action.error
    }
}


export const removeProfileRequest  = (state = INITIAL_STATE, action) => {
    return {    
        ...state,
        isLoadding: true,
        error: false,
        errorMessage: ''
    }
}
export const removeProfileSuccess = (state = INITIAL_STATE, action) => { 
    return {
        ...state,
        isLoadding: false,
        isAuth: false,
    }
}
export const removeProfileFailure = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        isLoadding: false,
        error: true,
        errorMessage: action.error
    }
}


export const resetAuth = (state = INITIAL_STATE, action) => {
    return{
        ...state,
        error: false,
        errorMessage: '',
        isLoadding: false,
        nameChanged: false,
        emailChanged: false,
        passwordChanged: false,
        emailSended: false
    }
} 


export const HANDLERS = {
    
    [Types.RESET_AUTH]: resetAuth, 

    [Types.AUTH_REQUEST]: authRequest,
    [Types.AUTH_SUCCESS]: authSuccess,
    [Types.AUTH_FAILURE]: authFailure,

    [Types.SIGNIN_REQUEST]: signinRequest,
    [Types.SIGNIN_SUCCESS]: signinSuccess,
    [Types.SIGNIN_FAILURE]: signinFailure, 

    [Types.SEND_EMAIL_REQUEST]: sendEmailRequest,
    [Types.SEND_EMAIL_SUCCESS]: sendEmailSuccess,
    [Types.SEND_EMAIL_FAILURE]: sendEmailFailure,

    [Types.CREATE_PROFILE_REQUEST]: createProfileRequest,
    [Types.CREATE_PROFILE_SUCCESS]: createProfileSuccess,
    [Types.CREATE_PROFILE_FAILURE]: createProfileFailure, 

    [Types.UPDATE_SETTING_REQUEST]: updateSettingRequest,
    [Types.UPDATE_SETTING_SUCCESS]: updateSettingSuccess,
    [Types.UPDATE_SETTING_FAILURE]: updateSettingFailure,

    [Types.REMOVE_PROFILE_REQUEST]: removeProfileRequest,
    [Types.REMOVE_PROFILE_SUCCESS]: removeProfileSuccess,
    [Types.REMOVE_PROFILE_FAILURE]: removeProfileFailure,

    [Types.DESTROY_AUTH_REQUEST]: destroyAuthRequest,
    [Types.DESTROY_AUTH_SUCCESS]: destroyAuthSuccess,
    [Types.DESTROY_AUTH_FAILURE]: destroyAuthFailure,
    
}

export default createReducer(INITIAL_STATE, HANDLERS)