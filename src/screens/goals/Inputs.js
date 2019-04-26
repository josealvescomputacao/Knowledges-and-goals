import React from 'react'
import {Input, Row, DatePicker, Collapse, Button, Popconfirm, Icon} from 'antd'
import moment from 'moment'
import styled from 'styled-components'

const Panel = Collapse.Panel
const { TextArea } = Input

const RenderStyle = styled.div`
    @media (max-width: 768px)  { 
        #deleteIcon{
            position: absolute
            right: 20px
            top: 50%
            transform: translate(0%, -50%)
        }
    }
    .title{
        margin: auto 0 auto 13%
        word-wrap: break-word
        padding-right: 10px
        width: 70%
    }
    #deleteIcon{
        width: 10%
        margin: auto 0 auto auto
    }

    .inputs{
        transition: all 0.4s ease-in-out
        box-shadow: 10px 10px 25px 5px rgba(0,0,0,0.9)
    }
    .inputs:focus{
        box-shadow: 0 0 0 rgba(0,0,0,0.9)
    }

    .button{
        transition: all 0.4s ease-in-out
        box-shadow: 8px 8px 18px 6px rgba(0,0,0,0.9)
    }
    .button:hover{
        box-shadow: 0 0 0 rgba(0,0,0,0.5)
    }
    
`

