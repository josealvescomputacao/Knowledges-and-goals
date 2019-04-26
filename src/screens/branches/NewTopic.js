import React, {Component, Fragment} from 'react'
import {Redirect, Link} from 'react-router-dom'

import {
    Segment, Input, Button, Icon, Form, TextArea, Label, Grid, Popup, List, Loader, Dimmer
} from 'semantic-ui-react'
import { notification } from 'antd'
import styled from 'styled-components'

import {connect} from 'react-redux'
import ActionCreator from '../../redux/actionCreators'

import moment from 'moment'

import { Calendar } from './elements/Calendar'


const RenderStyle = styled.div`
    @media (min-width: 320px)  { 
            
        #date{
            position:relative
        }
    }
    @media (max-width: 512px)  { 
            
        #calendar{
            margin-top: 20px
        }
    }
    @media (min-width: 992px){ 
        
        #date{
            position: absolute
        }

    }

    #topicName{
        box-shadow: 8px 14px 16px 0px
        border-radius: 5px 
        margin-bottom: 20px
        background: #F3F4DF
        transition: all 0.5s ease-in-out
        position: absolute
        top:-5px
    }
    #topicName: focus{
        box-shadow: 0 0 0 0
        top:0px
    }

    #titleName{ 
        box-shadow: 5px 10px 10px 0px
        border-radius: 5px 
        margin-bottom: 20px
        transition: all 0.5s ease-in-out
        position: absolute
        top:-45px
    }
    #titleName:focus{
        box-shadow: 0 0 0 0
        top:-40px
    }

    #contentName{ 
        position: absolute
        box-shadow: 5px 10px 10px 0px
        border-radius: 5px 
        margin-bottom: 20px
        transition: all 0.5s ease-in-out
        top:-40px
    }
    #contentName:focus{
        box-shadow: 0 0 0 0
        top:-35px
    }

    .boxButton{
        transition: all 0.2s ease-in-out
        box-shadow: 8px 8px 10px 0px rgba(0,0,0,0.99)  
    }
    .boxButton:hover{
        box-shadow: 0 0 0 0
    }

    .inputFile{
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        margin-left: -15px
        transition: all 0.5s ease-in-out
        position: absolute;
        marginBottom: 20px;
        z-index: -1;
    }
    .inputFile:hover{
        box-shadow: 0 0 0 0
    }
`

const PanelStyle = styled.div` 

    .panel{
        position: relative;
        background: rgb(36, 40, 42)
        width: 100%;
        margin-bottom: 1rem;
        transition-duration: .5s
        border-radius: 4px
        padding: 25px 15px 25px 15px
        
        top: 0px
        border-left: 3px solid #2600B2
        
    }
    .panel:hover{        
        box-shadow: rgba(0, 0, 0, 0.6) 10px 10px 15px 3px;
        top: -5px
        border-left: 3px solid #00CBFF
    }
    .collapsedContent{
        top: ${props => props.display === false ? 0 : '100%'};    
        padding-top: 20px;
        overflow:hidden;
        word-wrap: break-word;
    } 
}
`
const PopupStyle = {
    borderRadius: '5px',
    background:'rgba(0, 21, 41, 0)'
}

