import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Listpage from './Listpage'
import './DetailMovie.css'
class DetailMovie extends Component{
  constructor() {
    super()
    this.state = {
      title: 'IT',
      overview: 'In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.',
      poster: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
      trailer: "https://www.youtube.com/embed/xKJmEC5ieOk",
      rate: 'Remaja 15+',
      production: 'New Line Cinema',
      casts: ['Jaeden Lieberher', 'Bill Skarsgård', 'Jeremy Ray Taylor', 'Sophia Lillis', 'Finn Wolfhard'],
      genre: 'Thriller',
      time: ['13:00', '15:00', '18:00', '20:30'],
    }
  }

  render () {
    return (
      <div className= "container">

        <div className= "row" style={{'margin' : '20px'}}>
          <div className= 'col-md-4'>
            <img src={this.state.poster}/>
          </div>
          <div className= 'col-md-6'>
            <iframe width="720" height="450" src={this.state.trailer}/>

          </div>
        </div>
        <Listpage text ={this.state.title}/>
      <div className='row detail'>
          <div className= 'col-md-4'>
            <ul>
              <li><span>Casts</span>
              : {
                  this.state.casts.map((actor,idx)=>{
                    return(
                      <span key={idx}>{actor},</span>
                    )
                  })
                }
              </li>
              <li>
                <span>Genre</span>
                :{this.state.genre}
              </li>
              <li>
                <span>Rate</span>
                :{this.state.rate}
              </li>
              <li>
                <span>Productions</span>
                :{this.state.production}
              </li>
            </ul>
          </div>
          <div className='col-md-6'>
            <p>{this.state.overview}</p>
          </div>
        </div>

        <hr className='col-md-12' style={{'margin' : '0px'}}/>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Schedule</h2>
          <hr className='col-md-12' style={{'margin' : '0px'}}/>
        <h4>Pick your time</h4>
          <table className="table text-center">
              <tr>
                {
                  this.state.time.map((schedule, idx) =>{
                    return(
                      <Link key={idx} to= {
                        {
                          pathname:`/booking/${this.state.title}`,
                          state: {time: schedule}
                        }
                      }> <td className= 'btn btn-default' style={{ 'font-size' : '150%' , 'width' : '250px', 'margin' : '15px'}}>  {schedule} </td> </Link>
                    )
                  })
                }
              </tr>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailMovie
