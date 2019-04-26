import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import ActionCreator from '../../redux/actionCreators'
import { Spin, notification } from 'antd'

import Sidebar from './Sidebar'
import ScreensGoalsContent from './Content'
import ScreensGoalsInputs from './Inputs'

import moment from 'moment'

import styled from 'styled-components'

const RenderStyle = styled.div`
    @media (max-width: 768px)  { 
        #component{
            margin:0 2vw 0 1vw
        }
    }
    @media (min-width: 768px) and (max-width: 992px) { 
        #component{
            margin: 0 7vw 0 3vw
        }
    }
    @media (min-width: 992px) and (max-width: 1200px){ 
        #component{
            margin: 0 10vw 0 6vw 
        }
    }
    @media (min-width: 1200px) { 
        #component{
            margin: 0 14vw 0 14vw 
        }
    } 
    #component{
        width: 100%
        overflow:auto
    }
`

class ScreensGoals extends Component {

    constructor(props){
        super(props)
        this.state = {
            goals: {},
            isChecked: false,
            lastChecked: {
                goalId: '',
                goalValue: '' 
            },
            goal: {   
                0: {
                    name: '',
                    description:'', 
                    start: '',
                    estimate: '',
                    end: ''
                } 
            },
            aboutGoal: {
                addNewGoal: true,
                addNewSubGoal: false, 
                goalId: '' ,
                goalValue: '',
                editGoal: false,
                addNewSubGoalForUpdate: false
            },
            panel:{
                goalId: '',
                goalValue: '',
                activeMainPanel: true
            },
            goalCreated:  '',
            collapsed: false,
            isNotified: false,
            modal: {
                optionSelectedInModal: '',
                start: '',
                end: '',
                name:'',
                visible: false,
                goalsChoosed: {},
                finded: false,
                message: ''
            }
            
        }
    }

    componentDidMount(){
        if (this.props.auth.isAuth && this.props.goal.goals){
            Object.keys(this.props.goal.goals).length === 0 ? 
                this.props.loadGoals(this.props.auth.user.uid)
                : 
                this.setState({goals: this.renderGoals()})
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.auth.isAuth && this.props.goal.goals && !this.props.goal.isLoadding && Object.keys(this.state.goals).length === 0){
            this.setState({goals: this.renderGoals()})
        }
        if (this.props.goal.isDeleted){
            this.props.resetGoal()
        }
        if (this.props.auth.isAuth && this.props.goal.goals && prevProps.goal.goals !== this.props.goal.goals){ //for get data in first time
            let goalCreated = ''  
            if (this.props.goal.goalCreated){
                goalCreated = this.props.goal.goalCreated
            }
            if (this.state.modal['optionSelectedInModal']){
                this.handleOk()
            }
            this.setState({goals: this.renderGoals(), goalCreated}) 
            this.props.resetGoal()
        }
        if (this.props.auth.isAuth && Object.keys(this.state.goals).length === 1 && !this.props.goal.goals){ //for when i remove the last goal, remove too of the sidebar
            this.setState({goals: {}})
        }
    }

    renderGoals = () => { 
        if (this.props.goal.goals){
            const keys =  Object.keys(this.props.goal.goals) 
            let length = ''
            let goals = {}
            keys.map(value => (length = Object.keys(this.props.goal.goals[value]).length) &&  
                (goals = {
                    ...goals,
                    [value]: Object.keys(this.props.goal.goals[value]).map((valueChildren, keyChilren) => keyChilren < length && ({...this.props.goal.goals[value][keyChilren]})) 
                })
            )
            return goals
        } 
        
    }

    newChildrenOfGoal = (goal, aboutGoal, key) => {
        goal = {
            ...goal,
            [key]: {
                name: '',
                description:'',
                start: '',
                estimate: '',
                end:''
            }
        }
        this.setState({goal, aboutGoal})
    }

    removeChildrenOfGoal = key => {
        const negateFilter = (negateKey, obj) => { 
            return (
                Object.keys(obj)
                    .filter(key => !key.includes(negateKey))
                    .map((value, key) => ({[key] : obj[value]}))
                    .reduce((prev, current) => {
                        return {
                            ...prev,
                            ...current  
                        }
                    }, {})
            )
        }
        let goal = ''
        if (key !== 0){
            const obj =  {...this.state.goal}
            const negateFilterForMap = key => obj => negateFilter(key, obj)
            goal = negateFilterForMap(key)(obj)
        }else{
            goal = {
                0: {
                    name: '',
                    description:'', 
                    start: '',
                    estimate: ''
                } 
            } 
        }
        this.setState({goal})
    }

