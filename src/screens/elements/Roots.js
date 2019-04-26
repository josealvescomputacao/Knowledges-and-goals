import React, {Fragment} from 'react'
import {
    Switch,
    Route
} from 'react-router-dom' 
import { Container } from 'semantic-ui-react'

import ScreensHome from '../Home'
import ScreensSetting from '../Setting'
import ScreensLogin from '../Login'
import ScreensRegister from '../Register'

import ScreensBranches from '../branches'
import ScreensBranchesBranch from '../branches/Branch'
import ScreensBranchesTopic from '../branches/Topic'
import ScreensBranchesNewTopic from '../branches/NewTopic'
import ScreensBranchesEditTopic from '../branches/EditTopic'

import ScreensGoals from '../goals'

const Roots = () => {
    return(
        <Fragment>
            <Route exact path='/'  component={ScreensHome}/>
            <Container>
                <Switch>   
                    <Route exact path='/setting'  component={ScreensSetting}/>
                    <Route exact path='/login'  component={ScreensLogin}/>
                    <Route exact path='/register'  component={ScreensRegister}/>
                    <Route exact path='/branches'  component={ScreensBranches}/>
                    <Route exact path='/branches/branch/:branch'  component={ScreensBranchesBranch}/>
                    
                    <Route exact path='/branches/branch/:branch/newTopic'  component={ScreensBranchesNewTopic}/>
                    <Route exact path='/branches/branch/:branch/topic/:topic'  component={ScreensBranchesTopic}/>
                    <Route exact path='/branches/branch/:branch/editTopic/:topic'  component={ScreensBranchesEditTopic}/>
                </Switch>
            </Container>
            <Route path='/goals'  component={ScreensGoals}/>  
        </Fragment>
    )
}

export default Roots