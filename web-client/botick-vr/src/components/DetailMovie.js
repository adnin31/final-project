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
      trailer: "https://www.youtube.com/embed/XGSy3_Czz8k",
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
        <Listpage text ={this.state.title}/>
        <div className= "row" style={{'margin' : '20px'}}>
          <div className= 'col-md-4'>
            <img src={this.state.poster}/>
          </div>
          <div className= 'col-md-6'>
            <p>
              <h3 >Synopsis</h3>
                {this.state.overview}
              <br/>
              <h3>Cast</h3>
                <ul>
                  {
                    this.state.casts.map( cast =>{
                     return (
                       <li> {cast} </li>
                     )
                    }
                  )}
                </ul>
              <h3>Genre</h3>
              {this.state.genre}
              <h3>Rate</h3>
              {this.state.rate}
              <h3>Prduction</h3>
              {this.state.production}
            </p>
          </div>
        </div>
        <Listpage/>
        <div className='row'>
          <h2>Playing On</h2>
          <table class="table" style= {{'margin-left' : '50px'}}>
              <tr>
                {
                  this.state.time.map(schedule =>{
                    return(
                      <Link to= {
                        {
                          pathname:`/seat/${schedule}`,
                          state: {time: schedule}
                        }
                      } style={{'margin-right' : '30px'}}> <td style={{ 'font-size' : '150%'}}>  {schedule} </td> </Link>
                    )
                  })
                }
              </tr>

            </table>
          <div className= 'col-md-6'>
            <h2>Trailer</h2>
          <iframe width="555" height="350" src={this.state.trailer}/>

          </div>
          <div className= 'col-md-6'>


          </div>
        </div>
      </div>
    )
  }
}

export default DetailMovie
