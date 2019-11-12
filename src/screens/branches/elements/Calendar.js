import React from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'

export const Calendar = ({modalOpen, handleOpen, handleClose, changeDate, moment}) => {
    return(
        <Modal
            trigger={
                <Button 
                    style={{background:'rgba(0, 21, 41, 0.9)'}} 
                    className='boxButton' 
                    onClick={handleOpen} 
                    floated='left' 
                    animated
                >
                    <Button.Content 
                        style={{color:'white', fontSize:'18px', padding:'3px 0 3px 0'}} 
                        visible
                    >
                        Calendar
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon  
                            size='large' 
                            style={{color:'white'}} 
                            name='calendar alternate' 
                        />
                    </Button.Content>
                </Button>
            }
            open={modalOpen}
            onClose={handleClose}
            basic
            size='small'
        >
            <Modal.Content>
                <InputMoment
                    moment={moment}
                    style={{backgroundColor:'rgba(0,0,0,0.5)', background:'black'}}
                    onChange={changeDate}
                />
                <Modal.Actions>
                    <Button 
                        style={{marginLeft: '247px', marginTop: '10px'}} 
                        color='green' 
                        onClick={handleClose} 
                        inverted
                    >
                        <Icon 
                            name='checkmark'  
                            style={{color:'white'}}
                        /> 
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal.Content>           
        </Modal>
    )
}