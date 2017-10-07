import React, {Component} from 'react'
// import seat from '../screen.png'
import firebase from 'firebase'

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
  constructor() {
    super ()
    this.state = {
      status : true,
      counterSeat1: 1,
      counterSeat2: 1,
      counterSeat3: 1,
      user: 0
    }
  }
  componentWillMount() {
    // console.log('ini will mount');
    // this.state.user ++
    // console.log('ini sehabis ditambah',this.state.user);
    // user.set(this.state.user)
    // user.on('value', snapshot => {
    //   console.log(snapshot.val());
    //   this.setState({
    //     user: snapshot.val()
    //   })
    // })



  }
  render() {
    console.log(this.state.user)
    return (
      <div className = 'container'>
        <h1>Pick your seat</h1>
        <div>
          <button className= 'btn btn-default' style={button}>See Your Cinema</button>
        </div>
        <div className= 'container' style= {boxStyle} >
          <div className='text-center row'>
            <img src= {require('../assets/screen.png') }/>
          </div>

          <div className='text-center row' style={{'marginTop' : '80px' }}>
            <div >
              <button className= {this.state.counterSeat1 % 2  ? 'btn btn-primary col-md-offset-4 col-md-4': 'btn btn-warning col-md-offset-4 col-md-4' }  style={seatStyle}
              onClick = {() => this.buttonSeat('seat1')} >  Seat 1 </button>
            </div>
            <div className='seat'>
              <button className={this.state.counterSeat2 % 2  ? 'btn btn-primary col-md-offset-4 col-md-4': 'btn btn-warning col-md-offset-4 col-md-4' } style={seatStyle}
                onClick = {() => this.buttonSeat('seat2')}> Seat 2 </button>
            </div>
            <div className='seat'>
              <button className={this.state.counterSeat3 % 2  ? 'btn btn-primary col-md-offset-4 col-md-4': 'btn btn-warning col-md-offset-4 col-md-4' } style={seatStyle}
                onClick = {() => this.buttonSeat('seat3')}> Seat 3 </button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  buttonSeat (seat) {

    switch (seat) {
      case 'seat1':
        let plus = this.state.counterSeat1 + 1
        fireSeat1.set({
          counter: plus
        })
        fireSeat1.on('value', snapshot => {
          this.setState ({
            counterSeat1:  snapshot.val().counter
          })
        })

        break;
      case 'seat2':
        let plus2 = this.state.counterSeat2 + 1
        this.setState ({
          counterSeat2:  plus2
        })
        break;
      case 'seat3':
        let plus3 = this.state.counterSeat3 + 1
        this.setState ({
          counterSeat3:  plus3
        })
        break;
      default:

    }

  }

}

const seatStyle = {
  marginTop : '20px',
  marginBottom: '20px',
}
const boxStyle ={
  border: 'solid'
}

const button = {
  marginBottom: '20px'
}
export default Seat
