import React, {Fragment} from 'react'
import 'semantic-ui-css/semantic.min.css' 
import "antd/dist/antd.css"
import Navbar from './elements/Navbar'
import Roots from './elements/Roots'
import {Footer} from './elements/Footer'


const Screens = () => {
    return(
        <Fragment>
            <Navbar/>
            <Roots/>
            <Footer/>
        </Fragment>
    )
}

export default Screens