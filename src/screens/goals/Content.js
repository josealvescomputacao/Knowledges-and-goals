import React from 'react'
import {Icon as IconAntd, Input, Row, DatePicker, Collapse, Button, Popconfirm} from 'antd'
import styled from 'styled-components'
import moment from 'moment'

const { TextArea } = Input
const Panel = Collapse.Panel

const RenderStyle = styled.div`
    .title{
        margin: auto 0 auto auto
        word-wrap: break-word
        padding-rigth: 10px
        width: 56%
    }
    .icons{
        width: 22%
        margin: auto 0 auto 0
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

const ScreensGoalsContent = ({handleChange, updateGoal, deleteGoal, closeFieldOfUpdate, addNewSubGoalforUpdate, openPanelOfGoalSelected, panel, goals, isChecked, aboutGoal}) => {

    const confirmRemove = (goalId, goalValue) => {
        deleteGoal(goalId, goalValue)
    }

    const renderGoal = (obj, goalId, goalValue, attributes) => {
        return (    
            <div key={goalValue}>
                <RenderStyle>
                    <Collapse 
                        style={{background:'#111c33'}} 
                        expandIcon={({ isActive }) => 
                            <IconAntd 
                                type="caret-right" 
                                style={{color:'white'}} 
                                rotate={isActive ? 90 : 0} 
                            />
                        } 
                        onChange={() => openPanelOfGoalSelected(goalId, goalValue)} 
                        activeKey={panel.goalValue}
                    >
                        <Panel 
                            style={{boxShadow:'8px 8px 20px 1px rgba(0,0,0,0.9)', borderRadius:'5px'}}
                            header={
                                <div style={{display:'flex', width:'100%', borderRadius:'5px'}}>
                                    <h3 
                                        className='title' 
                                        style={{fontWeight:'900', fontSize:'19px', color:'white'}}
                                    >
                                        Name: {obj[goalValue]['name']}
                                    </h3>
                                    <div className='icons'>
                                        <Button 
                                            onClick={() => updateGoal(goalId, goalValue, false)} 
                                            style={{margin:'0 10px 10px 0px'}}
                                            className='button' 
                                            type="primary" 
                                            shape="circle" 
                                            icon="edit" 
                                            size='default' 
                                        />
                                        <Popconfirm 
                                            placement="bottomRight" 
                                            title={'Are you sure to delete this goal?'} 
                                            onConfirm={() => confirmRemove(goalId, goalValue)} 
                                            okText="Yes" 
                                            cancelText="No"
                                        >
                                            <Button  
                                                style={{margin:'0 10px 0 0px'}}
                                                className='button'  
                                                type="danger" 
                                                shape="circle" 
                                                icon="delete" 
                                                size='default'
                                            />
                                        </Popconfirm>
                                    </div>
                                </div>
                            } 
                            key={goalValue}    
                        >
                            {attributes.map((value, key) => value !== 'name'?
                                <span key={key+1}>
                                    {(value === 'description' && obj[goalValue]['description'] && 
                                        <h3>Description: {obj[goalValue][value]}</h3>
                                    ) ||
                                    (value === 'start' && obj[goalValue][value] && 
                                        <h3>Start in: {obj[goalValue][value]}</h3>
                                    ) ||
                                    (value === 'estimate' && obj[goalValue][value] && 
                                        <h3>Estimate: {obj[goalValue][value]}</h3>
                                    ) ||
                                    (value === 'end' && obj[goalValue][value] && 
                                        <h3>End: {obj[goalValue][value]}</h3>
                                    )}
                                </span>
                                : null
                            )}
                        </Panel>
                    </Collapse>
                </RenderStyle>
            </div>
        )
    }  

    const {goalId, goalValue} = aboutGoal
    const goalKeys = goals ? Object.keys(goals[goalId]) : []
    const goalLength = goals && Object.keys(goals[goalId]).length 
    const obj = goals && {...goals[goalId]}
    const attributes = ['name', 'description', 'start', 'estimate', 'end']
    return(
            <div style={{position:'relative', textAlign:'center', maxHeight:'92vh', overflow:'auto'}}>
                <RenderStyle>
                    {(aboutGoal.editGoal || isChecked) &&
                        <div style={{borderRadius:'10px', background:'rgba(0, 21, 41, 0.9)', width:'80%', margin:'50px auto 30px auto', padding:'0px 0 20px 0', boxShadow:'10px 10px 25px 5px rgba(0,0,0,0.9)'}}>
                            {attributes.map((value, key) => 
                                <span key={key}>
                                    {
                                        (value === 'name' && 
                                            <Row>
                                                <Input 
                                                    onChange={handleChange(value, goalValue , goalId)} 
                                                    style={{width: goalValue === '0' ? '70%' : '40%', marginBottom:'20px'}}
                                                    className='inputs'
                                                    size={goalValue === '0' ? 'large': 'default'} 
                                                    placeholder={goalValue === '0' ? 'Put the name of goal' : 'Put the name of sub-goal'}
                                                    value={obj[goalValue][value]}  
                                                    
                                                />
                                                <Button 
                                                    onClick={() => closeFieldOfUpdate(goalId, goalValue)}
                                                    style={{margin:'0 -20px 0 10px'}}  
                                                    className='button' 
                                                    icon='close' 
                                                    shape="circle" 
                                                    type="danger" 
                                                    size={'large'} 
                                                />  
                                            </Row>
                                        ) ||
                                        (value === 'description' && 
                                            <Row>
                                                <TextArea 
                                                    onChange={handleChange(value, goalValue , goalId)} 
                                                    style={{width: goalValue === '0' ? '50%' : '30%', margin: '0px 0px 20px 0px'}} 
                                                    className='inputs'
                                                    value={obj[goalValue][value]} 
                                                    placeholder='Write a description for your goal if you want'  
                                                    rows={3} 
                                                />
                                            </Row>
                                        ) ||
                                        ((value === 'start' || value === 'estimate' || (value === 'end' && obj[goalValue][value])) &&
                                            <span >
                                                <DatePicker 
                                                    onChange={handleChange(value, goalValue, goalId)}   
                                                    style={{margin: value !== 'end' ? '0 20px 20px 20px' : '0 0 20px 0', width: goalValue === '0' ? '200px' : '150px'}}
                                                    className='inputs'
                                                    size={goalValue === '0' ? 'large' :  'big'}
                                                    placeholder={value === 'start' ? 'Start In' : value === 'estimate' && 'Estimate of finish'}
                                                    value={obj[goalValue][value] ? 
                                                        moment(obj[goalValue][value]) 
                                                        : 
                                                        null
                                                    }   
                                                />
                                            </span>
                                        )    
                                    } 
                                </span>
                            )}
                            <div style={{display:'flex'}}>
                                {aboutGoal['addNewSubGoalForUpdate'] &&  
                                    <Button 
                                        onClick={() => addNewSubGoalforUpdate(goalId, goalLength)}
                                        style={{flex:'1', marginLeft:'10px'}}   
                                        className='button' 
                                        size={'large'}
                                    >
                                        New
                                    </Button>
                                }  
                                <Button 
                                    onClick={() => updateGoal(goalId, goalValue, true)}
                                    style= {{flex:'1', margin:'0 10px 0 10px'}} 
                                    className= 'button'   
                                    type= "primary" 
                                    size= {'large'}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    }
                    <Collapse 
                        style={{maxHeight: (isChecked || aboutGoal.editGoal) ? '37vh' : '77vh', background: 'rgba(13,30,15,0.1)', border:'1px solid black' , overflowX:'hidden', margin:'40px 40px 40px 25px', boxShadow:'10px 10px 25px 5px rgba(0,0,0,0.9)'}} 
                        expandIcon={({ isActive }) => 
                            <IconAntd 
                                type="caret-right" 
                                style={{color:'white'}} 
                                rotate={isActive ? 90 : 0} 
                            />
                        } 
                        onChange={() => openPanelOfGoalSelected(goalId, goalValue, true)} 
                        activeKey={panel['activeMainPanel'] ? '0' : null}
                    >  
                        <Panel 
                            header={
                                <div style={{display:'flex', width:'100%'}}>
                                    <h2 
                                        key={'0'} 
                                        style={{fontWeight: '800', color:'white'}} 
                                        className='title'
                                    >
                                        Name: {obj['0']['name']}
                                    </h2>
                                    <div className='icons'>
                                        <Button
                                            onClick={() => updateGoal(goalId, '0', false)} 
                                            className='button'
                                            style={{margin:'0 10px 10px 0px'}} 
                                            type="primary" 
                                            shape="circle" 
                                            icon="edit" 
                                            size='default' 
                                        />
                                        <Popconfirm 
                                            placement="bottomRight" 
                                            title={'Are you sure to delete this goal?'} 
                                            onConfirm={() => confirmRemove(goalId, goalValue)} 
                                            okText="Yes" 
                                            cancelText="No"
                                        >
                                            <Button 
                                                style={{margin:'0 10px 0 0px'}} 
                                                className='button'
                                                type="danger" 
                                                shape="circle" 
                                                icon="delete" 
                                                size='default' 
                                            />
                                        </Popconfirm>
                                    </div>
                                </div>
                            } 
                            key={'0'}
                        >                  
                            {attributes.map((value, key) => value !== 'name' ?
                                <span key={key}> 
                                    {(value === 'description' && obj['0'][value] && 
                                        <h3>Description: {obj['0'][value]}</h3>
                                    ) ||
                                    (value === 'start' && obj['0'][value] && 
                                        <h3>Start: {moment(obj['0'][value]).format('YYYY-MM-DD')}</h3>
                                    ) ||
                                    (value === 'estimate' && obj['0'][value] && 
                                        <h3>Estimate: {moment(obj['0'][value]).format('YYYY-MM-DD')}</h3>
                                    ) ||
                                    (value === 'end' && obj['0'][value] && 
                                        <h3>End: {moment(obj['0'][value]).format('YYYY-MM-DD')}</h3>
                                    )} 
                                </span>  
                                :
                                null
                            )}
                            <div style={{ marginTop:'20px'}}>                
                                {(goalValue === '0' || aboutGoal['addNewSubGoalForUpdate']) ?
                                    goalKeys.map(value => value !== '0' && 
                                        renderGoal(obj, goalId, value, attributes)
                                    )
                                    :
                                    renderGoal(obj, goalId, goalValue, attributes) 
                                } 
                            </div>         
                        </Panel>
                    </Collapse>
                </RenderStyle>
            </div>
    )
}

export default ScreensGoalsContent