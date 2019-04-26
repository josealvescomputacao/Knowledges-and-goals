import React from 'react'
import { Menu, Icon, Checkbox, Button, Modal, Select, DatePicker, Input} from 'antd'
import {Popup} from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'

const Option = Select.Option

const BodySidebar = styled.div` 
    @media (max-width: 768px)  { 
        #sidebar{
            max-width: 180px
        }
    }
    @media (min-width: 768px) and (max-width: 992px) { 
        #sidebar{
            max-width: 250px
        }
    }
    @media (min-width: 992px)  { 
        #sidebar{
            max-width: 350px 
        }
    }
    .button{
        transition: all 0.4s ease-in-out
        box-shadow: 8px 8px 18px 6px rgba(0,0,0,0.9)
    }
    .button:hover{
        box-shadow: 0 0 0 rgba(0,0,0,0.5)
    }
`
const PopupStyle = {
    borderRadius: '5px',
    background:'rgba(0, 21, 41, 0)'
}

const Sidebar = ({handleChange, createNewGoal, checked, selectedGoal, aboutGoal, goals, panel, toggleMenu, toggleMenuStatus, showModal, handleOk, handleCancel, handleSelectChange, modal}) => {

    const renderSidebar = goalId => {
        const obj = {...goals[goalId]}
        const isChecked = Object.keys(obj)
            .map((value, key) => ({[key] : obj[value]['end']}))
            .reduce((prev,current) => {
                return{
                    ...prev, 
                    ...current
                }
            }, {})
        const keysGoal = Object.keys(goals[goalId])
        const length = Object.keys(goals[goalId]).length
        return ( 
            length !== 1 ? 
                <Menu.SubMenu  
                    key={goalId} 
                    title={
                        <span 
                            style={{marginLeft: toggleMenuStatus? '-25px' : '0'}} 
                            onClick={() => selectedGoal(goalId, '0')}
                        >
                            <Checkbox checked={isChecked[0]} onChange={(e) => checked(goalId, '0')(e)}/>
                            <span style={{fontSize:'22px'}}>{goals[goalId]['0']['name']}</span>
                        </span>
                    }
                >
                    {keysGoal.map((value, key) =>  key < length && key !== 0 ?
                        <Menu.Item 
                            onClick={() => selectedGoal(goalId, value)}
                            style={{whiteSpace: toggleMenuStatus? 'nowarp' : 'normal', height: toggleMenuStatus? '40px' : 'auto'}} 
                            key={goalId+value}
                        >
                            <Checkbox 
                                onChange={(e) => checked(goalId, value)(e)}
                                checked={isChecked[key]} 
                            />
                            <span style={{fontSize:'18px'}}>{goals[goalId][value]['name']}</span>
                        </Menu.Item> 
                        :
                        null 
                    )}
                </Menu.SubMenu>
                :
                <Menu.Item 
                    onClick={() => selectedGoal(goalId, '0')}
                    style={{whiteSpace: toggleMenuStatus? 'nowarp' : 'normal', height: toggleMenuStatus? '40px' : 'auto'}} 
                    key={goalId} 
                >
                    <Checkbox 
                        style={{display: toggleMenuStatus ? 'none' : 'inline'}} 
                        checked={isChecked[0]} 
                        onChange={(e) => checked(goalId, '0')(e)}
                    />
                    <span style={{marginLeft: toggleMenuStatus? '-25px' : '0', fontSize:'20px'}}>{goals[goalId]['0'].name}</span>
                </Menu.Item>
        )    
    }

    const optionsToFilter = ['Range between Start', 'Range between End', 'Ended', 'Not Ended', 'Name', "Dont't filter"]
    const rangeOfDate = ['start', 'end']
    const length = goals && Object.keys(goals).length 
    const valuesGoals = goals ? length !== 0 && Object.keys(goals) : []
    const valuesModal = Object.keys(modal['goalsChoosed']).length > 0 ? Object.keys(modal['goalsChoosed']) : null
    const itemSelected = [panel['goalId']+panel['goalValue']]
    return (
        <BodySidebar>
            <div 
                id='sidebar' 
                style={{position:'relative', boxShadow: '10px -8px 25px 5px rgba(0,0,0,0.9)', height:'95vh', overflow:'auto'}}
            >
                <div style={{padding:'5px 0 5px 0', marginTop:'0px',background:'rgba(0, 21, 41, 0.8)', width:'100%', position:'relative', boxShadow: '10px 10px 25px 5px rgba(0,0,0,0.9)', zIndex:'1'}}> 
                    <Popup
                        trigger={
                            <div style={{margin:'20px 0 20px', textAlign:'center'}}>
                                <Button 
                                    type="primary" 
                                    className='button' 
                                    onClick={toggleMenu}
                                >
                                    <Icon type={toggleMenuStatus ? 'menu-unfold' : 'menu-fold'} />
                                </Button>
                            </div>
                        }
                        content='To change the width of the sidebar'
                        position='right center'
                        style={PopupStyle}
                        inverted
                    /> 
                    <Popup
                        trigger={
                            <div style={{marginBottom:'0', textAlign:'center'}}>
                                <Button 
                                    onClick={() => createNewGoal()}
                                    style={{background:'rgba(0, 40, 41, 0.9)', color:'white'}}
                                    className='button' 
                                    type="default" 
                                    shape="circle" 
                                    icon="plus" 
                                    size={'large'} 
                                />
                            </div> 
                        }
                        content='To create a new goal'
                        position='right center'
                        style={PopupStyle}
                        inverted
                    />
                </div>
                <Menu
                    style={{height:'62vh', position:'relative', overflow:'auto', background:'rgba(0, 21, 41, 0.8)', marginTop:'0px', padding: '0px 10px 0 0 ', boxShadow: '10px 10px 25px 5px rgba(0,0,0,0.9)', transition: 'all 1s ease-in-out'}}
                    theme={'dark'}
                    mode="inline"
                    selectedKeys={panel['goalValue'] !== '0' ? itemSelected[0] : aboutGoal['goalValue']}
                    inlineCollapsed={toggleMenuStatus}
                >    
                    {!valuesModal ? 
                        valuesGoals && valuesGoals.map(value => renderSidebar(value)) 
                        : 
                        valuesModal && !modal['changed'] && valuesModal.map(value => renderSidebar(value))
                    } 
                    <Modal
                        title="Filter goals by date or name"
                        visible={modal.visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div>
                            <div style={{textAlign:'center', marginBottom:'20px'}}>
                                <Select 
                                    onChange={(value) => handleSelectChange()(value)}
                                    style={{ width: '50%' }}
                                    value={modal['optionSelectedInModal'] ? 
                                        modal['optionSelectedInModal'] 
                                        : 
                                        'Filter by'
                                    } 
                                    placeholder='Filter by' 
                                >
                                    {optionsToFilter.map((value, key) => <Option value={key.toString()}>{value}</Option>)}
                                </Select>
                            </div>
                            {(modal['optionSelectedInModal'] === ('0') || modal['optionSelectedInModal'] === ('1')) &&
                                <div style={{textAlign: "center"}}>
                                    {rangeOfDate.map(value => 
                                        <DatePicker 
                                            value={value === 'start' ? 
                                                modal.start ? 
                                                    moment(modal.start) : null 
                                                :
                                                modal.end ? 
                                                    moment(modal.end) : null
                                            } 
                                            style={{marginRight: value === 'start' && '10px'}} 
                                            placeholder={value === 'start' ? 
                                                'Range start' 
                                                : 
                                                'Range end'  
                                            } 
                                            onChange={handleSelectChange(value)}
                                        />
                                    )}
                                </div>
                            }
                            {modal['optionSelectedInModal'] === '4' && 
                                <Input 
                                    onChange={handleChange('modalName')}
                                    className='inputs' 
                                    value={modal['name']} 
                                    size={'default'} 
                                    placeholder={'Put the name of goal'}
                                />
                            }
                        </div>
                    </Modal>  
                </Menu>
                <div style={{position:'relative', width:'100%', height:'120px', textAlign:'center', padding:'10px 0 10px 0', background:'rgba(0, 21, 41, 0.8)', boxShadow: '10px -8px 25px 5px rgba(0,0,0,0.9)', zIndex:'2'}}>
                        <Button 
                            className='button' 
                            type="primary" 
                            onClick={showModal}
                        >
                            <h4 style={{color:'white'}}>Filter</h4>
                        </Button>
                    </div>  
            </div>          
        </BodySidebar>  
    )
}

export default Sidebar