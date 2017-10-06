import React, {Component} from 'react'

class Seat extends Component {
  constructor() {
    super ()
  }

  render() {
    return (
      <div className = 'container'>
        <h1>ini kursi</h1>
      <p>{this.props.location.state.time}</p>
      </div>
    )
  }

}

export default Seat
