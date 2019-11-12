import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Segment, Form, Input, TextArea, Button, Icon, Item, Grid, Popup, List, Image, Dimmer, Loader, Label } from 'semantic-ui-react'
import { notification } from 'antd'
import { connect } from 'react-redux'
import ActionCreator from '../../redux/actionCreators'

import moment from 'moment'

import { Calendar } from './elements/Calendar'

import { RenderStyle, PanelStyle, PopupStyle } from './EditTopic.css.js'

class ScreensBranchesEditTopic extends Component{
    constructor(props){
        super(props)    

        this.state = {
            branch: {
                branchId: '',
                branchName: ''
            },
            topic: {
                topicId: '',
                topicName: '',
                titles: '',
                inputTitle: '', 
                contents: '',
                dates: {
                    created: '',
                    lastEdit: ''
                },
                image: '',
                lastImageName: '',
                lastImagePath: '',
                justDeleteImage: false,
                inputContent: '',
                key: 0,
                selectedKey: -1,
                newItem: {
                    newItemKey: 0,
                    isWriting:false
                }
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

    loadTopicsFromProps = () => {
        const url = window.location.href.split('/')
        
        const branchName = url[url.length-3].replace(/%20/g, ' ')  
        const topicName = url[url.length-1].replace(/%20/g, ' ') 

        const branchId = Object.keys(this.props.branch.branches)
            .filter(value => this.props.branch.branches[value].branch === branchName)

        const branch = { branchId, branchName }  

        const topic = Object.keys(this.props.branch.branches[branchId].topics)
            .map(value => (this.props.branch.branches[branchId]['topics'][value].topicName === topicName) && 
                ({
                    topicId: value,
                    topicName,
                    titles: [...this.props.branch.branches[branchId]['topics'][value].titles],
                    contents: [...this.props.branch.branches[branchId]['topics'][value].contents],
                    dates: {
                        created: [...this.props.branch.branches[branchId]['topics'][value].dates['created']],
                        lastEdit: [ ...this.props.branch.branches[branchId]['topics'][value].dates['lastEdit']]
                    },
                    lastImageName: this.props.branch.branches[branchId]['topics'][value].imageName,
                    lastImagePath: this.props.branch.branches[branchId]['topics'][value].imagePath,
                    selectedKey: -1
                })
            )
            .reduce((prev, current) => {
                return{
                    ...prev,
                    ...current
                }
            })

        topic['dates']['lastEdit'] = topic['titles'].map((value, key) => topic['dates']['lastEdit'][key] ?
            topic['dates']['lastEdit'][key]
            :
            ''
        )
        topic['lastImageName'] && (topic['dates']['lastEdit'] = [...topic['dates']['lastEdit'], ''])
        this.setState({
            topic:{
                ...this.state.topic,
                ...topic
            },
            branch
        })
    }
    
    componentDidMount(){
        if (this.props.auth.isAuth){
            this.props.reset()
            this.loadTopicsFromProps()
        }
    }

    componentDidUpdate(){
        if (this.props.auth.isAuth && !this.state.topic.topicId){
            this.loadTopicsFromProps()
        }
        if (this.props.branch.error){
            this.props.reset()
        }
    }

    showPanel = key => {
        let {heightDisplay} = this.state
        const topic = {
            ...this.state.topic
        }
        if (this.state.topic.selectedKey === key){
            topic.selectedKey = key
            if (heightDisplay === false){
                heightDisplay = true
                this.setState({heightDisplay, topic})
                return
            }
            topic.selectedKey = -1
            heightDisplay = false
        }else{
            topic.selectedKey = key
            heightDisplay = true 
        }
        this.setState({heightDisplay, topic, autoHeight: true})
    }

    loadData = key => {
        this.showPanel(key)
        const topic = {
            ...this.state.topic,
            inputTitle: this.state.topic.titles[key],
            inputContent: this.state.topic.contents[key],
            selectedKey: key
        }
 
        if (topic['titles'].length > topic['contents'].length){
            const tam = topic['titles'].length-1
            topic['titles'].splice(tam,1)
            topic['dates']['created'].splice(key, 1)
            this.setState({topic})
            return
        }
            
        if (key !== this.state.topic.selectedKey){  //don't load again the same panel (to open and close the same panel)
            this.setState({topic})
        } 
    }

    handleChange = (field,key) => event => {
        const topic = {
            ...this.state.topic,
            error: false
        }
      
        if (field === 'image'){
            topic[field] = event.target.files
            topic['dates']['created'][this.state.topic.titles.length] = this.state.date.moment.format('LL')
            this.setState({topic})
            return
        }

        if (field === 'branchName'){
            this.setState({
                branch: {
                    ...this.state.branch,
                    branchName: event.target.value
                } 
            })
            return
        }

        if (key === -1){
            if (!this.state.topic.newItem.isWriting){
                topic.newItem.newItemKey = this.state.topic.titles.length
                topic.newItem.isWriting = true
            }
            
            const index = topic.newItem.newItemKey

            if (field === 'inputTitle'){
                const contentsLength = (topic['contents'].length-1)
                if (topic['titles'].length < topic['contents'].length){
                    topic['inputContent'] = topic['contents'][contentsLength] 
                }   
                topic['titles'][index] = event.target.value
                topic['dates']['created'][index] = this.state.date.moment.format('LL')        
            }
            if (field === 'inputContent'){
                topic['contents'][index] = event.target.value
            } 
        }else{
            if (field === 'inputTitle'){
                topic['titles'][key] = event.target.value
                if (topic['dates']['created'][key] !== this.state.date.moment.format('LL')){
                    topic['dates']['lastEdit'][key] = this.state.date.moment.format('LL')
                }
            }
            if (field === 'inputContent'){
                topic['contents'][key] = event.target.value
                if (topic['dates']['created'][key] !== this.state.date.moment.format('LL')){
                    topic['dates']['lastEdit'][key] = this.state.date.moment.format('LL')
                }
            }
        }
        topic[field] = event.target.value 
        this.setState({topic, isNotified: false, autoHeight: true})
    }

    handleOpen = () => this.setState({ modalOpen: true })
    
    handleClose = () => this.setState({ modalOpen: false })

    changeDate = value => {
        this.setState({})
    }

    update = () => {
        const url = window.location.href.split('/')
        const branchName = url[url.length-3].replace(/%20/g, ' ')
        const topicNameFromUrl = url[url.length-1].replace(/%20/g, ' ')

        let oldBranchName = ''
        let listOfBranches = []
        if (this.state.branch.branchName !== branchName){
            oldBranchName = branchName
            listOfBranches = Object.keys(this.props.branch.branches)
                .map(value => ({[value]: this.props.branch.branches[value]['branch']}))
                .reduce((prev, current) => {
                    return{
                        ...prev,
                        ...current
                    }
                })
        }

        const {topicId, topicName, titles, contents, image, lastImageName, lastImagePath, justDeleteImage} = this.state.topic
        let {dates} = this.state.topic
        dates.lastEdit[0] = !dates.lastEdit[0] ?  '' : dates.lastEdit[0]
        
        const { branch } = this.state
        branch.oldBranchName = oldBranchName
        branch.listOfBranches = listOfBranches

        //---------if has another topic with the same name, it will be find out the id of it---------------
        let idExistingTopic = ''
        let existingTopic = {}
        if (this.state.topic.topicName !== topicNameFromUrl){
            const topicNames = Object
            .keys(this.props.branch.branches[branch.branchId[0]]['topics'])
            .map(value => this.props.branch.branches[branch.branchId[0]]['topics'][value]['topicName'])
   
        let keyTopicAlreadyCreated = -1
        topicNames.map((value, key) => topicName === value && (keyTopicAlreadyCreated = key))
        keyTopicAlreadyCreated !== -1 && 
            Object
                .keys(this.props.branch.branches[branch.branchId[0]]['topics'])
                .map((value, key) => key === keyTopicAlreadyCreated && 
                    (existingTopic = {...this.props.branch.branches[branch.branchId[0]]['topics'][value]}) &&
                    (idExistingTopic = value)
                ) 
        }
        //---------------------------------------------------------------------------------------------------
                
        const imagePathFromProps = this.props.branch.branches[branch.branchId[0]]['topics'][topicId].imagePath
        if (imagePathFromProps){
            if (justDeleteImage){
                dates.created = dates.created.filter((value, key) => key !== dates.created.length-1 && dates.created[key])
            }
            if (imagePathFromProps && lastImageName !== this.props.branch.branches[branch.branchId[0]]['topics'][topicId].imageName){
                dates.created = dates.created
                    .map((value, key) => key !== dates.created.length-1 ?
                        dates.created[key]
                        : 
                        this.state.date.moment.format('LL')
                    )
            }
        } 
        
        const topic = {
            topicId,
            topicName,
            titles,
            contents,
            image,
            dates,
            lastImageName,
            lastImagePath,
            justDeleteImage,
            existingTopic,
            idExistingTopic
        }
    
        dates.created[0] ? 
            titles[0] && contents[0] ?
                this.props.update(this.props.auth.user.uid, branch, topic)
                :
                this.props.error('Both inputs need to have some text!')
            : 
            this.props.error('This topic is empty')
    }

    newItem = () => {
        const topic = {
            ...this.state.topic,
            inputTitle: '',
            inputContent: '',
            selectedKey: -1
        }
        this.setState({topic, autoHeight: false})
    }
    
    updateItem = () => {
        const topic = {
            ...this.state.topic
        } 

        if (topic['inputTitle'] && topic['inputContent']){
            topic['inputTitle'] = ''
            topic['inputContent'] = ''
            topic['selectedKey'] = -1
            topic.newItem['isWriting'] = false
            this.setState({topic, autoHeight: false})
        }else{
            const {selectedKey} = this.state.topic
            this.props.error('Both inputs need to have some text!')
            topic['titles'][selectedKey] = ''
            this.setState({topic})
        }    
    } 

    delete = key => {
        const topic = {
            ...this.state.topic,
        }
        if (topic['titles'][key] === topic['inputTitle']){
            topic['inputTitle'] = ''
            topic['inputContent'] = ''
        }
        topic['titles'].splice(key,1)
        topic['contents'].splice(key, 1)
        topic['dates']['created'].splice(key, 1)
        topic['dates']['lastEdit'].splice(key, 1)
        this.setState({topic})
    }

    deleteImage = () => {
        const topic = {
            ...this.state.topic
        }
        if (topic.justDeleteImage === false){
            topic['justDeleteImage'] = true
        }else{
            topic['justDeleteImage'] = false
        }
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
        const valuesLastEdit = [...this.state.topic.dates['lastEdit']]
        const {selectedKey} = this.state.topic
        let iconAngle = 'right'
        const contents = key !== this.state.topic.contents.length && this.state.topic.contents[key].split('**')
        return (
            <PanelStyle key={key} display={this.state.heightDisplay.toString()}>
                <Popup
                    trigger={
                        <div 
                            style={{background:'rgba(0, 21, 41, 0.7)'}} 
                            className='panel'
                        >
                            <div style={{cursor: 'pointer', display:'flex'}}>
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
                                <Grid 
                                    centered 
                                    style={{width:'90%', cursor: 'pointer'}} 
                                    onClick={() => this.loadData(key)}
                                >       
                                    <Popup
                                        trigger={<h2 style={{color: 'white', textAlign:'center', paddingBottom: '10px', maxWidth:'100%', wordWrap:'break-word'}}>{value}</h2>}
                                        content='Click here to edit!'
                                        position='right center' 
                                        style={PopupStyle}
                                    />                
                                </Grid>
                                <Icon 
                                    onClick={() => this.delete(key)}
                                    style={{width:'5%', margin:'auto 0 auto 0', cursor: 'pointer'}} 
                                    size='big' 
                                    color='red' 
                                    name='delete' 
                                />
                            </div>
                            {selectedKey === key && 
                                <div className='collapsed'>
                                    <p style={{marginBottom: '20px', color:'red', cursor:'pointer'}}>
                                        {valuesLastEdit[key] && `Last edit in: ${valuesLastEdit[key]}`}
                                    </p>
                                    {contents.map(value => <p style={{color:'white', wordBreak:'break-word'}}>{value}</p>)}
                                </div>
                            }
                        </div>
                    }
                    position='right center'
                    style={PopupStyle}
                    inverted
                    content={`Created in: ${this.state.topic.dates['created'][key]}`}
                />
            </PanelStyle>
        ) 
    }

    render(){ 
        const lengthDates = this.state.topic.dates['created'].length-1
        const date = this.state.date.moment.format('LL')
        const text = this.state.topic.lastImageName ? 'Imagem of topic: '+this.state.topic.lastImageName : ''
        const {selectedKey} = this.state.topic
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
                    {this.props.branch.error && !this.state.isNotified && 
                        this.openNotificationWithIcon('error')(this.props.branch.errorMessage)
                    }
                    {this.props.branch.isUpdated && !this.state.isNotified && 
                        this.openNotificationWithIcon('success')(`The topic ${this.state.topic.topicName} has been updated!`)
                    }
                    {this.props.branch.isUpdated && !this.props.branch.isLoadding &&
                        <Redirect to={`/branches/branch/${this.state.branch.branchName}/topic/${this.state.topic.topicName}`}/>
                    }
                    <Segment style={{background:'rgba(0, 21, 41, 0)', padding:'20px 30px 0 30px', overflowX:'hidden', height:'89vh'}}>
                        <Form>
                            <div style={{display:'flex', width:'100%', marginTop:'20px' , justifyContent:'space-around'}}>
                                <Input 
                                    id='branchName' 
                                    style={{width:'30%'}}  
                                    value={this.state.branch.branchName} 
                                    onChange={this.handleChange('branchName')}
                                />
                                <Input 
                                    id='topicName' 
                                    style={{width:'30%'}} 
                                    value={this.state.topic.topicName} 
                                    onChange={this.handleChange('topicName')}
                                />
                            </div>
                            <Segment 
                                style={{marginTop:'60px', paddingTop: '40px', background:'rgba(0, 21, 41, 0)'}} 
                                textAlign='center'
                            >
                                <Popup
                                    trigger={
                                        <Button 
                                            className='boxButton' 
                                            style={{position: 'absolute', left:'15px', top:'12px', background:'rgba(0, 21, 41, 0.8)'}} 
                                            onClick={this.newItem} 
                                            size='large' 
                                            animated
                                        >
                                            <Button.Content 
                                                visible 
                                                style={{color: 'white'}}
                                            >
                                                New
                                            </Button.Content>
                                            <Button.Content hidden>
                                                <Icon 
                                                    style={{color:'white'}} 
                                                    size='large' 
                                                    name='add' 
                                                />
                                            </Button.Content>
                                        </Button>
                                    }
                                    content='It starts an empty title and an empty content'
                                    position='right center'
                                    style={PopupStyle}
                                    inverted
                                />
                                <Grid centered>
                                    <Grid.Column width={6}>
                                        <Input 
                                            onChange={this.handleChange('inputTitle', selectedKey)} 
                                            style={{width:'100%', marginBottom:'20px'}} 
                                            id='titleName' 
                                            value={this.state.topic.inputTitle} 
                                            placeholder='Write a Title' 
                                        />
                                    </Grid.Column>
                                </Grid>
                                <Grid centered>
                                    <Grid.Column 
                                        width={16} 
                                        style={{margin: '25px 0 0 0'}}
                                    >
                                        <TextArea 
                                            onChange={this.handleChange('inputContent', selectedKey)} 
                                            style={{width:'100%', position: 'relative'}} 
                                            id='contentName' 
                                            value={this.state.topic.inputContent} 
                                            autoHeight={this.state.autoHeight} 
                                            placeholder='Try adding multiple lines'
                                        />
                                    </Grid.Column>
                                </Grid>
                                <Popup
                                    trigger={
                                        <Button 
                                            className='boxButton' 
                                            style={{background:'rgba(0, 21, 41, 0.8)'}} 
                                            onClick={this.updateItem} 
                                            size='large' 
                                            animated
                                        >
                                            <Button.Content visible style={{color: 'white'}}>Add</Button.Content>
                                            <Button.Content hidden>
                                                <Icon 
                                                    size='large'
                                                    style={{color:'white'}} 
                                                    name='add' 
                                                />
                                            </Button.Content>
                                        </Button>
                                    }
                                    content='You need to write a title and your respective content for add a new title! Note: use ** to breake a line'
                                    position='right center'
                                    style={PopupStyle}
                                    inverted
                                />
                            </Segment>
                            <Item.Group> 
                                <Item>
                                    <Item.Content>                       
                                        {
                                            <List>
                                                {this.state.topic.topicId && 
                                                    this.state.topic.titles.map((value,key) => this.renderPanel(value,key))
                                                }
                                                <Popup
                                                    trigger={
                                                        <Image 
                                                            alt={text} 
                                                            style={{boxShadow: this.state.topic.lastImagePath && '10px 10px 20px 5px rgba(0,0,0,0.99)', borderRadius:'10px'}} 
                                                            src={this.state.topic.topicId && this.state.topic.lastImagePath} 
                                                            fluid 
                                                            rounded
                                                        />
                                                    }
                                                    content={this.state.topic.lastImagePath && `Created in: ${this.state.topic.dates['created'][lengthDates]}`} 
                                                    position='right center'
                                                    style={PopupStyle}
                                                    inverted
                                                />
                                                
                                                <Grid>
                                                    <div style={{display:'flex', width:'100%'}}>
                                                        <Input 
                                                            id='embedpollfileinput' 
                                                            className='inputFile' 
                                                            type='file' 
                                                            onChange={this.handleChange('image', undefined)}
                                                        />
                                                        <label 
                                                            id='labelInput' 
                                                            style={{'boxShadow':'1px 1px 8px 0px rgba(255,255,255,0.99)', background:'rgba(0, 21, 41, 0.5)', margin: '30px auto 0 auto'}} 
                                                            htmlFor="embedpollfileinput" 
                                                            className="ui huge red  button"
                                                        >
                                                            <i className="ui upload icon"></i> 
                                                            {this.state.topic.lastImageName ? 'Upload a new image' : 'Upload image'} 
                                                        </label>   
                                                    </div>
                                                    <div style={{display:'flex', width:'100%'}}>
                                                        <div style={{margin:'0 auto 0 auto'}}>
                                                            {(this.state.topic.image !== '' || this.state.topic.image[0] !== undefined)  && 
                                                                <h5 style={{color: 'red', marginTop:'20px'}}>
                                                                    Name: 
                                                                    <span style={{color:'#00C2F8'}}>
                                                                        {this.state.topic.image[0].name}
                                                                    </span>
                                                                </h5>
                                                            }
                                                            {(this.state.topic.image !== '' || this.state.topic.image[0] !== undefined) && 
                                                                <h5 style={{color: 'red'}}>
                                                                    Size: 
                                                                    <span style={{color:'#00C2F8'}}>
                                                                        {(this.state.topic.image[0].size/(1024)).toFixed(2).split('.')[0]} KB
                                                                    </span>
                                                                </h5>
                                                            }
                                                        </div>
                                                    </div>
                                                    <Grid.Column floated='right'>
                                                        {this.state.topic.lastImageName &&
                                                            <Popup
                                                                trigger={
                                                                    !this.state.topic.justDeleteImage ? 
                                                                        <Icon size='big' style={{cursor:'pointer', right:'10px', marginTop:'-100px'}} 
                                                                            color='red' 
                                                                            name='delete' 
                                                                            onClick={this.deleteImage}
                                                                        /> 
                                                                        :
                                                                        <Icon 
                                                                            size='big' 
                                                                            style={{cursor:'pointer', right:'10px', marginTop:'-100px'}} 
                                                                            color='green' 
                                                                            name='check' 
                                                                            onClick={this.deleteImage}
                                                                        />
                                                                }
                                                                content= {!this.state.topic.justDeleteImage ? 'Delete this image!' : 'Will be deleted when you click in "update"' }
                                                                position='left center'
                                                                style={PopupStyle}
                                                                inverted
                                                            />
                                                        }                                 
                                                    </Grid.Column>               
                                                </Grid>
                                            </List>     
                                        }                     
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                            <Segment style={{background:'rgba(0, 21, 41, 0)', marginTop:'-20px'}}> 
                                <Grid columns={3}>
                                    <Grid.Column>
                                        <Segment style={{background:'rgba(0, 21, 41, 0.5)'}}>
                                            <Label 
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
                                                    <Button.Content hidden>
                                                        <Link to={`/branches/branch/${this.state.branch.branchName}`}>
                                                            <Icon 
                                                                size='large' 
                                                                style={{color:'white'}} 
                                                                name='arrow left' 
                                                            />
                                                        </Link>
                                                    </Button.Content>
                                                </Button>
                                            </Label>             
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column >
                                        <Segment style={{background:'rgba(0, 21, 41, 0.3)'}}>  
                                            <h3 style={{color:'white'}} id='date'>{date}</h3>
                                            <Label 
                                                id='calendar' 
                                                ribbon='right' 
                                                style={{background:'rgba(0, 21, 41, 0.5)'}}>
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
                                                ribbon='right' 
                                                style={{background:'rgba(0, 21, 41, 0.9)'}}
                                            >
                                                <Button 
                                                    onClick={this.update}
                                                    style={{background:'rgba(21, 173, 83, 0.2)'}} 
                                                    className='boxButton' 
                                                    floated='left' 
                                                    animated   
                                                >
                                                    <Button.Content 
                                                        style={{color:'white', fontSize:'18px', padding:'3px 0 3px 0'}} 
                                                        visible
                                                    >
                                                        Update
                                                    </Button.Content>
                                                    <Button.Content hidden>
                                                        <Icon 
                                                            style={{color:'white'}} 
                                                            size='large' 
                                                            name='add' 
                                                        />
                                                    </Button.Content>
                                                </Button>
                                            </Label>             
                                        </Segment>
                                    </Grid.Column>
                                </Grid> 
                            </Segment>
                        </Form>
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
        reset: () => dispatch(ActionCreator.reset()),
        update: (uid, branch, topic) => dispatch(ActionCreator.updateTopicRequest(uid, branch, topic)),  
        error: message => dispatch(ActionCreator.updateTopicFailure(message)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreensBranchesEditTopic)