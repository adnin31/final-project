import React, { Component } from 'react'
import {Provider} from 'react-redux'
import Store from './store'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import NowPlaying from './components/NowPlaying'
import Cinema from './components/Cinema'
import Navbar from './components/Navbar'
import DetailMovie from './components/DetailMovie'



class App extends Component {
  render() {
    return (
    <Provider store={Store}>
      <Router>
        <div>
          <Navbar></Navbar>
          <Route exact path="/" component= {Home}/>
        <Route exact path="/detail/1" component= {DetailMovie}/>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
