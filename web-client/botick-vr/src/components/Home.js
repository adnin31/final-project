import React, {Component} from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel'
import Listpage from './Listpage'
import NowPlaying from './NowPlaying'

class Home extends Component{
  constructor() {
    super()
  }

  render () {
    return (
      <div>
        <div>
          <Carousel></Carousel>
          <Listpage text= 'Now Playing'></Listpage>
          <NowPlaying></NowPlaying>
        </div>
      </div>

    )
  }
}

export default Home