    inputType = (value, key) => {
        const aboutGoal = {
            ...this.state.aboutGoal
        }
        let goal = {
            ...this.state.goal
        }
        if (!aboutGoal['addNewSubGoal']){
            aboutGoal['addNewSubGoal'] = true
        }
        if (value === 'addNewSubGoal' && this.state.goal[key-1]['name']){
            this.newChildrenOfGoal(goal, aboutGoal, key)
            this.props.resetGoal()
        }else{
            this.props.updateError('Put the name of your goal!')  
        }
    }

    renderEndOfGoals = (goals, goalId, goalValue, valueOfEnd) => {
        return {
            ...goals,
            [goalId]: {
                ...goals[goalId],
                [goalValue]:{
                    ...goals[goalId][goalValue],
                    end: valueOfEnd
                }
            }
        } 
    }

    toggleMenu = () => {
        this.setState({collapsed: !this.state.collapsed})
    }

    checked = (goalId, goalValue) => event => {
        let lastChecked = {
            ...this.state.lastChecked
        }
        let goals = this.renderGoals()
        if (goals[goalId][goalValue]['end']){
            if (lastChecked['goalId'] === goalId && lastChecked['goalValue'] === goalValue){
                goals = this.renderEndOfGoals(goals, goalId, goalValue, moment().format('YYYY-MM-DD'))
                lastChecked['goalId'] = ''
                lastChecked['goalValue'] = ''
            }else{
                goals = this.renderEndOfGoals(goals, goalId, goalValue, '')
                lastChecked = {
                    goalId,
                    goalValue
                }
            }
        }else{
            if (lastChecked['goalId'] === goalId && lastChecked['goalValue'] === goalValue){
                goals = this.renderEndOfGoals(goals, goalId, goalValue, '')
                lastChecked['goalId'] = ''
                lastChecked['goalValue'] = ''
                
            }else{
                goals = this.renderEndOfGoals(goals, goalId, goalValue, moment().format('YYYY-MM-DD')) 
                lastChecked = {
                    goalId,
                    goalValue
                }
            }
        }
        this.setState({goals, lastChecked, isChecked: true})     
    }

    handleChange = (field, goalLength, goalId) => event => {
        let goal = {
            ...this.state.goal 
        } 
        let goals = {
            ...this.state.goals
        }
        const lastChecked = {
            ...this.state.lastChecked
        }
        if (field === 'modalName'){
            this.setState({
                modal : {
                    ...this.state.modal,
                    name: event.target.value
                }
            })
            return
        }
        if (goalId){
            let value = ''
            if (field === 'start' || field === 'estimate' || field === 'end'){
                if (field === 'end' && !event){
                    lastChecked['goalId'] = ''
                    lastChecked['goalValue'] = ''
                }
                value = event ? event.format('YYYY-MM-DD') : null
            }else{
                value = event.target.value
            }
            goals = {
                ...goals,
                [goalId]:{
                    ...goals[goalId],
                    [goalLength]:{
                        ...goals[goalId][goalLength],
                        [field]: value
                    }
                }
            }
            this.setState({goals, lastChecked})
            return
        }else{
            const attributes = ['name', 'description', 'start', 'estimate']
            attributes.map((value, key) => value === field ?
                value !== 'start' && value !== 'estimate' ? 
                    goal[goalLength][value] = event.target.value
                    :
                    goal[goalLength][value] = event ? event.format('YYYY-MM-DD') : null
                : 
                null 
            )
            this.setState({goal})
        }
          
    }

    createNewGoal = () => {
        const aboutGoal = {
            ...this.state.aboutGoal,
            addNewGoal: true,
            editGoal: false
        }

        const goal = {
            0: {
                name: '',
                description:'', 
                start: '',
                estimate: '',
                end: ''
            } 
        }
        const goals = this.props.goal.goals ? this.renderGoals() : {}
        this.setState({goals, aboutGoal, goal})
    }

