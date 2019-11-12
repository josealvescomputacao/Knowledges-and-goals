import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { List, Button, Segment, Input, Icon, Label, Dimmer, Loader, Popup } from 'semantic-ui-react'
import { notification } from 'antd'

import { connect } from 'react-redux'
import ActionCreator from '../../redux/actionCreators'
import { ConfirmRemove } from './elements/ConfirmRemove'

import { RenderStyle } from './index.css.js'

class ScreensBranches extends Component{

    state = {
        name: '',
        oldName: '',
        deleteBranch:{
            id: '',
            isOpen: false
        },
        isNotified: false,
        willDelete: ''   
    }

    componentDidMount(){  
        if (this.props.auth.isAuth && this.props.branch.branches && Object.keys(this.props.branch.branches).length === 0 && !this.props.branch.isLoadding){
            this.props.load(this.props.auth.user.uid) 
        }  
    }

    componentDidUpdate(){
        (this.props.branch.error || this.props.branch.isDeleted) && this.props.reset()
    }

    create = () => {
        let exists = false
        const branch = this.state.name
        if (this.props.branch.branches){
            const keys = Object.keys(this.props.branch.branches)
            keys.map(value => this.props.branch.branches[value].branch === branch ? exists = true : null)
        }

        if (this.state.name !== '' && this.state.name !== this.state.oldName && !exists){
            this.props.create(branch, this.props.auth.user.uid)
            this.state.isNotified && this.setState({isNotified: false})
        }else{
            if ((this.state.name !== '' && this.state.name === this.state.oldName) || exists){
                this.props.error('This branch already exists!')
            }else{
                this.props.error("Put the branch's name to create!")
            }
            
        }
    }

    infoAboutImage = id => {
        if (this.props.branch.branches[id]['topics']){ //verify if this branch has images in the topics
            const topicsWithImages = Object
            .keys(this.props.branch.branches[id]['topics'])
            .map(value => this.props.branch.branches[id]['topics'][value]['imagePath'] !== '' && this.props.branch.branches[id]['topics'][value]['topicName'])
            .filter(value => value)

            const imagesNames = Object
                .keys(this.props.branch.branches[id]['topics'])
                .map(value => this.props.branch.branches[id]['topics'][value]['imagePath'] !== '' && this.props.branch.branches[id]['topics'][value]['imageName'])
                .filter(value => value)

            const topicsIds = Object
                .keys(this.props.branch.branches[id]['topics'])
                .map(value => this.props.branch.branches[id]['topics'][value]['imagePath'] !== '' && value)
                .filter(value => value)

            const obj = {topicsWithImages, imagesNames, topicsIds}
            return obj
        }
        return {topicsWithImages : []}
        
    }
    
    update = (name, id) => {   //id for just update when click in update button, where id === null
        if (this.state.name === '' && this.state.oldName !== ''){ //ok for click in edit (will be start correctly)
            this.props.error("Put the branch's name to change!")
            return
        }  

        if (this.state.name === name && !id){   //branch choosed and not changed
            this.props.error('This branch already exists!')
            return
        }

        let exists = false
        const branch = this.state.name
        const keys = Object.keys(this.props.branch.branches)
        let newBranch = {}
        keys.map(value => this.props.branch.branches[value].branch === this.state.oldName && !exists 
            ? newBranch = {...this.props.branch.branches[value], value, branch} 
            : this.props.branch.branches[value].branch === branch && (exists = true) 
        )

        if (this.state.name !== this.state.oldName && name === this.state.oldName && !id){ //branch choosed and was changed
            if (exists){
                const branchsIds = Object.keys(this.props.branch.branches)
                
                const oldBranchId = branchsIds.filter(value => this.props.branch.branches[value]['branch'] === this.state.oldName)
                const newBranchId = branchsIds.filter(value => this.props.branch.branches[value]['branch'] === this.state.name)

                newBranch = {
                    branch: this.props.branch.branches[newBranchId[0]]['branch'],
                    storageFolder: [
                        ...this.props.branch.branches[newBranchId[0]]['storageFolder'], 
                        ...this.props.branch.branches[oldBranchId[0]]['storageFolder']
                    ],
                    topics: {
                        ...this.props.branch.branches[newBranchId[0]]['topics'],
                        ...this.props.branch.branches[oldBranchId[0]]['topics']
                    },
                    value:  newBranchId[0],
                    oldBranchId: oldBranchId[0]
                }
            }
            const obj = this.infoAboutImage(newBranch.value)
                
            const aboutImage = {
                branchName: this.state.oldName,
                topicsWithImages: obj.topicsWithImages,
                imagesNames: obj.imagesNames,
                topicsIds: obj.topicsIds
            }
            this.props.update(newBranch, aboutImage, this.props.auth.user.uid)
            this.setState({oldName:'', isNotified: false})
            return
        }

        this.setState({
            name,
            oldName: name
        })
    }

    delete = (id, name) => {
        const obj = this.infoAboutImage(id)
        const aboutImage = {
            branchName: name,
            topicsWithImages: obj.topicsWithImages,
            imagesNames: obj.imagesNames
        }
        this.props.delete(id, aboutImage, this.props.auth.user.uid)
        this.setState({isNotified: false, willDelete: name })
    }

    handleChange = field => (e, {value}) => {
        this.setState({[field]: value, isNotified: false})
    }

