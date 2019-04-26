import React,{Component, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ActionCreator from './../redux/actionCreators'
import styled from 'styled-components'
import {Grid, Button, Icon, Dimmer, Loader, Form} from 'semantic-ui-react'
import { notification } from 'antd'

const SettingBody = styled.div` 

    @media (max-width: 768px)  { 
        
        #image{
            text-align: center 
            margin-bottom: 20px
        }
        
    }
    @media (max-width: 992px)  { 
        #deleteAccount{
            position: relative
            margin-top: ${props => props.visible ? '-105px' : '-50px'}
            transition: all 1s ease-in-out
            width:100%
            z-index:0
        }
    }
    @media (min-width: 992px)  { 
        #deleteAccount{
            position: absolute
            margin-top: -50px
            left: ${props => props.visible ? '21%' : '0'}
            transition: all 1s ease-in-out
            width:100%
            z-index:0
        }
    }

    #all{
        margin-top: 40px
        text-align:center
    }

    #fieldsWhitoutPassword{ 
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
    }
    #fieldsWhitoutPassword:focus{
        box-shadow: 0 0 0 0
    }
    #password{
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
    }
    #password:focus{
        box-shadow: 0 0 0 0
    }
    #passwordConfirm{
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
    }
    #passwordConfirm:focus{
        box-shadow: 0 0 0 0
    }

    #boxButton{
        transition: all 0.3s ease-in-out
        box-shadow: 12px 12px 10px 0px rgba(0,0,0,0.7)    
    }
    #boxButton:hover{
        box-shadow: 0 0 0 0 rgba(0,0,0,0.5) 
    }
}
`

class ScreensSetting extends Component {

    state={
        name: '',
        email: '',
        password: '',
        passwordConfirm:'',
        passwordType: 'password',
        visible: false,
        passwords: {
            passwordType: 'password',
            passwordIcon: ' slash', 
            passwordTypeConfirm: 'password',
            passwordIconConfirm: ' slash', 
        },
        isNotified: false
    }

    componentDidMount(){
        if(this.props.auth.isAuth){
            this.props.reset()
            this.setState({
                email: this.props.auth.user.email,
                name: this.props.auth.user.name
            })
        }
    }

    componentDidUpdate(prevProps){
        const form = {
            ...this.state
        }
        
        if (prevProps.auth.user.email !== this.props.auth.user.email){
            form['email'] = this.props.auth.user.email
            this.setState({...form})
        } 
        if (prevProps.auth.user.name !== this.props.auth.user.name){
            form['name'] = this.props.auth.user.name
            this.setState({...form})
        }
        const {error, nameChanged, passwordChanged, emailChanged} = this.props.auth
        this.props.auth && (error || nameChanged || passwordChanged || emailChanged) && this.props.reset()
    }

    handleChange = field => (e, {value}) => {
        const form = {
            ...this.state,
            [field]: value
        }
        if (field === 'passwordConfirm'){
            if (form.password.length < 6){
                this.setState({password:'', passwordConfirm: ''})
                this.props.error('The password must be 6 characters long or more!')  
                return
            } 
            const length = form[field].length-1
            if (form['password'][length] !== form[field][length]){
                this.props.error(`The password confirm is wrong`)
                this.setState({passwordConfirm: ''})
                return
            }
        }
        document.getElementById('password').onpaste = () => false
        document.getElementById('passwordConfirm').onpaste = () => false
        this.setState({...form, isNotified: false})
    }

    update = () => {
        let {name, email, passwordConfirm} = this.state

        name === this.props.auth.user.name && (name = '')
        email === this.props.auth.user.email && (email = '')

        const setting = {
            name,
            email,
            passwordConfirm
        }
        if (email || passwordConfirm || name){
            if (passwordConfirm){
                this.setState({password:'', passwordConfirm: ''})
            }
            this.props.update(setting) 
        }else{
            this.props.error(`Change some field do update`)
        }        
    }

    removeProfile = () => {
        this.props.removeProfile()
    }

    visible = () => {
        this.setState({visible: !this.state.visible})     
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

    resetEmail = () => {
        if (this.state.email !== this.props.auth.user.email){
            this.setState({email: this.props.auth.user.email})
        }   
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
        const user = ['Name', 'Email', 'Password']
        let positions = [0, 1, 2]
        const {isAuth, authenticationChecked, isLoadding, error, errorMessage, nameChanged,emailChanged, passwordChanged} = this.props.auth
        const {isNotified, visible, name, email, password, passwordConfirm} = this.state
        const {passwordType, passwordTypeConfirm, passwordIcon, passwordIconConfirm} = this.state.passwords
        return(
            <Fragment>
                {isLoadding && 
                    <Dimmer active>
                        <Loader size='big'>Loading</Loader>
                    </Dimmer>            
                }
                {!isAuth && authenticationChecked && !error && 
                    <Redirect to='/'/>
                }
                {error &&  
                    ((errorMessage === 'Change email is sensitive and requires recent authentication. Log in again before retrying this request.' && this.resetEmail()) ||
                    (!isNotified && this.openNotificationWithIcon('error')(errorMessage)))
                }
                {positions = positions.filter((value, key) => (key === 0 && nameChanged) || (key === 1 && emailChanged) || (key === 2 && passwordChanged))}
                {(nameChanged || emailChanged || passwordChanged) && !isNotified &&
                    ((positions.length === 1 && this.openNotificationWithIcon('success')(`${user[positions[0]]} was changed!`)) ||
                    (positions.length === 2 && this.openNotificationWithIcon('success')(`${user[positions[0]]} and ${user[positions[1]]} was changed!`)) ||
                    (positions.length === 3 && this.openNotificationWithIcon('success')('Name, Email and Password was changed!')))
                }
                <SettingBody visible={visible}>
                    <Grid 
                        centered 
                        style={{height:'85vh', marginTop:'0' , padding:'40px 0 20px 0', overflowY:'auto', overflowX:'hidden', zIndex:'auto'}}
                    >
                        <Grid.Row 
                            centered 
                            columns={2}
                        >
                            <Form>
                                <Grid centered>
                                    <Grid.Column width={9}>
                                        <Form.Group>
                                            <Form.Input
                                                onChange={this.handleChange('name')}
                                                value={name}
                                                placeholder='Name'
                                                icon='user'
                                                width={16}
                                                iconPosition='left'
                                                id='fieldsWhitoutPassword'
                                            />  
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid>
                                <Grid centered>
                                    <Grid.Column width={9}>
                                        <Form.Group style={{textAlign:'center'}}>
                                            <Form.Input 
                                            onChange={this.handleChange("email")} 
                                            value={email}
                                            autoComplete="on" 
                                            type='text' 
                                            name='email' 
                                            icon='mail' 
                                            width={16}
                                            iconPosition='left' 
                                            id='fieldsWhitoutPassword'
                                        />  
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid>
                                <Grid centered>
                                    <Grid.Column  width={9}>
                                        <Form.Group>
                                            <Form.Input  
                                                onChange={this.handleChange("password")} 
                                                style={{marginBottom:'30px'}}
                                                autoComplete="on" 
                                                placeholder='Put your new password'
                                                id='password'
                                                icon='lock' 
                                                type={passwordType}
                                                action={{
                                                    icon: 'eye'+passwordIcon, 
                                                    onClick: () => this.passwordVisible('passwordType')
                                                }}
                                                iconPosition='left' 
                                                width={8} 
                                                value={password}
                                            />
                                            <Form.Input 
                                                onChange={this.handleChange("passwordConfirm")} 
                                                autoComplete="on" 
                                                id='passwordConfirm'
                                                icon='lock' 
                                                type={passwordTypeConfirm}
                                                action={{
                                                    icon: 'eye'+passwordIconConfirm, 
                                                    onClick: () => this.passwordVisible('passwordTypeConfirm')
                                                }}
                                                placeholder='Confirm your new password'
                                                iconPosition='left' 
                                                width={8} 
                                                value={passwordConfirm}
                                            />
                                        </Form.Group>
                                        <Button  
                                            id='boxButton' 
                                            size='big' 
                                            style={{width:'100%', marginTop:'20px'}} 
                                            onClick={this.update} 
                                            secondary 
                                            animated
                                        >
                                            <Button.Content visible>Update</Button.Content>
                                            <Button.Content hidden>
                                                <Icon 
                                                    size='large' 
                                                    name='sign-in' 
                                                />
                                            </Button.Content>
                                        </Button>
                                    </Grid.Column>
                                </Grid>              
                                <div id='all'>
                                    <Button 
                                        id='boxButton' 
                                        size='large' 
                                        style={{height:'56px', marginTop:'20px', background: 'red', zIndex:'1'}} 
                                        onClick={this.visible} 
                                        animated
                                    >
                                        <Button.Content 
                                            style={{color:'white'}} 
                                            visible
                                        >
                                            Delete Account
                                        </Button.Content>
                                        <Button.Content 
                                            style={{color:'white'}} 
                                            hidden
                                        >
                                            <Icon 
                                                size='large' 
                                                name='user delete' 
                                            />
                                        </Button.Content>
                                    </Button>
                                    <Grid.Row id='deleteAccount' >
                                        <Link to='/'>
                                            <Button 
                                                id='boxButton' 
                                                size='large' 
                                                style={{cursor:'pointer', background: 'blue'}} 
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
                                                        size='large' 
                                                        name='sign-in' 
                                                    />
                                                </Button.Content>
                                            </Button>
                                        </Link>
                                        <Button 
                                            id='boxButton' 
                                            size='large' 
                                            style={{background: 'red'}} 
                                            onClick={this.removeProfile} 
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
                                                    size='large' 
                                                    name='sign-in' 
                                                />
                                            </Button.Content>
                                        </Button>
                                    </Grid.Row>
                                </div>
                            </Form>
                        </Grid.Row>
                    </Grid>
                </SettingBody>
            </Fragment>
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
        reset: () => dispatch(ActionCreator.resetAuth()),
        update: setting => dispatch(ActionCreator.updateSettingRequest(setting)),
        error: message => dispatch(ActionCreator.updateSettingFailure(message)),
        removeProfile: () => dispatch(ActionCreator.removeProfileRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreensSetting)

