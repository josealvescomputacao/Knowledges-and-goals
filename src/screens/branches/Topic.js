import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionCreator from '../../redux/actionCreators'

import { Segment, Button, Icon, Grid, Image, Popup, Loader, Dimmer, Form } from 'semantic-ui-react'
import { RenderStyle, PanelStyle, PopupStyle} from './Topic.css.js'

class ScreensBranchesTopic extends Component{ 
    constructor(props){
        super(props)
    
        this.state = {
            branchName: '',
            topic: {
                topicName: '',
                titles: [],
                contents: [],
                searchTitle: '',
                imagePath: '',
                imageName: '',
                dates: {
                    created: '',
                    lastEdit: ''
                },
                selectedKey: -1
            },
            heightDisplay: false
        }
    }

    loadTopicsFromProps = () => {
        const url = window.location.href.split('/')
        
        const branchName = url[url.length-3].replace(/%20/g, ' ')  
        const topicName = url[url.length-1].replace(/%20/g, ' ') 

        const branchId = Object
            .keys(this.props.branch.branches)
            .filter(value => this.props.branch.branches[value].branch === branchName)
            
        const topic = Object
            .keys(this.props.branch.branches[branchId].topics)
            .map(value => (this.props.branch.branches[branchId]['topics'][value].topicName === topicName) && 
                ({
                    topicName,
                    titles: [...this.props.branch.branches[branchId]['topics'][value].titles],
                    contents: [...this.props.branch.branches[branchId]['topics'][value].contents],
                    dates: {
                        created: [...this.props.branch.branches[branchId]['topics'][value].dates['created']],
                        lastEdit: [ ...this.props.branch.branches[branchId]['topics'][value].dates['lastEdit']]
                    },
                    imageName: this.props.branch.branches[branchId]['topics'][value].imageName,
                    imagePath: this.props.branch.branches[branchId]['topics'][value].imagePath,
                    selectedKey: -1
                })
            )
            .reduce((prev, current) => {
                return{
                    ...prev,
                    ...current
                }
            })
        this.setState({topic, branchName})
    }

    componentDidMount(){
        if (this.props.auth.isAuth && !this.props.branch.isLoadding){
            this.loadTopicsFromProps() 
        }
        this.props.reset()
    }

    componentDidUpdate(){ 
        if (this.props.auth.isAuth && !this.state.topic.titles[0]){
            this.loadTopicsFromProps()
        }
    }
  
    handleChange = field => event => {
        this.setState({
            topic: {
                ...this.state.topic,
                [field] : event.target.value
            }  
        })
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
        this.setState({heightDisplay, topic})
    }