const ScreensGoalsInputs = ({handleChange, inputType, createGoal, removeChildrenOfGoal, goal}) => {

    const confirmRemove = (key) => {
        removeChildrenOfGoal(key)
    }

    const renderInputs = (goalKey, attributes) => { 
        return (  
            <RenderStyle>
                <div>  
                    <Collapse 
                        style={{background:'#111c33'}} 
                        expandIcon={({ isActive }) => 
                            <Icon 
                                type="caret-right" 
                                style={{color:'white'}} 
                                rotate={isActive ? 90 : 0} 
                            />
                        }
                    >
                        <Panel 
                            style={{boxShadow:'8px 8px 20px 1px rgba(0,0,0,0.9)', borderRadius:'5px'}}
                            header={
                                <div style={{display:'flex', width:'100%', borderRadius:'5px'}}>
                                    <h3 
                                        className='title' 
                                        key={goalKey} 
                                        style={{fontWeight:'900', fontSize:'19px', color: 'white'}}
                                    >
                                        Name: {goal[goalKey]['name']}
                                    </h3>
                                    <div style={{margin:'auto 0 auto auto', width:'10%'}}>
                                        <Popconfirm 
                                            placement="bottomRight"
                                            title={'Are you sure to delete this goal?'} 
                                            onConfirm={() => confirmRemove(goalKey)} 
                                            okText="Yes" 
                                            cancelText="No"
                                        >
                                            <Button 
                                                className='button'
                                                type="danger" 
                                                shape="circle" 
                                                icon="delete" 
                                                size={'large'} 
                                            />
                                        </Popconfirm>
                                    </div>
                                </div>
                            } 
                            key={goalKey}>
                            {attributes.map((valueKey, keyChildren) => valueKey !== 'name' ?
                                <span key={keyChildren+1}>
                                    {(valueKey === 'description' && goal[goalKey][valueKey] && 
                                        <h3>Description: {goal[goalKey][valueKey]}</h3>
                                    ) ||
                                    (valueKey === 'start' && goal[goalKey][valueKey] && 
                                        <h3>Start: {goal[goalKey][valueKey]}</h3>
                                    ) ||
                                    (valueKey === 'estimate' && goal[goalKey][valueKey] && 
                                        <h3>Estimate: {goal[goalKey][valueKey]}</h3>
                                    )}
                                </span>
                                : 
                                null
                            )}
                        </Panel> 
                    </Collapse>
                </div>
            </RenderStyle>
        )
    }

    const lengthOfGoal = Object.keys(goal).length
    const goalLength = Object.keys(goal).length
    const goalValues = Object.keys(goal)
    const attributes = ['name', 'description', 'start', 'estimate']
    return (
        <RenderStyle>
            <div style={{textAlign:'center', maxHeight:'90vh', overflow:'auto', position:'relative'}}>
                <div style={{borderRadius:'10px', background:'rgba(0, 21, 41, 0.8)', boxShadow:'10px 10px 25px 5px rgba(0,0,0,0.9)', padding:'20px 0 20px 0', width:'80%', margin:'40px auto 30px auto'}}>
                    <Input  
                        className='inputs' 
                        value={goal[goalLength-1]['name']} 
                        onChange={handleChange('name', goalLength-1)} 
                        size={lengthOfGoal === 1 ? 'large': 'default'} 
                        placeholder={lengthOfGoal === 1 ? 'Put the name of goal' : 'Put the name of sub-goal'} 
                        style={{width: lengthOfGoal === 1 ? '70%' : '40%'}}
                    />
                    <Row>
                        <TextArea 
                            className='inputs' 
                            value={goal[goalLength-1]['description']} 
                            onChange={handleChange('description', goalLength-1)} 
                            placeholder='Write a description for your goal if you want' 
                            style={{width: lengthOfGoal === 1 ? '50%' : '30%', marginTop: '20px', textAlign:'center'}} 
                            rows={3} 
                        />
                    </Row>
                    <Row style={{marginTop: '20px', marginBottom:'20px'}}>  
                        {attributes.map(value => ((value === 'start') || (value ==='estimate')) &&
                            <DatePicker 
                                onChange={handleChange(value, goalLength-1)}
                                style={{marginRight:'20px', width: lengthOfGoal === 1 ? '200px' : '150px'}}
                                placeholder={value === 'start' ? 'Started in' : 'Estimate of finish'} 
                                className='inputs'
                                value={goal[goalLength-1][value] ? moment(goal[goalLength-1][value]): null} 
                                size={lengthOfGoal === 1 ? 'large' :  'big'}  
                                key={value}
                            />
                        )} 
                    </Row>    
                </div> 
                <Button 
                    onClick={() => inputType('addNewSubGoal', goalLength)} 
                    type="primary" 
                    className='button' 
                    size={'large'}
                >
                    Add
                </Button>
                <div style={{maxHeight: '36vh', overflow:'auto', zIndex:'1'}}>
                    <Collapse 
                        expandIcon={({ isActive }) => 
                            <Icon 
                                type="caret-right" 
                                style={{color:'white'}} 
                                rotate={isActive ? 90 : 0} 
                            />
                        } 
                        style={{margin:'25px 40px 0px 20px', background: 'rgba(13,30,15,0.1)', border:'1px solid black', boxShadow:'10px 10px 25px 5px rgba(0,0,0,0.9)'}} 
                        defaultActiveKey='0'
                    > 
                        <Panel 
                            header={
                                <div style={{display:'flex', width:'100%'}}>
                                    <h2 
                                        className='title' 
                                        key={0} 
                                        style={{fontWeight:'800', color: 'white'}}
                                    >
                                        Name: {goal[0]['name']}
                                    </h2>
                                    <div id='deleteIcon'>
                                        <Popconfirm 
                                            placement="bottomRight" 
                                            title={'Are you sure to delete this goal?'} 
                                            onConfirm={() => confirmRemove(0)} 
                                            okText="Yes" 
                                            cancelText="No">
                                            <Button 
                                                className='button'
                                                type="danger" 
                                                shape="circle" 
                                                icon="delete" 
                                                size={'large'} 
                                            />
                                        </Popconfirm>
                                    </div>
                                </div>
                            } 
                            key={0}
                        >
                            {goalValues.map((goalValue, goalKey) => goalKey === 0 ?
                                <div 
                                    key={0} 
                                    style={{marginBottom:'20px'}}
                                >
                                    {attributes.map((value, key) => value !== 'name' &&
                                        <span key={key+1}>
                                            {(value === 'description' && goal[goalKey][value] && 
                                                <h3>Description: {goal[goalKey][value]}</h3>
                                            ) ||
                                            (value === 'start' && goal[goalKey][value] && 
                                                <h3>Start: {goal[goalKey][value]}</h3>
                                            ) ||
                                            (value === 'estimate' && goal[goalKey][value] && 
                                                <h3>Estimate: {goal[goalKey][value]}</h3>
                                            )}
                                        </span>
                                    )}
                                </div>
                                :
                                renderInputs(goalKey, attributes)
                            )}
                        </Panel> 
                    </Collapse> 
                    <Button 
                        onClick={() => createGoal(goal)} 
                        style={{margin: '30px 0 35px 0'}} 
                        className='button' 
                        type="primary" 
                        size={'large'}
                    >
                        Create
                    </Button>
                </div>      
            </div>
        </RenderStyle>   
    )    
}

export default ScreensGoalsInputs