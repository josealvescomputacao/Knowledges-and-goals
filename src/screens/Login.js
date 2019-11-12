import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionCreator from './../redux/actionCreators'

import { Grid, Input, Button, Icon, Modal, Form, Loader, Dimmer } from 'semantic-ui-react'
import { notification } from 'antd'

import BodyAccount from './AccountStyle'
import { RenderStyle } from './Login.css.js'

class ScreensLogin extends Component{

    state={
        email: '',
        password: '',
        sendEmail: '',
        passwordType: 'password',
        passwordIcon: ' slash',
        open: false,
        isNotified: false
    }

    componentDidMount(){
        this.props.reset()  
    }

    componentDidUpdate(){
        (this.props.auth.error || this.props.auth.emailSended) && this.props.reset()
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => {
        this.setState({ open: false })
        this.sendEmail()
    }

    handleChange = field => event => {
        this.setState({
            [field] : event.target.value, 
            isNotified: false
        })
    }

    login = provider => {   
        if (provider === 'emailPassword'){
            if (this.state.email === ''){
                this.props.error('Put your e-mail!')
                return
            }
            if (this.state.password  === ''){
                this.props.error('Write your password!')
                return
            }
        }
        const {email, password} = this.state
        const user = {email, password}
        this.props.login(user, provider)
    }


    sendEmail = () => {
        if (this.state.sendEmail !== ''){
            this.props.sendEmail(this.state.sendEmail)
            this.setState({sendEmail: ''})
        } 
    }
    passwordVisible = () => {
        this.setState({
            passwordType: this.state.passwordType === 'password' ? 'text' : 'password', 
            passwordIcon: this.state.passwordType === 'password' ? '' : ' slash'
        })
    } 

    openNotificationWithIcon = type => text => {
        notification[type]({
          message: text,
          style: {textAlign:'center', top:'40px', boxShadow: '15px 15px 10px 0px rgba(0,0,0,0.7)'}
        })
        this.setState({
            isNotified: true
        })
    }

    render(){
        const {open, dimmer} = this.state
        const social = ['facebook f', 'google']
        return(
            <BodyAccount>
                <RenderStyle>
                    {this.props.auth.isLoadding && 
                        <Dimmer active>
                            <Loader size='big'>Loading</Loader>
                        </Dimmer>            
                    }
                    {this.props.auth.error && !this.state.isNotified && 
                        this.openNotificationWithIcon('error')(this.props.auth.errorMessage)
                    }
                    {this.props.auth.emailSended && !this.state.isNotified && 
                        this.openNotificationWithIcon('success')('Access your email for change your password!')
                    }
                    <Grid centered>
                        <Grid.Row 
                            style={{top:'70px'}} 
                            centered 
                            columns={2}
                        >         
                            <Grid centered>
                                <Grid.Column 
                                    style={{marginBottom: '20px'}} 
                                    width={9}
                                >  
                                    <h1 
                                        id='title' 
                                        style={{textShadow:'3px 3px 5px rgba(0,0,0,0.99)' , fontWeight:700, color:'white'}}
                                    >
                                        Login
                                    </h1>       
                                    <div className="social_icon">
                                        <ul>
                                            {social.map(value => 
                                                <li 
                                                    onClick={() => this.login(value)}
                                                    key={value}
                                                >
                                                    <span>
                                                        <Icon 
                                                            style={{marginTop:'7px'}} 
                                                            size='big' 
                                                            name={value} 
                                                        />
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>       
                                </Grid.Column>  
                            </Grid>
                            <Form style={{top:'5vh', borderRadius:'5px'}}> 
                                <Grid centered>
                                    <Grid.Column width={9}>
                                    <div style={{width:'100%'}}> 
                                            <Form.Group>
                                                <Form.Input 
                                                    style={{marginBottom: '28px'}} 
                                                    onChange={this.handleChange("email")}  
                                                    autoComplete="on" 
                                                    type='text' 
                                                    name='email' 
                                                    placeholder='Email' 
                                                    icon='mail' 
                                                    iconPosition='left' 
                                                    width={16}
                                                    id='fieldEmail'
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Input 
                                                    onChange={this.handleChange("password")} 
                                                    autoComplete="on" 
                                                    style={{borderRadius:'5px'}}
                                                    placeholder="Password"
                                                    icon='lock' 
                                                    type={this.state.passwordType} 
                                                    action={{
                                                        'icon': `eye${this.state.passwordIcon}`, 
                                                        onClick: () => {this.passwordVisible('passwordType')}
                                                    }}
                                                    iconPosition='left' 
                                                    value={this.state.password}
                                                    width={16}
                                                    id='fieldPassword'
                                                />   
                                            </Form.Group>
                                        </div> 
                                    </Grid.Column> 
                                </Grid> 
                                <Grid centered>       
                                    <Grid.Column width={9}>  
                                        <Button 
                                            id='boxButton' 
                                            size='big' 
                                            style={{width:'100%'}} 
                                            onClick={() => this.login('emailPassword')} 
                                            secondary 
                                            animated
                                        >
                                            <Button.Content visible>Login</Button.Content>
                                            <Button.Content hidden>
                                                <Icon size='large' name='sign-in' />
                                            </Button.Content>
                                        </Button>
                                        
                                        <div style={{textAlign:'center', marginTop:'70px', cursor:'pointer'}}>
                                            <span 
                                                onClick={this.show('blurring')}
                                                style={{color:'white', fontSize:'18px', textShadow:'1px 1px 1px', fontWeight:600}} 
                                            >
                                                Forgot your password?
                                            </span>
                                            <Modal 
                                                style={{width:'53%', background:'rgba(0,0,0,0.0001)', boxShadow: '0 0 0 0', top: '70px'}} 
                                                dimmer={dimmer} 
                                                open={open} 
                                                onClose={this.close}
                                            >
                                                <div style={{margin: '5%'}}>
                                                    <Grid centered>
                                                        <Grid.Column width={10}>
                                                            <Input 
                                                                onChange={this.handleChange("sendEmail")}
                                                                style={{textAlign:'center',width:'100%', 'boxShadow':'15px 15px 15px 0px rgba(0,0,0,0.99)', borderRadius:'5px', opacity:0.9}} 
                                                                autoComplete="on" 
                                                                value={this.state.sendEmail} 
                                                                type="text" 
                                                                placeholder="E-mail" 
                                                                icon='mail' 
                                                                iconPosition='left'
                                                            /> 
                                                        </Grid.Column> 
                                                    </Grid>
                                                </div>                 
                                                <div style={{margin:'10px 10px 10px 10px', textAlign:'center'}}>
                                                    <Button 
                                                        onClick={this.close}
                                                        color='black' 
                                                        style={{'boxShadow':'5px 5px 10px 0px rgba(0,0,0,0.99)', marginRight:'10px'}} 
                                                    >
                                                        Nope
                                                    </Button> 
                                                    <Button
                                                        positive
                                                        icon='checkmark'
                                                        labelPosition='right'
                                                        content="Send"
                                                        onClick={this.close}
                                                        style={{'boxShadow':'5px 5px 10px 0px rgba(0,0,0,0.99)'}}
                                                    />
                                                </div>
                                            </Modal>  
                                        </div>
                                    </Grid.Column>
                                </Grid>
                                <div style={{marginTop: '30px',textAlign:'center'}}>
                                    <h2 style={{fontWeight:600, textShadow:'3px 3px 1px rgba(0,0,0,0.99)', color:'white'}}>
                                        Don't have an account? 
                                        <Link  to={'/register'}> Register</Link>
                                    </h2> 
                                </div>
                            </Form>
                        </Grid.Row>
                    </Grid>
                </RenderStyle>
            </BodyAccount>        
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (user, provider) => dispatch(ActionCreator.signinRequest(user, provider)),
        sendEmail: email => dispatch(ActionCreator.sendEmailRequest(email)),
        error: message => dispatch(ActionCreator.signinFailure(message)),
        reset: () => dispatch(ActionCreator.resetAuth())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ScreensLogin) 