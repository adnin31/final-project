import React, {Component} from 'react'
// import seat from '../screen.png'
import firebase from 'firebase'
import './Seat.css'

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
      totalSeat: props.location.state.showtimeData.seatsTotal
    }
  }
  componentWillMount() {
    var newCounterValue =[]
    for (var i = 1; i <= this.state.totalSeat; i++) {
      newCounterValue.push(1)
    }
    this.setState({
      counter : newCounterValue
    })
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
                this.state.counter.map((seat,idx) => {
                  return (
                    <button onClick = {() => this.buttonSeat(idx+1)} style= {seatStyle} className= 'btn btn-primary' key= {idx}> {idx+1}</button>
                  )
                })
              }
            </div>
          </div>
        </div>


      </div>
    )
  }

  buttonSeat (seat) {
    console.log(seat);
    console.log('ini di state',this.state.counter[seat]);
  }

}

const boxStyle ={
  border: 'solid'
}
const boxStyleSeat ={

  width: '400px',
  height: '500px',
  marginLeft: '35%',
  display : 'flex',
  flexWrap: 'wrap'
}
const seatStyle = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
  marginLeft: '10px',
  marginTop: '20px',
  // marginBottom: '20px'

}
const button = {
  marginBottom: '20px'
}
export default Seat
