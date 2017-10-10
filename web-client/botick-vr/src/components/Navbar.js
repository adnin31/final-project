import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { postLogin, logOut, getToken, register } from '../actions/index.js'
import './Navbar.css'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }
  componentWillMount () {
    var dataUser = {
      token: localStorage.getItem('token'),
      username: this.props.username,
      email: this.props.email
    }
    this.props.willToken(dataUser)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  logout () {
    localStorage.removeItem('token')
  }

  render () {
    return(
      <div>
        <nav id="nav-menu" className ="navbar navbar-default test navbar-fixed-top">
          <div className = "container">
            <div className= "navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to='/'><img alt= 'logo' className= 'logo' src ='logo.png'/></Link>
            </div>

            <div className = "navbar-collapse collapse" id = "bs-example-navbar-collapse-1" aria-expanded="false" style={{height: 1}}>

              <ul className="nav navbar-nav navbar-right">
                { this.props.token ? <li><a className= 'btn' onClick= {() => this.props.logout('')}>Logout</a></li>  :
                  <li style={{display: 'flex', alignItems: 'baseline'}}>
                    <a className= 'btn' data-toggle="modal" data-target="#myModal" >Login</a> or <a className= 'btn' data-toggle="modal" data-target="#myRegister" >Register</a>
                  </li>
               }

              </ul>
            </div>
          </div>
        </nav>

        <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              {/* <!-- Modal content--> */}
              <div className="modal-content">
                <div className="modal-header" style={{'padding':'35px 50px'}} >
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4><span className="glyphicon glyphicon-lock"></span> Login</h4>
                </div>
                <div className="modal-body" style={{'padding':'40px 50px'}}>
                  <form >
                    <div className="form-group">
                      <label><span className="glyphicon glyphicon-user"></span> Username</label>
                    <input name= 'username' type="text" className= "form-control"  placeholder= "Enter user"  value= {this.state.username} onChange= {(e) => this.handleChange(e)}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="psw"><span className="glyphicon glyphicon-eye-open"></span> Password</label>
                    <input name= 'password' type="password" className="form-control" placeholder="Enter password" value= {this.state.password} onChange= {(event) => this.handleChange(event)}/>
                    </div>
                    <button  type="button" className="btn btn-success btn-block" data-dismiss="modal" onClick={() => this.setLogin(this.state)}><span className="glyphicon glyphicon-off"></span> Login</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span> Cancel</button>
                  <p>Not a member? <a className='btn' data-dismiss="modal" data-toggle="modal" data-target="#myRegister">Sign Up</a></p>
                </div>
              </div>
            </div>
        </div>

        <div className="modal fade" id="myRegister" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{'padding':'35px 50px'}} >
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4><span className="glyphicon glyphicon-pencil"></span> Register</h4>
                </div>
                <div className="modal-body" style={{'padding':'40px 50px'}}>
                  <form>

                    <div className="form-group">
                      <label><span className="glyphicon glyphicon-user"></span> Username</label>
                    <input name= 'username' type="text" className= "form-control"  placeholder= "Enter user"  value= {this.state.username} onChange= {(e) => this.handleChange(e)}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="psw"><span className="glyphicon glyphicon-eye-open"></span> Password</label>
                    <input name= 'password' type="password" className="form-control" placeholder="Enter password" value= {this.state.password} onChange= {(event) => this.handleChange(event)}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="psw"><span className="glyphicon glyphicon glyphicon-envelope"></span> Email </label>
                    <input name= 'email' type="input" className="form-control" placeholder="Enter Yout Email" value= {this.state.email} onChange= {(event) => this.handleChange(event)}/>
                    </div>

                    <button  type="button" className="btn btn-success btn-block" data-dismiss="modal" onClick={() => this.setRegister(this.state)}><span className="glyphicon glyphicon-off"></span> Login</button>

                  </form>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span> Cancel</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }

  setLogin(dataForm) {
    this.props.postLogin(dataForm)
    this.setState({
      username: '',
      password: ''
    })
  }

  setRegister (dataForm) {
    this.props.signup(dataForm)
    this.setState({
      username: '',
      password: '',
      email: ''
    })
  }
 }
 const mapStateToProps = (state) => ({
   token: state.token.token,
   email: state.token.email,
   username: state.token.username
 })

 const mapDispatchToProps = (dispatch) => {
   return {
      postLogin: (data) => {
        dispatch(postLogin(data))
      },
      logout: (data) => {
        dispatch(logOut(data))
      },
      willToken: (data) => {
        dispatch(getToken(data))
      },
      signup: data => {
        dispatch(register(data))
      }
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(Navbar)
