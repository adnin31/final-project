import React, {Component} from 'react'
import Carousel from './Carousel'
import Listpage from './Listpage'
import NowPlaying from './NowPlaying'
import Footer from './Footer'


class Home extends Component{
  render () {
    return (
      <div>
        <div>
          <Carousel></Carousel>
          <Listpage text= 'Now Playing'></Listpage>
          <NowPlaying></NowPlaying>
          <Footer/>
        </div>
      </div>

    )
  }
}

export default Home