    handleOpenPopup = id => {
        const deleteBranch = {
            ...this.state.deleteBranch,
            id,
            isOpen: true
        } 
        this.setState({deleteBranch})
    }
    handleClosePopup = id => {
        const deleteBranch = {
            ...this.state.deleteBranch,
            id,
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
    
    renderBranchs = (name, id) => {
        return( 
            <List.Item key={id}>
                <RenderStyle>
                    <Segment 
                        style={{background:'rgba(0, 21, 41, 0.5)', margin:'15px 35px 0 25px'}} 
                        secondary 
                        color='blue'
                        className='branch' 
                    >
                        <Label 
                            className='button' 
                            style={{background:'rgba(0, 21, 41, 0.9)'}} 
                            ribbon
                        >
                            <List.Content  className='BranchName'>   
                                    <Link to={`/branches/branch/${name}`}>{name}</Link> 
                            </List.Content> 
                        </Label>
                        <List.Content floated='right'>
                            <Button 
                                icon
                                style={{cursor: 'pointer', background: 'rgba(13,30,15,0.1)', color:'blue'}} 
                                className='button'
                                size='mini'
                            >
                                <Icon 
                                    onClick={() => this.update(name, id)} 
                                    name='edit'
                                    size='big'   
                                />
                            </Button>
                            <Popup 
                                trigger={
                                    <Button 
                                        icon
                                        style={{cursor: 'pointer', background: 'rgba(13,30,15,0.1)', borderRadius:'50px'}} 
                                        className='button'
                                        size='mini'
                                    >
                                        <Icon 
                                            size='big' 
                                            color='red' 
                                            name='trash alternate'
                                        />
                                    </Button>
                                }  
                                hideOnScroll={false}
                                on='click'
                                style={{background: 'rgba(13,30,15,0.1)'}}
                                position='right center'
                                open={id === this.state.deleteBranch['id'] && this.state.deleteBranch['isOpen']}
                                onOpen={() => this.handleOpenPopup(id)}
                                onClose={() => this.handleClosePopup(id)}
                                content={
                                    <ConfirmRemove 
                                        delete={() => this.delete(id, name)} 
                                        handleClosePopup={this.handleClosePopup}
                                    />
                                } 
                            /> 
                        </List.Content>
                    </Segment> 
                </RenderStyle> 
            </List.Item>
        )    
    }
 

    render(){
        const keys = this.props.branch.branches ? Object.keys(this.props.branch.branches) : []
        return(
            <Fragment>
                {this.props.branch.isLoadding && 
                    <Dimmer active>
                        <Loader size='big'>Loading</Loader>
                    </Dimmer>             
                }
                {this.props.branch.error && !this.state.isNotified && 
                    this.openNotificationWithIcon('error')(this.props.branch.errorMessage)
                }
                {this.props.branch.isCreated && !this.state.isNotified && 
                    this.openNotificationWithIcon('success')(`The branch ${this.state.name} has been created!`)
                }
                {this.props.branch.isUpdated && !this.state.isNotified && 
                    this.openNotificationWithIcon('success')(`The branch ${this.state.name} has been updated!`)
                }
                {this.props.branch.isDeleted && !this.state.isNotified && 
                    this.openNotificationWithIcon('success')(`The branch ${this.state.willDelete} has been deleted!`)
                }
                {(this.props.branch.isCreated || this.props.branch.isUpdated) && !this.props.branch.isLoadding && 
                    <Redirect to={`/branches/branch/${this.state.name}`}/>
                }
                <RenderStyle>
                    <Segment 
                        textAlign='center' 
                        style={{margin:'40px 0 0 0', background:'rgba(0, 21, 41, 0.8)', boxShadow: '10px 10px 25px 5px rgba(0,0,0,0.9)', borderRadius:'10px', zIndex:'2'}}
                    >     
                        <Input 
                            onChange={this.handleChange('name')} 
                            size='big'
                            id='titleName' 
                            value ={this.state.name} 
                            placeholder="Put the branch's name" 
                        />
                        {this.state.oldName !== '' && 
                            <Button 
                                onClick={() => this.update(this.state.oldName, null)}
                                style={{background:'rgba(0, 21, 41, 0.8)', marginLeft:'10px'}} 
                                className='boxButton' 
                                size='large' 
                                floated='right' 
                                animated           
                            >
                                <Button.Content 
                                    style={{color: 'white'}} 
                                    visible
                                >
                                    Change
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon 
                                        size='large' 
                                        style={{color: 'white', margin:'0 0 10px 10px'}} 
                                        name='sync' 
                                    />
                                </Button.Content>
                            </Button>
                        }
                        <Button 
                            onClick={this.create}
                            style={{background:'rgba(0, 21, 41, 0.8)'}} 
                            className='boxButton' 
                            size='large' 
                            floated='right' 
                            animated     
                        >
                            <Button.Content     
                                style={{color: 'white'}} 
                                visible
                            >
                                Create
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon 
                                    size='large' 
                                    style={{color: 'white', margin:'0 0 10px 10px'}} 
                                    name='add' 
                                />
                            </Button.Content>
                        </Button>
                    </Segment>
                </RenderStyle>
                <List 
                    style={{position:'relative', overflow:'auto', marginTop:'0', height:'72vh', padding:'20px 30px 30px 30px'}}
                    animated  
                >
                    {keys.map(value => this.renderBranchs(this.props.branch.branches[value].branch, value))}
                </List>
            </Fragment>
        )    
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        branch : state.branch
    }
    
}
const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(ActionCreator.reset()), 
        load: uid => dispatch(ActionCreator.getBranchesRequest(uid)),
        create: (name, uid) => dispatch(ActionCreator.createBranchRequest(name, uid)),
        update: (branch, aboutImage, uid) => dispatch(ActionCreator.updateBranchRequest(branch, aboutImage, uid)),
        delete: (id, aboutImage, uid) => dispatch(ActionCreator.deleteBranchRequest(id, aboutImage, uid)),
        error: error => dispatch(ActionCreator.createBranchFailure(error))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreensBranches) 