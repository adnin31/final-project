import React, {Component} from 'react'
// import seat from '../screen.png'
import firebase from 'firebase'
import './Seat.css'
import Listpage from './Listpage'

var config = {
    apiKey: "AIzaSyCAndawPNofKLlN9W3EjWGYtqYnH1CneSc",
    authDomain: "movie-trailer-175012.firebaseapp.com",
    databaseURL: "https://movie-trailer-175012.firebaseio.com",
    projectId: "movie-trailer-175012",
    storageBucket: "movie-trailer-175012.appspot.com",
    messagingSenderId: "584104791052"
  };

firebase.initializeApp(config);
var database = firebase.database();
var fireSeat1 = database.ref('/seat')
var user = database.ref('/user')


class Seat extends Component {
  constructor(props) {
    super (props)
    this.state = {
      status : true,
      counter: [],
      totalSeat: props.location.state.showtimeData[0].seatsTotal,
      booked: props.location.state.showtimeData[0].seatBooked,
      onBook: [],
      time: props.location.state.showtimeData[0].startTime,
      date: Date().split(' ').slice(0,4).join(' '),
      price: 35000
    }
  }
  componentWillMount() {
    var newCounterValue =[]
    for (var i = 1; i <= this.state.totalSeat; i++) {
      newCounterValue.push({
        status: true,
        user: '',
        price: '',
        counter: 0
      })
    }
    newCounterValue.map((value,idx) => {
      var newBooked = this.state.booked.filter((booked)=>{
        return `${idx}` === booked
      })
      console.log('ini newBooked' , newBooked);
      if(`${idx}` === newBooked[0] ){
        value.status = false
      }
    })
    this.setState({
      counter : newCounterValue
    })
  }

  render() {
    console.log('ini seat coy', this.props.location.state.showtimeData);
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
                this.state.counter.map((seat,idx) => {
                  return (
                    <button onClick = {() => this.buttonSeat(idx+1)} style= {seatStyle} className={this.checkSeat(seat)}  key= {idx}> {idx+1}</button>
                  )
                })
              }
            </div>
          </div>
        </div>
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
        <button className= 'btn btn-danger btn-lg col-md-offset-10 col-md-2'>Book Now</button>
      </div>
    )
  }

  buttonSeat (seat) {
    let newCounter = this.state.counter.map((data,idx) => {
      if(seat-1 === idx) data.counter ++
      return data
    })
    var newOnBook =  this.state.onBook
    if (this.state.counter[seat-1].counter %2 !== 0) {
      newOnBook.push(seat)
    }else {
      newOnBook.splice(newOnBook.indexOf(seat),1)
    }
    this.forceUpdate()

  }

  checkSeat (seat) {
    if(seat.status){
      if (seat.counter % 2 === 0) {
        return 'btn btn-primary'
      } else {
        return 'btn btn-warning'
      }
    } else {
      return 'btn btn-danger disabled'
    }
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
  // marginTop: '10px',
  // marginBottom: '20px'

}
const button = {
  marginBottom: '20px'
}
export default Seat
