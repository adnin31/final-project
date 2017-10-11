import React, { Component } from 'react'
import {Provider} from 'react-redux'
import Store from './store'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import DetailMovie from './components/DetailMovie'
import Seat from './components/Seat'
import Footer from './components/Footer'
import SeatNew from './components/SeatNew'
import TransactionSuccess from './components/TranssactionsSuccess'

class App extends Component {
  render() {
    return (
    <Provider store={Store}>
      <Router>
        <div>
          <Navbar></Navbar>
          <Route exact path='/' component={Home} />
          <Route exact path='/detail/:id' component={DetailMovie} />
          <Route exact path='/booking/:movie/:id' component={Seat} />
          <Route exact path='/book/:studioName/:movieId/:time' component={SeatNew}/>
        <Route exact path='/success' component={TransactionSuccess}/>
          <Footer/>
        </div>
      </Router>
    </Provider>
    )
  }
}

export default App
