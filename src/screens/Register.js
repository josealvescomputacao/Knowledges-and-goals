import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActionCreator from './../redux/actionCreators'
import { Grid, Button, Icon, Form, Dimmer, Loader } from 'semantic-ui-react'
import { notification } from 'antd'


import BodyAccount from './AccountStyle'
import { RenderStyle } from './Register.css.js'



class ScreensRegister extends Component{

    state={ 
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        passwords: {
            passwordType: 'password',
            passwordIcon: ' slash', 
            passwordTypeConfirm: 'password',
            passwordIconConfirm: ' slash', 
        },
        isNotified: false
         
    }

    componentDidMount(){
        this.props.reset() 
    }

    componentDidUpdate(){
        this.props.auth.error && this.props.reset()  
    }
    
    handleChange = field => (e, {value}) => {
        const form = {
            ...this.state,
            [field]: value
        }

        if (field === 'passwordConfirm'){
            if (form.password.length < 6){
                this.setState({password:'', passwordConfirm: ''})
                this.props.error('The password must be longer than 6 characters!')  
                return
            }  
            const length = form[field].length-1
            if (form['password'][length] !== form[field][length]){
                this.props.error(`The password confirm is wrong`)
                this.setState({passwordConfirm: ''})
                return
            }  
        }
        document.getElementById('fieldPassword').onpaste = () => false
        this.setState({
            ...form, 
            isNotified: false
        })
    }

    register = provider => { 
        if (provider === 'emailPassword'){
            if (this.state.name.length === 0){ 
                this.props.error('Write your name!')
                return           
            }else if (this.state.name.length > 0 && this.state.name.length < 3){
                this.props.error('The name must be longer than 2 characters!')
                return           
            }
        }

        const user = {
            name : this.state.name, 
            email : this.state.email, 
            password : this.state.passwordConfirm
        }
        this.props.register(user, provider)          
    }  
    
    passwordVisible = field => {
        const icon = field === 'passwordType' ? 'passwordIcon' : 'passwordIconConfirm'
        const content = this.state.passwords[field] === 'password' ? '' : ' slash'
        this.setState({
            passwords:{
                ...this.state.passwords,
                [field]: this.state.passwords[field] === 'password' ? 'text' : 'password',
                [icon]: content  
            }
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
        const social = ['facebook f', 'google']
        return(
            <BodyAccount>
                {this.props.auth.isLoadding && 
                    <Dimmer active>
                        <Loader size='big'>Loading</Loader>
                    </Dimmer>            
                }
                {this.props.auth.error && !this.state.isNotified && 
                    this.openNotificationWithIcon('error')(this.props.auth.errorMessage)
                }
                <RenderStyle>
                    <Grid>  
                        <Grid.Row 
                            centered
                            style={{top:'14px', overflow:'auto', height:'90vh', paddingTop:'70px'}} 
                            columns={2}
                        >
                            <Grid centered>
                                <Grid.Column    
                                    style={{marginBottom: '20px'}} 
                                    width={9}
                                >
                                    <h1 
                                        style={{textShadow:'3px 3px 5px rgba(0,0,0,0.99)', color:'white', fontWeight:700}} 
                                        id='title'
                                    >
                                        Register
                                    </h1>
                                    <div className="social_icon">
                                        <ul>
                                            {social.map(value => 
                                                <li 
                                                    onClick={() => this.register(value)}
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
                            <Form style={{height:'450px', top:'5vh'}}>  
                                <Grid centered>
                                    <Grid.Column width={9}>
                                        <Form.Group style={{textAlign:'center'}}>
                                            <Form.Input
                                                onChange={this.handleChange('name')}
                                                id='fields'
                                                value={this.state.name}
                                                placeholder='Name'
                                                width={16}
                                                icon='user'
                                                iconPosition='left'
                                            />  
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid>
                                <Grid centered>
                                    <Grid.Column width={9}>
                                        <Form.Group style={{textAlign:'center'}}>
                                            <Form.Input
                                                onChange={this.handleChange('email')}
                                                id='fields'
                                                value={this.state.email}
                                                placeholder='Email'
                                                name='email'
                                                width={16}
                                                icon='mail'
                                                iconPosition='left'
                                            />
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid>
                                <Grid centered>
                                    <Grid.Column    
                                        width={9} 
                                    >
                                        <div style={{width:'100%'}}>                
                                            <Form.Group> 
                                                <Form.Input
                                                    onChange={this.handleChange('password')}
                                                    style={{marginBottom:'30px', borderRadius:'5px'}}
                                                    id='fieldPassword'
                                                    value={this.state.password}
                                                    placeholder='password' 
                                                    icon='lock' 
                                                    type={this.state.passwords.passwordType}
                                                    action={{
                                                        icon: 'eye'+this.state.passwords.passwordIcon, 
                                                        onClick: () => {this.passwordVisible('passwordType')}
                                                    }}
                                                    iconPosition='left'
                                                    width={8} 
                                                />
                                                <Form.Input
                                                    onChange={this.handleChange('passwordConfirm')}
                                                    style={{borderRadius:'5px'}}
                                                    id='fieldPassword'
                                                    value={this.state.passwordConfirm}
                                                    placeholder='Password Confirm'                               
                                                    icon='lock'
                                                    type={this.state.passwords.passwordTypeConfirm}
                                                    action={{
                                                        icon: 'eye'+this.state.passwords.passwordIconConfirm, 
                                                        onClick: () => {this.passwordVisible('passwordTypeConfirm')}
                                                    }}
                                                    iconPosition='left'
                                                    width={8}
                                                />
                                            </Form.Group>
                                        </div>
                                    </Grid.Column>
                                </Grid>
                                <Grid centered >
                                    <Grid.Column width={9}>
                                        <Button 
                                            onClick={() => this.register('emailPassword')} 
                                            style={{width:'100%', marginTop:'-10px'}}
                                            id='boxButton' 
                                            size='big' 
                                            secondary 
                                            animated
                                        >     
                                            <Button.Content visible>Register</Button.Content>
                                            <Button.Content hidden>
                                                <Icon 
                                                    size='large' 
                                                    name='sign-in' 
                                                    />
                                            </Button.Content>
                                        </Button>
                                    </Grid.Column>
                                </Grid>
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
        register: (user, provider) => dispatch(ActionCreator.createProfileRequest(user, provider)),
        error: message => dispatch(ActionCreator.createProfileFailure(message)),
        reset: () => dispatch(ActionCreator.resetAuth())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ScreensRegister) 