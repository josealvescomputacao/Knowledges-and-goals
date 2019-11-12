import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionCreator from '../../redux/actionCreators'
import { Menu, Segment, Button ,Container, Icon } from 'semantic-ui-react'
import { notification } from 'antd'

import { RenderStyle } from './Navbar.css.js'

class Navbar extends Component {
    state = { 
      open: false,
      display: false,
      isNotified: false
    }

    componentDidUpdate(){
      if (!this.props.auth.isAuth && !this.props.auth.afterLoggedIn && this.state.isNotified){
        this.setState({isNotified: false})
      }
    }
    
    open = () => {this.setState({open: true })}

    close = () => this.setState({ open: false })

    logout = () => {
      this.props.destroyAuth()
      this.display()
    }

    display = () => {
      this.setState({display: !this.state.display})
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

    render() {
      return (
        <Fragment>
          <RenderStyle displays={this.state.display}>
            {!this.props.auth.isAuth && this.props.auth.isLoggedOut &&
                <Redirect to='/'/>
            }
            {this.props.auth.isAuth && this.props.auth.afterLoggedIn && !this.state.isNotified && 
              this.openNotificationWithIcon('success')(`Welcome ${this.props.auth.user.name 
                ? this.props.auth.user.name 
                : this.props.auth.user.email}!`
              )
            }
            {this.props.auth.isAuth && this.props.auth.afterLoggedIn && 
              <Redirect to={`/branches`}/>
            }
            <Segment style={{background:'rgba(0, 21, 41, 0.9)', marginBottom: '0px', minHeight:'5vh', zIndex:'3', boxShadow:'0px 15px 25px 5px rgba(0,0,0,0.9)'}}>
              <Icon 
                onClick={() => this.display()} 
                id='bars' 
                size='large' 
                name='bars'
              />
              <Menu 
                id='menu' 
                style={{background:'rgba(225, 21, 41, 0)', border:'none'}} 
                size='huge'
              >
                <Container>
                  <Link  to='/'>
                    <Button 
                      onClick={() => this.display()} 
                      className='links' 
                      size='big' 
                      style={{color:'white', background: 'rgba(13,30,15,0.1)', zIndex:'1'}} 
                      floated='right' 
                      animated='fade'
                    >
                      <Button.Content visible >Home</Button.Content>
                      <Button.Content hidden>
                          <Icon size='large' name='home' />
                      </Button.Content>
                    </Button>
                  </Link>
                  {this.props.auth.isAuth &&
                    <Link to='/branches'>
                      <Button 
                        onClick={() => this.display()} 
                        className='links' 
                        size='big' 
                        style={{color:'white', background: 'rgba(13,30,15,0.1)'}} 
                        floated='right' 
                        animated='fade'
                      >
                        <Button.Content visible>Branches</Button.Content>
                        <Button.Content hidden>
                            <Icon 
                              size='large' 
                              name='code branch' 
                            />
                        </Button.Content>
                      </Button>
                    </Link>
                  }  
                  {this.props.auth.isAuth &&
                    <Link to='/goals'>
                      <Button 
                        onClick={() => this.display()} 
                        className='links' 
                        size='big' 
                        style={{color:'white', background: 'rgba(13,30,15,0.1)'}} 
                        floated='right' 
                        animated='fade'
                      >
                        <Button.Content visible>Goals</Button.Content>
                        <Button.Content hidden>
                          <Icon 
                            size='large' 
                            name='crosshairs' 
                          />
                        </Button.Content>
                      </Button>
                    </Link>
                  }  
                </Container>
                {!this.props.auth.isAuth &&
                  <Link to='/login'>
                    <Button 
                      onClick={() => this.display()}
                      style={{color:'white', background: 'rgba(13,30,15,0.1)'}}  
                      className='links' 
                      size='big' 
                      floated='right' 
                      animated='fade'
                    >
                      <Button.Content visible>Login</Button.Content>
                      <Button.Content hidden>
                          <Icon 
                            size='large' 
                            name='user' 
                          />
                      </Button.Content>
                    </Button>
                  </Link>
                }
                {!this.props.auth.isAuth &&
                  <Link to='/register'>
                    <Button 
                      onClick={() => this.display()} 
                      className='links' 
                      size='big' 
                      style={{color:'white', background: 'rgba(13,30,15,0.1)'}} 
                      floated='right' 
                      animated='fade'
                    >
                      <Button.Content visible>Register</Button.Content>
                      <Button.Content hidden>
                          <Icon 
                            size='large' 
                            name='user plus' 
                          />
                      </Button.Content>
                    </Button>
                  </Link>
                }
                {this.props.auth.isAuth &&
                  <Link to='/setting'>
                    <Button 
                      onClick={() => this.display()} 
                      className='links' size='big' 
                      style={{color:'white', background: 'rgba(13,30,15,0.1)'}} 
                      floated='right' 
                      animated='fade'
                    >
                      <Button.Content 
                        style={{color:'yellow'}} 
                        visible
                      >
                        Setting
                      </Button.Content>
                      <Button.Content hidden>
                          <Icon 
                            size='large' 
                            name='setting' 
                          />
                      </Button.Content>
                    </Button>
                  </Link>
                } 
                {this.props.auth.isAuth &&
                  <Button 
                    className='links' 
                    size='big' 
                    style={{color:'white', background: 'rgba(13,30,15,0.1)'}} 
                    animated='fade' 
                    onClick={this.logout}
                  >
                    <Button.Content 
                      style={{color:'red'}} 
                      visible
                    >
                      Left
                    </Button.Content>
                      <Button.Content hidden>
                        <Icon 
                          size='large' 
                          name='user' 
                        />
                    </Button.Content>
                  </Button>             
                }
              </Menu>
            </Segment>
          </RenderStyle>
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
    destroyAuth: () => dispatch(ActionCreator.destroyAuthRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar) 