import { combineReducers } from 'redux'

import auth from './auth'
import branch from './branch'
import goal from './goal'

const rootReducer = combineReducers({
    auth,
    branch,
    goal
})

export default rootReducer