    addNewSubGoalforUpdate = (goalId, goalLength) => {
        const position = (goalLength-1).toString()
        goalLength = goalLength.toString()
        let goals = {...this.state.goals}
        if (goals[goalId][position]['name']){
            goals = {
                ...goals,
                [goalId]:{
                    ...goals[goalId],
                    [goalLength]:{
                        name: '',
                        description:'', 
                        start: '',
                        estimate: '',
                        end: ''
                    }
                }
            }
    
            const aboutGoal = {
                ...this.state.aboutGoal,
                goalValue: goalLength,
                addNewSubGoalForUpdate: true
            }
            this.setState({goals, aboutGoal})
            return
        }else{
            this.props.updateError('Put the name of your goal!')
        } 
    }

    openPanelOfGoalSelected = (goalId, goalValue, allClosed) => {
        const panel = {
            ...this.state.panel
        }

        if (allClosed && panel['activeMainPanel']){
            panel['activeMainPanel'] = false
        }else{
            panel['activeMainPanel'] = true
        }
        
        if (goalId === this.state.panel['goalId'] && goalValue === this.state.panel['goalValue']){
            panel['goalId'] = goalId
            panel['goalValue'] = '0'
            this.setState({panel})
            return
        }

        panel['goalId'] = goalId
        if (!panel['activeMainPanel'] && goalValue !== '0'){
            goalValue = '0'
        }else{
            panel['goalValue'] = goalValue
        }
        
        this.setState({panel})
    }

    selectedGoal = (goalId, goalValue, allClosed) => {
        this.openPanelOfGoalSelected(goalId, goalValue, allClosed)
        const aboutGoal = {
            ...this.state.aboutGoal,
            addNewGoal: false,
            goalId,
            goalValue,
            editGoal: false 
        } 
        const lastChecked = {
            ...this.state.lastChecked,
            goalId: '',
            goalValue: ''   
        }   
        const goals = this.renderGoals()

        this.setState({goals, aboutGoal, goalCreated: '', isChecked: false, lastChecked})
    }
    

    createGoal = () => {
        if (this.state.goal[0]['name']){
            const obj = {...this.state.goal}
            let goal = Object.keys(obj)
                .map((value, key) => (obj[value].name && {[key] : obj[value]}))
                .reduce((prev, current) => {
                    return{
                        ...prev,
                        ...current
                    }
                }, {})

            const {uid} = this.props.auth.user
            this.props.create(goal, uid) 
            
            goal = {   
                0: {
                    name: '',
                    description:'', 
                    start: '',
                    estimate: '',
                    end: ''
                }  
            }
            this.setState({goal, isNotified: false})
        }else{
            this.props.createError('Put the name of your goal!')  
            this.setState({isNotified: false})
        }
       
    }

    updateGoal = (goalId, goalValue, update) => {
        const aboutGoal = {
            ...this.state.aboutGoal
        }

        if (!update){
            aboutGoal['editGoal'] = true
            aboutGoal['goalId'] = goalId
            aboutGoal['goalValue'] = goalValue
            aboutGoal['addNewSubGoalForUpdate'] = goalValue === '0' ?  true : false 
            const goals = this.renderGoals()
            this.setState({aboutGoal, goals})
            return
        }else{
            let newGoal = ''
            let isNewItem = false
            const goalsLength = Object.keys(this.state.goals[goalId]).length
            if (goalsLength === Object.keys(this.props.goal.goals[goalId]).length){
                newGoal = {...this.state.goals[goalId][goalValue]}
            }else{
                const obj = {...this.state.goals[goalId]}
                newGoal = Object.keys(obj)
                    .map((value, key) => ({[value]: obj[key]}))
                    .reduce((prev, current) => {
                        return{
                            ...prev,
                            ...current
                        }
                    }, {})
                    aboutGoal['addNewSubGoalForUpdate'] && (goalValue = '0')
                    isNewItem = true
            }
            const goal = {
                goalId,
                goalValue,
                isNewItem,
                content: {
                    ...newGoal 
                }   
            }
            const {uid} = this.props.auth.user
            this.props.updateGoal(goal, uid)
            aboutGoal['editGoal'] = false
            aboutGoal['addNewSubGoalForUpdate'] = false
            this.setState({aboutGoal, isNotified: false})
            return
        }
        
    }    

    deleteGoal = (goalId, goalValue) => {
        const negateKey = (obj, goalValue) => {
            return Object.keys(obj)
                .filter(value => !value.includes(goalValue))
                .map((value, key) => ({[key] : obj[value]}))
                .reduce((prev,current) => {
                    return{
                        ...prev,
                        ...current
                    }
                }, {})
        } 
        
        if (Object.keys(this.props.goal.goals[goalId]).length === Object.keys(this.state.goals[goalId]).length){
            const goals = this.renderGoals()
            const newGoal = goalValue !== '0' && negateKey(goals[goalId], goalValue)
            let goal = {
                goalId,
                goalValue,
                content:{
                    [goalId]: {
                        ...newGoal
                    }
                }
            }
            
            const {uid} = this.props.auth.user
            this.props.deleteGoal(goal, uid)
            const aboutGoal = {
                ...this.state.aboutGoal,
                goalValue : '0'
            }
            if (goalValue === '0'){
                aboutGoal['addNewGoal'] = true 
            } 
            this.setState({aboutGoal, isNotified: false, goals})
        }else{
            let goals = {...this.state.goals}
            const newGoal = negateKey(goals[goalId], goalValue)
            goals = {
                ...goals,
                [goalId]:{
                    ...newGoal
                } 
            }
            const aboutGoal = {
                ...this.state.aboutGoal,
                goalValue : '0'
            }
            this.setState({goals, aboutGoal})
        }
    }

    openNotificationWithIcon = type => text => {
        notification[type]({
          message: text,
          style: {textAlign:'center', top:'40px', boxShadow: '15px 15px 10px 0px rgba(0,0,0,0.7)'}
        })
        this.setState({
            isNotified: true,
            modal:{
                ...this.state.modal,
                message:''
            }
        })
    }


    showModal = () => {
        const modal = {...this.state.modal, visible: true}
        this.setState({modal})
    }
    handleOk = () => {
        const modal = {
            ...this.state.modal, 
            visible: false,
            message: '',
            finded: false
        }
        const selected = modal['optionSelectedInModal']
        const obj = {...this.props.goal.goals}
        const goalsChoosed = Object.keys(obj)
            .filter(value => 
                    (selected === '0' && 
                        ((!modal['end'] && (obj[value]['0'].start >= modal['start']) && (modal['finded'] = true)) ||
                        (!modal['start'] && (obj[value]['0'].start <= modal['end']) && (modal['finded'] = true))  ||
                        (modal['start'] && modal['end'] && 
                            (obj[value]['0'].start >= modal['start'] && obj[value]['0'].start <= modal['end']) && (modal['finded'] = true)
                        )) 
                    )
                    ||
                    (selected === '1' && 
                        ((!modal['end'] && (obj[value]['0'].end >= modal['start']) && (modal['finded'] = true)) ||
                        (!modal['start'] && (obj[value]['0'].end <= modal['end']) && (modal['finded'] = true)) ||
                        (modal['start'] && modal['end'] && 
                            (obj[value]['0'].end >= modal['start'] && obj[value]['0'].end <= modal['end']) && (modal['finded'] = true)
                        ))
                    )
                    ||
                    (selected === '2' && obj[value]['0'].end && (modal['finded'] = true))
                    ||
                    (selected === '3' && !obj[value]['0'].end && (modal['finded'] = true))
                    ||
                    (selected === '4' &&  obj[value]['0'].name.includes(modal['name']) && (modal['finded'] = true))
            )
            .map(value => ({[value] : obj[value]}))
            .reduce((prev, current) => {
                return{
                    ...prev,
                    ...current
                }
            }, {})
            selected === '5' && (modal['optionSelectedInModal'] = '')
            modal['goalsChoosed'] = (selected !== '5' && modal['finded']) ? 
                {...goalsChoosed} 
                : 
                {}
            !modal['finded'] && modal['optionSelectedInModal'] && (modal['message'] = 'None goal has been finded')
            this.setState({modal})   
    }
    handleCancel = ()  => {
        const modal = {
            ...this.state.modal, 
            visible: false,
            start: '',
            end:''
        }
        this.setState({modal})
    }
    handleSelectChange = value => event => {
        const array = ['0', '1', '2', '3', '4', '5']
        if (array.includes(event)){
            this.setState({
                modal:{
                    ...this.state.modal, 
                    optionSelectedInModal: event
                }
            })
        }else{
            const modal = {
                ...this.state.modal,
                [value]: event && event.format('YYYY-MM-DD')
            }
            this.setState({modal})
        }      
    }
    
