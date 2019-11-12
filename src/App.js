import React, { Component} from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Particles from 'react-particles-js'

import { Provider } from 'react-redux'
import store from './redux'

import Screens from './screens'
import { params } from './App.css.js'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{position: "absolute",top: 0,left: 0,width: "100%", height: "100%", overflow:'hidden'}}>
            <Particles 
              params={params}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow:'hidden'
              }}
            />
            <Screens/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
