import React, {Component} from 'react'
import './Carousel.css'
class Carousel extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner" role="listbox" style= {{width:'100%', height: '400px' }}>
            <div className="item active">
              <img src="https://talenthouse-res.cloudinary.com/image/upload/c_fill,f_auto,h_491,w_640/v1420627641/user-145014/submissions/bab2rcqh2scxl0dws358.jpg" alt="Los Angeles" style= {pictStyle}/>
            </div>

            <div className="item">
              <img src="https://www.heavenofhorror.com/wp-content/uploads/2017/03/it-2017.jpg" alt="Chicago" style= {pictStyle}/>
            </div>

            <div className="item">
              <img src="https://www.heavenofhorror.com/wp-content/uploads/2016/11/leatherface-quad.jpg" alt="New york" style= {pictStyle}/>
            </div>
          </div>

          {/* <!-- Left and right controls --> */}
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className= "coming" ><h2>Coming Soon</h2></div>
      </div>
    )
  }

}

const pictStyle = {
  width: '100%'
}

export default Carousel