    render(){
        return(
            <Fragment> 
                {this.props.goal.isLoadding && 
                    <div style={{background:'rgba(0,0,0,0.8)', position:'absolute', width:'100vw', height:'100vh', zIndex:'3'}}>
                        <Spin 
                            style={{position:'absolute', top:"50%", left:'50%', transform:'translate(-50%, -100%)'}} 
                            tip="Loading..." 
                            size="large" 
                        />
                    </div>
                }
                <RenderStyle>
                {this.state.goalCreated && this.selectedGoal(this.state.goalCreated, '0')}
                    <div style={{display: 'flex', width:'100vw', transition: 'all 1s ease-in-out', marginTop:'0'}}>
                        { 
                            <Sidebar 
                                handleChange={this.handleChange}
                                modal={this.state.modal} 
                                showModal={this.showModal} 
                                handleOk={this.handleOk}
                                handleCancel={this.handleCancel}
                                handleSelectChange={this.handleSelectChange}
                                toggleMenu={this.toggleMenu} 
                                toggleMenuStatus={this.state.collapsed} 
                                aboutGoal={this.state.aboutGoal} 
                                goals={this.state.goals} 
                                panel={this.state.panel} 
                                createNewGoal={this.createNewGoal} 
                                checked={this.checked} 
                                selectedGoal={this.selectedGoal} 
                            />
                        } 
                        <div id='component'>
                            {this.props.goal.goalCreated && !this.state.isNotified && this.openNotificationWithIcon('success')('Goal created!')}
                            {this.props.goal.isUpdate && !this.state.isNotified && this.openNotificationWithIcon('success')('Goal updated!')}
                            {this.props.goal.isDeleted && !this.state.isNotified && this.openNotificationWithIcon('success')('Goal deleted!')}
                            {this.props.goal.error && !this.state.isNotified && this.openNotificationWithIcon('error')(this.props.goal.errorMessage)}
                            {this.state.modal.message && this.openNotificationWithIcon('error')(this.state.modal.message)}

                            {this.state.aboutGoal.addNewGoal && 
                                <ScreensGoalsInputs 
                                    createGoal={this.createGoal} 
                                    removeChildrenOfGoal={this.removeChildrenOfGoal} 
                                    inputType={this.inputType} 
                                    handleChange={this.handleChange} 
                                    goal={this.state.goal} 
                                    goalsLength={this.state.goalsLength} 
                                    aboutGoal={this.state.aboutGoal}
                                />
                            } 
                            {!this.state.aboutGoal.addNewGoal && 
                                <ScreensGoalsContent 
                                    handleChange={this.handleChange} 
                                    selectedGoal={this.selectedGoal} 
                                    addNewSubGoalforUpdate={this.addNewSubGoalforUpdate} 
                                    openPanelOfGoalSelected={this.openPanelOfGoalSelected} 
                                    panel={this.state.panel}  
                                    isChecked={this.state.isChecked} 
                                    updateGoal={this.updateGoal} 
                                    deleteGoal={this.deleteGoal} 
                                    aboutGoal={this.state.aboutGoal} 
                                    closeFieldOfUpdate={this.selectedGoal} 
                                    goals={this.state.goals}
                                />
                            }
                        </div> 
                    </div>
                </RenderStyle>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        goal: state.goal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        create: (goal, uid) => dispatch(ActionCreator.createGoalRequest(goal, uid)),
        updateGoal: (goal, uid) => dispatch(ActionCreator.updateGoalRequest(goal, uid)),
        deleteGoal: (goal, uid) => dispatch(ActionCreator.deleteGoalRequest(goal, uid)),
        loadGoals: uid => dispatch(ActionCreator.getGoalsRequest(uid)),
        remove: id => dispatch(ActionCreator.removeGoalsRequest(id)),
        resetGoal: () => dispatch(ActionCreator.resetGoal()),
        updateError: error => dispatch(ActionCreator.updateGoalFailure(error)),
        createError: error => dispatch(ActionCreator.createGoalFailure(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreensGoals)