class ScreensBranchesNewTopic extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            branch:{
                branchName: '',
                branchId: ''
            },
            topicName: '',
            topic: {
                titles: [],
                inputTitle: '',
                contents: [],
                inputContent: '',
                image: '',
                key: 0,
                selectedKey: -1
            },
            date: {
                moment: moment()
            },
            modalOpen: false,
            heightDisplay: false,
            isNotified: false,
            autoHeight: false
        }
    }

    loadBranchInState(){
        const url = window.location.href.split('/') 
        const branchName = url[url.length-2].replace(/%20/g, ' ')
        
        const branchKey = Object.keys(this.props.branch.branches)
            .filter(value =>  this.props.branch.branches[value].branch === branchName)
        this.setState({
            branch:{
                branchId: branchKey[0],
                branchName
            }
        })
    }
    
    componentDidMount(){
        this.props.reset()
        this.props.auth.isAuth && this.loadBranchInState()
    }
    componentDidUpdate(){
        this.props.auth.isAuth && !this.state.branch.branchId && this.loadBranchInState()
        this.props.branch.error && this.props.reset()
    } 

    create = () => { 
        const userId = this.props.auth.user.uid
        const {titles, contents, image} = this.state.topic   
        if (this.state.topicName && titles.length !== 0 && contents.length !== 0){
            const {topicName} = this.state
            let dates = titles.map(value => this.state.date.moment.format('LL'))
            this.state.topic.image && (dates = [...dates, this.state.date.moment.format('LL')])
            const topic = {
                topicName,
                titles,
                contents,
                image,
                userId,
                dates
            }
            const {branch} = this.state
            const {uid} = this.props.auth.user
            this.props.create(uid, branch, topic)
        }else{
            this.props.error("You can't create whitout all labels used")
        }
    }

    handleChange = (field,key) => event => {
        if (field === 'topicName'){
            this.setState({[field]: event.target.value})
            return
        }
        const topic = {
            ...this.state.topic
        }
        if (field === 'titles'){
            topic['inputTitle'] = event.target.value
        }
        if (field === 'contents'){
            topic['inputContent'] = event.target.value
        }
        if (field === 'image'){
            topic[field] = event.target.files
            this.setState({topic})
            return
        }
        topic[field][key] = event.target.value
        this.setState({topic, isNotified: false, autoHeight: true})   
    }

    newTitle = () => {
        const topic = {
            ...this.state.topic
        }
        this.props.error && this.props.reset()
        if (this.state.topic.inputTitle && this.state.topic.inputContent){  
            topic['titles'][this.state.topic.key] && (topic['key'] = this.state.topic.key+1)
            topic['inputTitle'] = '' 
            topic['inputContent'] = ''
            this.setState({topic, autoHeight: false}) 
        }else{
            this.props.error('Write both labels before to add a new titles!')
        }
          
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    changeDate = value => {
        this.setState({})
    }

    showPanel = key => {
        let {heightDisplay, iconAngle} = this.state
        const topic = {
            ...this.state.topic
        }
        if (this.state.topic.selectedKey === key){
            topic.selectedKey = key
            if (heightDisplay === false){
                heightDisplay = true
                this.setState({heightDisplay, iconAngle, topic})
                return
            }
            topic.selectedKey = -1
            heightDisplay = false
        }else{
            topic.selectedKey = key
            heightDisplay = true 
        }
        this.setState({heightDisplay, topic})
    }

    delete = key => {
        const topic = {
            ...this.state.topic,
            inputTitle: '',
            inputContent: ''

        }
        topic['titles'].splice(key,1)
        topic['contents'].splice(key, 1)
        this.setState({topic})
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
  
    renderPanel = (value,key) => { 
        const {selectedKey} = this.state.topic
        let iconAngle = 'right'
        return (
            <PanelStyle 
                key={key} 
                display={this.state.heightDisplay.toString()}
            >
                <div 
                    style={{background:'rgba(0, 21, 41, 0.7)'}} 
                    className='panel' 
                >    
                    <div 
                        onClick={() => this.showPanel(key)} 
                        style={{cursor: 'pointer', display:'flex'}}
                    >
                        <Icon  
                            size='big' 
                            style={{width:'5%', color:'white', margin:'auto 0 auto 0'}} 
                            name={'angle '+(iconAngle = selectedKey === key ? 
                                    (iconAngle === 'down' && 'right') || (iconAngle === 'right' && 'down') 
                                    : 
                                    'right'
                                )
                            }
                        />
                        <div style={{width:'90%'}}>
                            <h2 style={{color: 'white', textAlign:'center', paddingBottom: '10px', maxWidth:'100%', wordWrap:'break-word'}}>{value}</h2>
                        </div>
                        <div 
                            style={{width:'5%', margin:'auto 0 auto 0'}}>
                            <Icon 
                                onClick={() => this.delete(key)}
                                style={{cursor:'pointer'}}
                                size='big' 
                                color='red' 
                                name='delete'  
                            />
                        </div>
                    </div>    
                    {selectedKey === key && 
                        <div className='collapsedContent'>
                            <h3 style={{color:'white', marginLeft:'5%'}}>{this.state.topic.contents[key]}</h3>
                        </div>
                    }
                </div>
            </PanelStyle>
        )  
    }
 
    render(){  
        const date = this.state.date.moment.format('LL')
        const {key} = this.state.topic
        return(
            <Fragment> 
                <RenderStyle>
                    {this.props.branch.isLoadding && 
                        <Dimmer style={{height:'100%'}} active>
                            <Loader     
                                style={{height:'100%'}} 
                                size='big'
                            >
                                Loading
                            </Loader>
                        </Dimmer>            
                    }
                    <Segment style={{background:'rgba(0, 21, 41, 0)', overflow:'auto', height:'89vh', paddingRight:'40px', marginTop:'0px'}}>
                        
                        {this.props.branch.error && !this.state.isNotified && this.openNotificationWithIcon('error')(this.props.branch.errorMessage)}
                        {this.props.branch.isCreated && !this.state.isNotified && this.openNotificationWithIcon('success')(`The topic ${this.state.topicName} was created!`)}

                        {this.props.branch.isCreated && !this.props.branch.isLoadding && this.state.topicName && 
                            <Redirect to={`/branches/branch/${this.state.branch.branchName}/topic/${this.state.topicName}`}/>
                        }
                        <Form>
                            <Grid centered>
                                <Grid.Column width={8}>
                                    <Input 
                                        onChange={this.handleChange('topicName', key)} 
                                        style={{width: '100%'}} 
                                        id='topicName'  
                                        placeholder='Write a Topic' 
                                    />
                                </Grid.Column>
                            </Grid>
                            <Segment    
                                style={{marginTop:'50px', paddingTop: '40px', background:'rgba(0, 21, 41, 0)'}} 
                                textAlign='center'
                            >
                                <Grid centered>
                                    <Grid.Column width={5}>
                                        <Input 
                                            onChange={this.handleChange('titles', key)} 
                                            style={{width:'100%'}} 
                                            id='titleName' 
                                            value={this.state.topic.inputTitle} 
                                            placeholder='Write a titles' 
                                        />
                                        <br/>
                                        <br/>
                                    </Grid.Column>
                                </Grid> 
                                <Grid centered>
                                    <Grid.Column width={16} style={{margin: '25px 0 -10px 0'}}>    
                                        <TextArea 
                                            onChange={this.handleChange('contents', key)}
                                            id='contentName' 
                                            value={this.state.topic.inputContent} 
                                            autoHeight={this.state.autoHeight} 
                                            placeholder='Write a contents'
                                            style={{position:'relative'}}
                                        />
                                    </Grid.Column>
                                </Grid>
                                <br/>
                                <Popup
                                    trigger={
                                        <Button 
                                            onClick={this.newTitle} 
                                            style={{background:'rgba(0, 21, 41, 0.8)'}}
                                            className='boxButton' 
                                            size='large' 
                                            animated
                                        >
                                    <Button.Content visible style={{color: 'white'}}>Add</Button.Content>
                                    <Button.Content hidden>
                                        <Icon size='large' style={{color:'white'}} name='add' />
                                    </Button.Content>
                                    </Button>}
                                    content='You need to write a titles and your respective contents for add a new titles!'
                                    position='right center'
                                    style={PopupStyle}
                                    inverted
                                /> 
                            </Segment>
                                {
                                    <List>
                                        {this.state.topic.titles.map((value,key) => this.renderPanel(value,key))} 
                                        <div style={{display:'flex', width:'100%'}}>
                                            <Input 
                                                onChange={this.handleChange('image', undefined)}
                                                id='embedpollfileinput' 
                                                className='inputFile' 
                                                type='file' 
                                            />
                                            <label 
                                                id='labelInput' 
                                                style={{'boxShadow':'1px 1px 8px 0px rgba(255,255,255,0.99)', background:'rgba(0, 21, 41, 0.5)', margin: '10px auto 0 auto'}} 
                                                htmlFor="embedpollfileinput" 
                                                className="ui huge red  button"
                                            >
                                                <i className="ui upload icon"/> 
                                                {this.state.topic.lastImageName ? 'Upload a new image' : 'Upload image'} 
                                            </label>   
                                        </div>                                      
                                        <div style={{display:'flex', width:'100%'}}>
                                            <div style={{margin:'0 auto 0 auto'}}>
                                                {this.state.topic.image !== '' && 
                                                    <h5 style={{color: 'red', marginTop:'20px'}}>Name: 
                                                        <span style={{color:'#00C2F8'}}>{this.state.topic.image[0].name}</span>
                                                    </h5>
                                                }
                                                {this.state.topic.image !== '' && 
                                                    <h5 style={{color: 'red'}}>Size: 
                                                        <span style={{color:'#00C2F8'}}>{(this.state.topic.image[0].size/(1024)).toFixed(2).split('.')[0]} KB</span>
                                                    </h5>
                                                }                     
                                            </div>
                                        </div> 
                                        
                                    </List>              
                                }                 
                        </Form>     
                        <Segment style={{background:'rgba(0, 21, 41, 0)'}}>
                            <Grid columns={3}>
                                <Grid.Column>
                                    <Segment style={{background:'rgba(0, 21, 41, 0.5)'}}>
                                    <Label 
                                        className='button' 
                                        ribbon 
                                        style={{background:'rgba(0, 21, 41, 0.9)'}}
                                    > 
                                        <Button 
                                            className='boxButton' 
                                            style={{background:'#db2828'}} 
                                            floated='left' 
                                            animated
                                        >
                                            <Button.Content 
                                                style={{color:'white', fontSize:'18px', padding:'3px 0 3px 0'}} 
                                                visible
                                            >
                                                Cancel
                                            </Button.Content>
                                            <Button.Content  hidden>
                                                <Link to={`/branches/branch/${this.state.branch.branchName}`}>
                                                    <Icon 
                                                        size='large' 
                                                        style={{color:'white'}} 
                                                        name='arrow left' />
                                                    </Link>
                                            </Button.Content>
                                        </Button>
                                    </Label>             
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column >
                                    <Segment style={{background:'rgba(0, 21, 41, 0.3)'}}>
                                        <h3 
                                            style={{color:'white'}} 
                                            id='date'
                                        >
                                            {date}
                                        </h3>
                                        <Label 
                                            id='calendar' 
                                            ribbon='right' 
                                            style={{background:'rgba(0, 21, 41, 0.5)'}}
                                        >
                                            <Calendar 
                                                changeDate={(val) => this.changeDate(val)}
                                                handleOpen={this.handleOpen} 
                                                modalOpen={this.state.modalOpen} 
                                                handleClose={this.handleClose}
                                                moment={this.state.date.moment}  
                                            /> 
                                        </Label>      
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment style={{background:'rgba(0, 21, 41, 0.5)'}}>
                                        <Label 
                                            style={{background:'rgba(0, 21, 41, 0.9)'}} 
                                            ribbon='right'
                                        >
                                            <Button 
                                                className='boxButton' 
                                                style={{background:'rgba(21, 173, 83, 0.2)'}} 
                                                floated='left' 
                                                animated 
                                                onClick={this.create}
                                            >
                                                <Button.Content 
                                                    style={{color:'white', fontSize:'18px', padding:'3px 0 3px 0'}} 
                                                    visible
                                                >
                                                    Create
                                                </Button.Content>
                                                <Button.Content hidden>
                                                    <Icon 
                                                        size='large' 
                                                        style={{color:'white'}} 
                                                        name='add' 
                                                    />
                                                </Button.Content> 
                                            </Button>
                                        </Label>             
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Segment>
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
        create: (uid, branch, topic) => dispatch(ActionCreator.createTopicRequest(uid, branch, topic)),
        reset: () => dispatch(ActionCreator.reset()),
        error: message => dispatch(ActionCreator.createTopicFailure(message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreensBranchesNewTopic)
