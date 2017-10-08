import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { postLogin, logOut, getToken } from '../actions/index.js'

class ModalLogin extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    return (

    )
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(ModalLogin)
