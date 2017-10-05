import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class NowPlaying extends Component{
  constructor() {
    super ()
  }

  render () {
    return (
      <div className= "container">
        <div className="row">
        <Link to ='/detail/1'>
          <div className="col-sm-6 col-md-4 " style = {studio}>
            <div className="thumbnail" >
              <div className="caption text-center">
                <h3 >Studio 1</h3>
              </div>
              <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg" />
              <div className="caption text-center">
                <h3 >Thumbnail label</h3>
              </div>
            </div>
          </div>
        </Link>


          <div className="col-sm-6 col-md-4" style = {studio} >
            <div className="thumbnail"  >
              <div className="caption text-center">
                <h3 >Studio 2</h3>
              </div>
              <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg" />
              <div className="caption text-center">
                <h3 >Thumbnail label</h3>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4 " style = {studio}>
            <div className="thumbnail"  onClick={() => this.clickMovie() }>
              <div className="caption text-center">
                <h3 >Studio 3</h3>
              </div>
              <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg" />
              <div className="caption text-center">
                <h3 >Thumbnail label</h3>
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }

  clickMovie () {
    console.log('click ini');
  }

}

const studio = {
  'margin-top' : '20px'
}
export default NowPlaying
