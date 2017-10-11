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
      seats: [{counter:0}],
      totalSeat: props.location.state.showtimeData[0].seatsTotal,
      booked: props.location.state.showtimeData[0].seatBooked,
      onBook: [],
      time: props.location.state.showtimeData[0].startTime,
      date: Date().split(' ').slice(0,4).join(' '),
      studio: 'studio'+this.props.location.state.showtimeData[1].name,
      price: 35000,
      seatSelected: 0,
      test: 'false',
      firebaseAddress : '',
      dataTarget: ''
    }
  }

  setSeats(data) {
    console.log(`${data.movieId}/${data.studio}/${data.time}`);
    db.ref(`${data.movieId}/${data.studio}/${data.time}`)
    .on('value', snapshot => {
      var newSeats = snapshot.val().slice(1, snapshot.val().length)
      var newOnBook =  []
      snapshot.val().forEach( (data,idx) => {
        if (data.selected) {
          newOnBook.push(idx)
        }
      })
      this.setState({
        onBook: newOnBook,
        firebaseAddress: `${data.movieId}/${data.studio}/${data.time}`,
        seats : newSeats
      })
    })
  }

  componentDidMount() {
    let variableFirebase = {
      movieId: this.props.location.state.showtimeData[3],
      studio: 'studio'+this.props.location.state.showtimeData[1].name,
      time: this.props.location.state.showtimeData[0].startTime.split('.').join(':')
    }
    this.setSeats(variableFirebase)
    this.props.getMovieShowTime(this.props.location.state.showtimeData[0]._id)
    this.props.getSeatFirebase(this.state.studio)
  }

  render() {
    return (
      <div className = 'container' style={{marginTop:'100px'}}>
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
                    <button className = 'btn btn-primary' data-dismiss="modal" onClick={() => this.clickModal(this.state.seatSelected)}>Select This Seat </button>
                  </div>
                  <div>
                    <a href= {`http://vr.ahmadaidil.cf/?${this.props.match.params.id}/${this.state.studio}/${this.props.location.state.showtimeData[0].startTime.split('.').join(':')}/${this.state.seatSelected}`} target="_blank"className = 'btn btn-success modalButton'> View in vr </a>
                  </div>

                </div>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
        </div>
        <h1>Pick your seat</h1>

        <div className= 'container'>
          <div className='text-center'>
            <div >
              <img alt='screen' src= {require('../assets/screen.png') }/>
            </div>

          <div className= 'col-md-offset-4' style = {boxStyleSeat}>
              {
                this.state.seats.map((seat,idx) => {
                  return (
                    <button onClick = {() => this.buttonSeat(idx+1, seat.selected, seat.userid)} style= {seatStyle} className={  seat.status ?  seat.selected ? 'btn btn-success' : 'btn btn-default' : 'btn btn-danger disabled'}  key= {idx}
                    disabled = {this.checkSeatDisable(seat.status, idx+1)} data-toggle="modal" data-target={seat.selected ? '' :'#seatModal'}> {idx+1}</button>
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
                <h4>Title: {this.props.location.state.showtimeData[2]}</h4>
                <p><span>Seat </span>: {this.state.onBook} </p>
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
  clickModal (seatId) {
    db.ref(this.state.firebaseAddress+`/${seatId}`).set({
      selected: true,
      status: true
    })
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

  buttonSeat (seatId,status,userId) {
    if (this.props.token === null) {
        alert('You must login first')
        this.setState({
          dataTarget: ''
        })
    } else {
        this.setState({
          seatSelected: seatId
        })
        this.setState({
          dataTarget: ''
        })
        db.ref(this.state.firebaseAddress+`/${seatId}`).set({
          selected: false,
          userid: '',
          status: true
        })
    }

  }

  checkSeat (seat,idx) {


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
    var statusUpdates = {}

    this.state.onBook.forEach(seat => {
      statusUpdates[`${this.state.firebaseAddress}/${seat}`]= false
      db.ref().update(statusUpdates)
    })

  }
}
const boxStyleSeat ={
  width: '24%',
  height: '200px',
  marginLeft: '416px'
}
const seatStyle = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
  marginLeft: '10px',
  marginTop: '39px',

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
