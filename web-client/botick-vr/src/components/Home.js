import React, {Component} from 'react'
import Carousel from './Carousel'
import Listpage from './Listpage'
import NowPlaying from './NowPlaying'


class Home extends Component{
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
