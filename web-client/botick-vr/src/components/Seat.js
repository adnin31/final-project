import React, {Component} from 'react'
// import seat from '../screen.png'
import firebase from './firebase.js'
import './Seat.css'
import Listpage from './Listpage'
import { connect } from 'react-redux'
import { getSeatFirebase, sendEmail, getMovieShowTime } from '../actions/index'
// import uang from 'uang'

var db = firebase.database();

class Seat extends Component {
  constructor(props) {
    super (props)
    this.state = {
      status : true,
      seats: [],
      totalSeat: props.location.state.showtimeData[0].seatsTotal,
      booked: props.location.state.showtimeData[0].seatBooked,
      onBook: [],
      time: props.location.state.showtimeData[0].startTime,
      date: Date().split(' ').slice(0,4).join(' '),
      studio: 'studio'+this.props.location.state.showtimeData[1].name,
      price: 35000,
      seatSelected: 0,
      test: 'false'
    }
  }

  setCounter(data) {
    var newCounter = []
    for (var i = 0 ; i < this.state.totalSeat; i++) {
      newCounter.push({
        counter: 0
      })
    }
    this.setState({
      seats : newCounter
    })
  }

  componentWillMount() {
    this.props.getMovieShowTime(this.props.match.params.id)
    this.setCounter()
    db.ref('test/').on('value', snapshot => {
      this.setState({
        test: snapshot.val().selected
      })
    })

    this.props.getSeatFirebase(this.state.studio)
  }

  render() {
    return (
      <div className = 'container' style={{marginTop:'75px'}}>
        <div className="modal fade" id="seatModal" role="dialog">
            <div className="modal-dialog">
              {/* <!-- Modal content--> */}
              <div className="modal-content">
                <div className="modal-header text-center" style={{'padding':'35px 50px'}} >
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4>Seat {this.state.seatSelected}</h4>
                </div>
                <div className="modal-body" style={{'padding':'40px 50px'}}>
                <div className= 'row-seat'>
                  <div>
                    <button className = 'btn btn-primary'>Select This Seat </button>
                  </div>
                  <div>
                    <button className = 'btn btn-success modalButton'> View in vr </button>
                  </div>

                </div>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
        </div>
        <h1>Pick your seat</h1>
        <div>
          <a className= 'btn btn-default' style={button} href= 'https://vr.ahmadaidil.cf/' >See Your Cinema</a>
        </div>

        <div className= 'container' style= {boxStyle} >
          <div className='text-center'>
            <img alt='screen' src= {require('../assets/screen.png') }/>
            <div className= '' style = {boxStyleSeat}>
              {
                this.props.seats.map((seat,idx) => {
                  return (
                    <button onClick = {() => this.buttonSeat(idx+1)} style= {seatStyle} className={this.checkSeat(seat,idx)}  key= {idx}
                    disabled = {this.checkSeatDisable(seat.status, idx+1)} data-toggle="modal" data-target="#seatModal"> {idx+1}</button>
                  )
                })
              }
            </div>
          </div>
        </div>
          <button onClick= {()=>this.clickTest()}> test cok</button>
          <h1>{this.state.test}</h1>
          {

            this.props.token !== null && this.props.token !== '' ?
            <div>
              <Listpage text= 'Summary'/>
              <ul>
                <h4>Studio {this.props.location.state.showtimeData[1].name}</h4>
                <h4>Title: {this.props.location.state.showtimeData[2]}</h4>
                <p><span>Seat </span>: {this.state.onBook.join(', ')} </p>
                <p><span>Time </span>: {this.state.time} </p>
                <p><span>Date </span>: {this.state.date} </p>
              </ul>
              <hr className= 'col-md-12'/>
              <h3>
                <span className= 'col-md-8'>Total</span>
                <span className= 'col-md-4'> : {this.uangFormatter(this.state.onBook.length * this.state.price)},00</span>
              </h3>
              <hr className= 'col-md-12'/>
              <button className= 'btn btn-danger btn-lg col-md-offset-10 col-md-2' onClick= {()=> this.booking()}>Book Now</button>
            </div>
            : ''
          }

      </div>
    )
  }
  clickTest () {
    if(this.state.test !== 'true') {
      db.ref('test/').set({
        selected: 'true',
        user: `${localStorage.getItem('username')}`
      })
    }else {
      db.ref('test/').set({
        selected: 'false',
        user: `${localStorage.getItem('username')}`
      })
    }
  }
  checkSeatDisable(status, number) {
    if(!status) {
      const onBook = this.state.onBook.filter(index => index != number)
      if(onBook.length !== this.state.onBook.length){
        this.setState({
          onBook
        })
      }
      return true
    }
    return false
  }

  buttonSeat (seatId) {
    if (this.props.token === null) {
        alert('You must login first')
    } else {
      this.state.seatSelected = seatId
    }

  }

  checkSeat (seat,idx) {
    if(seat.status){
      if (this.state.seats[idx].counter % 2 === 0) {
        return 'btn btn-default'
      } else {
        return 'btn btn-success'
      }
    } else {
      return 'btn btn-danger disabled'
    }
  }

  uangFormatter(uang){
    return uang.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  booking () {
    const dataEmail = {
      studio: this.props.location.state.showtimeData[1].name,
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username'),
      seatBook: this.state.onBook
    }
    this.props.sendEmail(dataEmail)
    this.state.onBook.forEach(seat => {
      db.ref(`${this.state.studio}/${seat}`).set({
        status: false
      })
    })
    this.setCounter()
  }
}

const boxStyle ={
  border: 'solid'
}
const boxStyleSeat ={

  width: '400px',
  height: '400px',
  marginTop: '30px',
  marginLeft: '35%',
  display : 'flex',
  flexWrap: 'wrap'
}
const seatStyle = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
  marginLeft: '10px',

}
const button = {
  marginBottom: '20px'
}

const mapStateToProps = (state) => ({
  movieList: state.movie.movielist,
  studioList: state.studio.studiolist,
  token: state.token.token,
  seats: state.firebase.seats,
  email: state.token.email,
  username: state.token.username,
  movieShowTime: state.movie.movieShowTime
})

const mapDispatchToProps = dispatch => ({
    getSeatFirebase : studio => dispatch(getSeatFirebase(studio)),
    sendEmail: dataEmail => dispatch(sendEmail(dataEmail)),
    getMovieShowTime: idMovieShowTime => dispatch(getMovieShowTime(idMovieShowTime))
})
export default connect(mapStateToProps, mapDispatchToProps) (Seat)
