import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getAllMovie, getAllStudio } from '../actions/index'
import './NowPlaying.css'

class NowPlaying extends Component{
  constructor(props) {
    super (props)
    this.state={
      movie: props.movieList
    }
  }

  componentDidMount () {
    this.props.getMovie()
    this.props.getStudio()
  }

  render () {
    return (
      <div className= "container">
        <div className="row">
          { this.props.movieList.map( (movie, idx) => {
            return (
              <Link to ={{
                pathname: '/detail/' + movie._id,
                state: {
                  movie: movie,
                  studio: this.props.studioList
                }
              }} key={idx}>
              <div className="col-sm-6 col-md-4 " style = {studio}>
                <div className="thumbnail" >
                  <img style={{height: '550px', width: 'auto'}} alt= 'Movie poster' src={movie.poster} />
                </div>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  movieList: state.movie.movielist,
  studioList: state.studio.studiolist
})

const mapDispatchToProps = dispatch => ({
  getMovie: () => dispatch(getAllMovie()),
  getStudio: () => dispatch(getAllStudio())
})

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying)

const studio = {
  'marginTop': '20px'
}
