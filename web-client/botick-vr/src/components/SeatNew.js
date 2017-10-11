import React, { Component } from 'react'
import firebase from './firebase.js'

const db = firebase.database()

export default class SeatNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seats: null,
      userId: localStorage.getItem('userid') ? localStorage.getItem('userid') : null
    }
  }

  getSeats() {
    const movieId = this.props.match.params.movieId
    const studioName = this.props.match.params.studioName
    const time = this.props.match.params.time
    db.ref(`${movieId}/${studioName}/${time}`)
    .on('value', seats => {
      this.setState({
        seats: seats.val()
      })
    })
  }

  componentDidMount() {
    this.getSeats()
  }

  render() {
    const seats = this.state.seats

    return seats==null ? <h1>CUKKK</h1> :
    (
      <div style={{
          marginTop: '100px'
        }}>
        {
          seats.map((seat, index) => {
            return (
              <button
                key={index}
                className={!seat.status ? 'btn disabled' : seat.selected ? 'btn btn-primary' : 'btn btn-default'}
                onClick={ () => !seat.user[this.state.userId] ? console.log('unselect') : console.log('keluar modal')}
                disabled={seat.status ? false : true }
              >
                {index}
              </button>)
          })
        }
      </div>
    )
  }

  noUser() {
    alert('belum login lu')
  }

  onClickChange(index) {

  }

}
