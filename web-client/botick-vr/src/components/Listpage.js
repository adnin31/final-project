import React, {Component} from 'react'

class ListMovie extends Component {
  constructor () {
    super()
    this.state = {
      playing: 'active col-md-6',
      cinema: 'col-md-6'
    }
  }

  render () {
    return (
      <ul className="nav nav-tabs container" style = {studio}>
        <li role="presentation"><h2>{this.props.text}</h2></li>
      </ul>
    )
  }

}

const studio = {
  'marginTop' : '20px'
}

export default ListMovie
