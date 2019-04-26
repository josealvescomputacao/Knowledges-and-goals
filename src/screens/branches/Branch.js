import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {Table, Icon, Header, Popup, Button, Dimmer, Loader} from 'semantic-ui-react'
import { notification } from 'antd'

import {connect} from 'react-redux'
import ActionCreator from '../../redux/actionCreators'

import styled from 'styled-components'

import { ConfirmRemove } from './elements/ConfirmRemove'

const PopupStyle = {
    borderRadius: '5px',
    background:'rgba(0, 21, 41, 0)',
    color:'white',
    outline:'0',
    border:'none'
}

const RenderStyle = styled.div`
    .button{
        transition: all 0.4s ease-in-out
        box-shadow: 8px 8px 15px 4px rgba(0,0,0,0.9)
        
    }
    .button:hover{
        box-shadow: 0 0 0 rgba(0,0,0,0.5)
    }
`

class ScreensBranchesBranch extends Component{

    constructor(props){
        super(props)
 
        const url = window.location.href.split('/')
        const branchName = url[url.length-1].replace(/%20/g, ' ')

        const branchKey = Object.keys(this.props.branch.branches)
            .filter(value =>  this.props.branch.branches[value].branch === branchName)

        this.state = {
            branch: {
                branchId: branchKey[0],
                branchName
            },
            deleteBranch:{
                key: '',
                isOpen: false
            },
            willDeleted: ''
            
        }
    }

    componentDidMount(){
        if (this.props.branch.isCreated || this.props.branch.isUpdated || this.props.branch.isDeleted){
            this.props.reset()
        }
    }

    componentDidUpdate(){
        if (this.props.auth.isAuth && !this.state.branch.branchId){ //just entry in refresh
            const branchKey = Object.keys(this.props.branch.branches)
                .filter(value =>  this.props.branch.branches[value].branch === this.state.branch.branchName)
            this.setState({
                branch: {
                    ...this.state.branch,
                    branchId: branchKey[0]
                }
            })    
        } 
        this.props.branch.isDeleted && this.props.reset()
    }


    handleChange = field => event => {
        this.setState({[field]: event.target.value })
    }

    delete = (id, topicName) => {
        const topic = {topicId: id}
        this.props.delete(this.props.auth.user.uid, this.state.branch, topic)   
        this.setState({isNotified: false, willDeleted: topicName})
    }

    handleOpenPopup = key => {
        const deleteBranch = {
            ...this.state.deleteBranch, 
            key,
            isOpen: true
        } 
        this.setState({deleteBranch})
    }
    handleClosePopup = key => {
        const deleteBranch = {
            ...this.state.deleteBranch,
            key,
            isOpen: false
        } 
        this.setState({deleteBranch})
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


    renderBranchs = (value, key) => {
        const {branchId, branchName} = this.state.branch
        const {topicName} = this.props.branch.branches[branchId]['topics'][value]
        return (
            <Table.Body key={key}>
                <Table.Row  textAlign='center'> 
                    <Table.Cell>
                        <Header as='h2'>
                            <Link to={`/branches/branch/${branchName}/topic/${topicName}`}>{topicName}</Link>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        <Header style={{color:'#A4A4A4'}} as='h3'>
                            {this.props.branch.branches[branchId]['topics'][value].dates['created'][0]}
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={`/branches/branch/${branchName}/editTopic/${topicName}`}>
                            <Button 
                                icon
                                style={{cursor: 'pointer', background: 'rgba(13,30,15,0.1)', borderRadius:'50px', color:'blue'}} 
                                className='button'
                                size='mini'
                            >
                                <Icon size='big' name='edit'/>
                            </Button>
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Popup 
                            trigger={
                                <Button 
                                    icon
                                    style={{cursor: 'pointer', background: 'rgba(13,30,15,0.1)', borderRadius:'50px', color:'blue'}} 
                                    className='button'
                                    size='mini'
                                >
                                    <Icon size='big' style={{cursor:'pointer'}} color='red' name='trash alternate'/>
                                </Button>
                            }  
                            hideOnScroll={false}
                            on='click'
                            style={{background: 'rgba(13,30,15,0.1)'}}
                            position='right center'
                            open={key === this.state.deleteBranch['key'] && this.state.deleteBranch['isOpen']}
                            onOpen={() => this.handleOpenPopup(key)}
                            onClose={() => this.handleClosePopup(key)}
                            content={
                                <ConfirmRemove delete={() => this.delete(value, topicName)} handleClosePopup={this.handleClosePopup}/>
                            } 
                        />  
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        )
    }

    render(){
        const {branchId} = this.state.branch
        const headers = ['Name', 'Created', 'Options']
        const keys = branchId && this.props.branch.branches[branchId]['topics'] ?
            Object.keys(this.props.branch.branches[branchId]['topics']) 
            :
            []
        return(
            <Fragment>
                {this.props.branch.isLoadding && 
                    <Dimmer active>
                        <Loader size='big'>Loading</Loader>
                    </Dimmer>            
                }
                {this.props.branch.error && !this.state.isNotified && this.openNotificationWithIcon('error')(this.props.branch.errorMessage)}
                {this.props.branch.isDeleted && !this.state.isNotified && this.openNotificationWithIcon('success')(`The topic ${this.state.willDeleted} was deleted `)}
                <RenderStyle>
                    <div style={{background:'rgba(0, 21, 41, 0.9)', paddingBottom:'10px', textAlign:'center', boxShadow: '6px 15px 25px 5px rgba(0,0,0,0.9)', position:'relative', left: '50%', transform: 'translate(-50%, 0%)', top:'20px', width: "70vw", zIndex:'1', borderRadius:'10px'}}>
                        {!this.props.branch.isLoadding && 
                            <Link to='/branches'>
                                <Popup
                                    trigger={<Button 
                                        icon
                                        style={{cursor: 'pointer', background: 'rgba(13,30,15,0.1)', borderRadius:'50px', marginTop:'10px'}} 
                                        className='button'
                                        size='mini'
                                    >
                                        <Icon 
                                            color='green' 
                                            size='big' 
                                            name='arrow left'
                                        />
                                    </Button>}
                                    content='Back to branchs!'
                                    position='left center' 
                                    style={PopupStyle}
                                />
                            </Link>
                        }
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {!this.props.branch.isLoadding &&
                            <Link to={`/branches/branch/${this.state.branch.branchName}/newTopic`}>
                                <Popup
                                    trigger={
                                        <Button 
                                            icon
                                            style={{cursor: 'pointer', background: 'rgba(13,30,15,0.1)', borderRadius:'50px', color:'blue'}} 
                                            className='button'
                                            size='mini'
                                        >
                                            <Icon 
                                                size="big"
                                                name='add' 
                                                secondary='true' 
                                                floated='center'
                                            />
                                        </Button>
                                    }
                                    content='Create a new topic!'
                                    position='right center' 
                                    style={PopupStyle}
                                />   
                            </Link>
                        }
                    </div>
                    <div style={{
                            position:'absolute',
                            top:'155px',
                            left: '50%',
                            width: "70vw",
                            marginTop:'0',
                            transform: 'translate(-50%, 0%)',
                            overflow:'auto', 
                            height:'88vh',
                            borderRadius:'5px',
                            padding: '30px 70px 40px 0'
                    }}>
                        <Table 
                            inverted 
                            style={{boxShadow: '6px 6px 25px 5px rgba(0,0,0,0.9)', background:'rgba(0, 21, 41, 0.5)',  margin:'0px 0px 60px 30px', borderRadius:'5px'}} 
                            selectable
                        >
                            <Table.Header > 
                                <Table.Row textAlign='center'>
                                    {headers.map((value, key) => 
                                        <Table.HeaderCell key={key}>
                                            <Header 
                                                inverted 
                                                as='h3'
                                            >
                                                {value}
                                            </Header>
                                        </Table.HeaderCell>
                                    )}
                                </Table.Row>
                            </Table.Header>
                            {keys.map((value, key) => this.renderBranchs(value, key))}
                        </Table>
                    </div>
                </RenderStyle>
            </Fragment>
     
        )
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        branch: state.branch
    }
}
const mapDispatchToProps = dispatch => { 
    return {
        reset: () => dispatch(ActionCreator.reset()),    
        delete: (uid, branch, topic) => dispatch(ActionCreator.deleteTopicRequest(uid, branch, topic))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreensBranchesBranch) 