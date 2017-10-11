import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

export default class TransactionSuccess extends Component {
  constructor() {
    super ()
    this.state = {
      username: '',
      email: ''
    }
  }
  componentDidMount() {
    this.setState({
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email')
    })
  }
  render () {
    return(
      <div >
        <div style = {{marginTop: '9%'}}>
          <h1>Success</h1>
          <h2> Dear, {this.state.username}</h2>
          <p>Thank you for verifying your Mobile No.We  have sent you an email "faisalkhan.chat@gmail.com" with your details
            Please go to your above email now and login.</p>
          <button></button>
        </div>

      </div>
    )
  }
}
