import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { connect } from 'react-redux'

import { getAllMovie, getAllStudio } from '../actions/index'

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
    console.log('ini di render', this.props.movieList)
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
                  <div className="caption text-center">
                    <h3>{movie.title}</h3>
                  </div>
                  <img style={{height: '550px', width: 'auto'}}src={movie.poster} />
                  <div className="caption text-center">
                  </div>
                </div>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    )
  }

  // componentWillReceiveProps () {
  //   this.setState({
  //     movie: this.props.movieList
  //   })
  // }

  clickMovie () {
    console.log('click ini');
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
