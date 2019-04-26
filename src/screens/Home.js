import React, {Component, Fragment} from 'react'
import { Carousel} from 'antd'
import { Image } from 'semantic-ui-react'

class ScreensHome extends Component{

    render(){
        const urls = [
            '/images/newGoal.jpg', 
            '/images/goalCreated.jpg', 
            '/images/filterGoal.jpg',
            '/images/updateMainGoalOrCreateAnotherSubGoal.jpg',
            '/images/updateSubGoal.jpg',
            '/images/branches.jpg', 
            '/images/createTopic.jpg', 
            '/images/topics.jpg', 
            '/images/topic.jpg', 
            '/images/updateTopic.jpg', 
        ]
        const titles = [
            'To create a goal',
            'To view the selected goal',
            'To filter goals by date or name',
            'To update the main goal or create a new sub goal',
            'To update the sub goal',
            'To create, update or remove a branch',
            'To create a new topic',
            'To create, update or remove a topic',
            'To view the topic selected',
            'To update the topic selected'
        ]
        return(
            <Fragment>
                <div style={{width: '75vw', borderRadius:'10px', margin:'35px auto 0 auto', boxShadow:'10px 10px 20px 10px rgba(0,0,0,0.99)'}}>
                    <Carousel 
                        pauseOnHover={false} 
                        pauseOnDotsHover={true} 
                        autoplaySpeed={4000} 
                        speed={1500} 
                        autoplay
                    >
                        {urls.map((value, key) => 
                            <div key={key}>
                                <h4 style={{color:'white', marginBottom:'0', textAlign:'center'}}>{titles[key]}</h4>
                                <Image
                                    src={value}
                                    fluid
                                    style={{borderRadius:'10px'}}
                                /> 
                            </div>
                        )}
                    </Carousel>
                </div>
                <div style={{height:'80px', marginTop:'10px', padding:'5px', background:'rgba(0, 21, 41, 0.8)', boxShadow:'0px -15px 25px 5px rgba(0,0,0,0.9)', textAlign:'center', zIndex:'2', bottom:'0'}}>
                    <h3>
                        <span style={{color:'white'}}>Made by:</span>
                        <span style={{color:'blue'}}> José Alves Júnior</span> 
                    </h3>
                </div>
            </Fragment>
        )
    }
}

export default ScreensHome
