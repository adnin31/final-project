import React, {Component} from 'react'
// import seat from '../screen.png'
import firebase from './firebase.js'
import './Seat.css'
import Listpage from './Listpage'
import { connect } from 'react-redux'
import { getUserFirebase, sendEmail } from '../actions/index'

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
      price: 35000
    }
  }

  setCounter() {
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

  componentDidMount() {
    this.setCounter()
    this.state.booked.forEach(booked => {
      db.ref(`${this.state.studio}/${booked}`).set({
        status: false
      })
    })
    this.props.getSeatFirebase(this.state.studio)
  }

  render() {
    return (
      <div className = 'container'>
        <h1>Pick your seat</h1>
        <div>
          <a className= 'btn btn-default' style={button} href= 'https://vr.ahmadaidil.cf/' target="_blank">See Your Cinema</a>
        </div>

        <div className= 'container' style= {boxStyle} >
          <div className='text-center'>
            <img src= {require('../assets/screen.png') }/>
            <div className= '' style = {boxStyleSeat}>
              {
                this.props.seats.map((seat,idx) => {
                  return (
                    <button onClick = {() => this.buttonSeat(idx+1)} style= {seatStyle} className={this.checkSeat(seat,idx)}  key= {idx}
                    disabled = {this.checkSeatDisable(seat.status, idx+1)}> {idx+1}</button>
                  )
                })
              }
            </div>
          </div>
        </div>
          {

            this.props.token !== null && this.props.token !== '' ?
            <div>
              <Listpage text= 'Summary'/>
              <ul>
                <h4>Studio {this.props.location.state.showtimeData[1].name}</h4>
              <p><span>Seat </span>: {this.state.onBook.join(', ')} </p>
                <p><span>Time </span>: {this.state.time} </p>
                <p><span>Date </span>: {this.state.date} </p>
              </ul>
              <hr className= 'col-md-12'/>
              <h3>
                <span className= 'col-md-8'>Total</span>
                <span className= 'col-md-4'> : Rp {this.state.onBook.length * this.state.price},00</span>
              </h3>
              <hr className= 'col-md-12'/>
              <button className= 'btn btn-danger btn-lg col-md-offset-10 col-md-2' onClick= {()=> this.booking()}>Book Now</button>
            </div>
            : ''
          }

      </div>
    )
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
      let newCounter = this.state.seats.map((seat,idx) => {
        if(seatId-1 === idx) seat.counter ++
        return seat
      })
      var newOnBook =  this.state.onBook
      if (this.state.seats[seatId-1].counter %2 !== 0) {
        newOnBook.push(seatId)
      }else {
        newOnBook.splice(newOnBook.indexOf(seatId),1)
      }
      this.forceUpdate()
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

  booking () {
    const dataEmail = {
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
  seats: state.seats.seats.slice(1,state.seats.seats.length),
  email: state.token.email,
  username: state.token.username
})

const mapDispatchToProps = dispatch => ({
    getSeatFirebase : studio => dispatch(getUserFirebase(studio)),
    sendEmail: (dataEmail) => dispatch(sendEmail(dataEmail))
})
export default connect(mapStateToProps, mapDispatchToProps) (Seat)