    renderPanel = (value, key) => { 
        const valuesLastEdit = [...this.state.topic.dates['lastEdit']]
        const { selectedKey } = this.state.topic
        let iconAngle = 'right'
        const contents = this.state.topic.contents[key].split('**')
        return(
            <PanelStyle 
                key={key} 
                display={this.state.heightDisplay.toString()}
            >
                <Popup
                    trigger={
                        <div 
                            key={key} 
                            className='panel' 
                            style={{background:'rgba(0, 21, 41, 0.7)'}}
                        >
                            <Icon  
                                size='big' 
                                style={{position: 'absolute', top: '20px', color:'white' }} 
                                name={
                                    'angle '+ 
                                        (iconAngle = selectedKey === key 
                                            ? (iconAngle === 'down' && 'right') || (iconAngle === 'right' && 'down') 
                                            : 'right'
                                        )
                                }
                            />
                            <Grid 
                                centered 
                                onClick={() => this.showPanel(key)} 
                                style={{cursor: 'pointer'}}
                            >
                                { 
                                    <h2 style={{color: 'white', paddingBottom: '10px'}}>{value}</h2>
                                }
                            </Grid> 
                            {selectedKey === key && 
                                <div className='collapsed'>
                                    <p style={{marginBottom: '20px', color:'red'}}>{valuesLastEdit[key] && `Last edit in: ${valuesLastEdit[key]}`}</p>
                                    {
                                        contents.map(value => <p style={{color:'white', wordBreak:'break-word'}}>{value}</p>) 
                                    }
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
        const {topicName, titles, dates, imagePath, imageName} = this.state.topic
        const lengthDates = dates['created'].length-1
        const names = ['branchName', 'topicName']
        const text = imageName ? 'Imagem of topic: '+imageName : ''

        return(
            <Fragment>
                {this.props.branch.isLoadding && 
                    <Dimmer active>
                        <Loader size='big'>Loading</Loader>
                    </Dimmer>             
                }
                <RenderStyle style={{height:'80vh'}}>
                    <Segment style={{background:'rgba(0, 21, 41, 0)', marginTop:'20px'}}>
                        {names.map(value => 
                            <Popup
                                trigger={
                                    <h2 
                                        style={{textShadow: '6px 6px 3px rgba(0,0,0,0.99)'}} 
                                        id={value === 'branchName' ? 'branchName' : 'topicName'}
                                    >
                                        {value === 'branchName' ? this.state.branchName : topicName}
                                    </h2>
                                }
                                content={value === 'branchName' ? 'Branch name' : 'Topic name'} 
                                position='right center'
                                style={PopupStyle}
                                inverted
                                key={value}
                            />
                        )}
                        {names &&
                            <Form.Input 
                                onChange={this.handleChange('searchTitle')} 
                                autoComplete="on" 
                                icon='search'
                                style={{borderRadius:'5px', position:'absolute', right: '30px', boxShadow: '8px 8px 10px 0px rgba(0,0,0,0.99)', height:'35px', width:'20%'}}
                                placeholder="Search"
                                type={'text'}
                                value={this.state.selectedTitle}
                                focus
                                id='search'

                            />   
                        } 
                    </Segment>
                    <Segment style={{background:'rgba(0, 21, 41, 0)', overflowX:'hidden', height:'66vh', paddingTop: '30px', borderRadius:'10px', margin:'40px 0 -10px 0', boxShadow: '12px 12px 20px 5px rgba(0,0,0,0.99)'}}>
                        {this.state.topic.searchTitle && 
                            titles.map((value,key) => value.toLowerCase().includes(this.state.topic.searchTitle.toLowerCase()) &&
                            this.renderPanel(value, key))
                        }
                        {titles && !this.state.topic.searchTitle && 
                            titles.map((value,key) => this.renderPanel(value, key))
                        } 
                        <Popup
                            trigger={
                                <Image 
                                    alt={text} 
                                    style={{
                                        boxShadow: imagePath && '10px 10px 20px 5px rgba(0,0,0,0.99)', 
                                        borderRadius:'10px'
                                    }} 
                                    src={imagePath} 
                                    fluid 
                                    rounded
                                />
                            }
                            content={imagePath && `Created in: ${dates['created'][lengthDates]}`} 
                            position='right center'
                            style={PopupStyle}
                            inverted
                        />
                    </Segment>
                    <Segment 
                        textAlign='center' 
                        style={{background:'rgba(0, 21, 41, 0)', outline:'0'}}
                    >
                        <Button 
                            className='boxButton' 
                            style={{background:'rgba(0, 21, 41, 0.7)'}} 
                            animated
                        >
                            <Link to={`/branches/branch/${this.state.branchName}`}>
                                <Button.Content 
                                    visible 
                                    style={{color: 'white', fontSize:'18px', padding:'5px 0 5px 0'}}
                                >
                                    Topics
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon 
                                        size='large' 
                                        style={{color:'white'}} 
                                        name='arrow left' 
                                    />
                                </Button.Content>
                            </Link>
                        </Button>
                        <Button 
                            className='boxButton' 
                            style={{background:'rgba(0, 21, 41, 0.7)', marginLeft: '50px'}} 
                            animated
                        >
                            <Link to={`/branches`}>
                                <Button.Content 
                                    visible 
                                    style={{color: 'white', fontSize:'18px', padding:'5px 0 5px 0'}}
                                >
                                    Branchs
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon  
                                        size='large' 
                                        style={{color:'white'}} 
                                        name='arrow left' 
                                    />
                                </Button.Content>
                            </Link>
                        </Button>
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
        reset: () => dispatch(ActionCreator.reset())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreensBranchesTopic)