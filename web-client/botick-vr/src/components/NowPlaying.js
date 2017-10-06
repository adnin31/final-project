import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { connect } from 'react-redux'

import { getAllMovie, getAllTheater } from '../actions/index'

class NowPlaying extends Component{
  constructor(props) {
    super (props)
    this.state={
      movie: props.movieList
    }
  }

  componentDidMount () {
    this.props.getMovie()
    this.props.getTheater()
  }

  render () {
    console.log('ini di render', this.props.movieList)
    return (
      <div className= "container">
        <div className="row">
          { this.props.movieList.map( (movie, idx) => {
            return (
              <Link to ='/detail/1' key={idx}>
              <div className="col-sm-6 col-md-4 " style = {studio}>
                <div className="thumbnail" >
                  <div className="caption text-center">
                    <h3>{movie.title}</h3>
                  </div>
                  <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg" />
                  <div className="caption text-center">
                    <h3 >Thumbnail label</h3>
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
  theaterList: state.theater
})

const mapDispatchToProps = dispatch => ({
  getMovie: () => dispatch(getAllMovie()),
  getTheater: () => dispatch(getAllTheater())
})

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying)

const studio = {
  'margin-top': '20px'
}
