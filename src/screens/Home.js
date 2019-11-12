import React, { Component, Fragment } from 'react'
import { Carousel} from 'antd'
import { Image } from 'semantic-ui-react'

import { carousel, titleImage, Footer } from './Home.css'

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
                <div style={carousel}>
                    <Carousel 
                        pauseOnHover={false} 
                        pauseOnDotsHover={true} 
                        autoplaySpeed={4000} 
                        speed={1500} 
                        autoplay
                    >
                        {urls.map((value, key) => 
                            <div key={key}>
                                <h4 style={titleImage}>{titles[key]}</h4>
                                <Image
                                    src={value}
                                    fluid
                                    style={{borderRadius:'10px'}}
                                /> 
                            </div>
                        )}
                    </Carousel>
                    <Footer style={{textAlign: 'center'}}>
                        <span style={{color:'blue'}}>Developed by:</span>
                        <span style={{color:'white'}}> José Alves Júnior</span> 
                    </Footer>
                </div>
            </Fragment>
        )
    }
}

export default ScreensHome