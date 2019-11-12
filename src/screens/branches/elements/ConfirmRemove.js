import React from 'react'
import { Button, Icon, Header } from 'semantic-ui-react'

export const ConfirmRemove = (props) => {
    return(
        <div>
            <Header style={{color:'white'}} as='h4'>Are you Sure?</Header>
            <Button 
                onClick={props.handleClosePopup} 
                style={{background:'grey'}} 
                animated
            >
                    <Button.Content 
                        style={{color:'white'}}  
                        visible
                    >
                        No
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon 
                            style={{color:'white'}} 
                            name='cancel' 
                        />
                    </Button.Content>
                </Button>
                <Button 
                    style={{background:'green'}} 
                    onClick={() => props.delete()} 
                    animated
                >
                    <Button.Content 
                        style={{color:'white'}} 
                        visible
                    >
                        Yes
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon 
                            style={{color:'white'}} 
                            name='check' 
                        />
                    </Button.Content>
            </Button>
        </div>
    )
}