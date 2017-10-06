import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { postLogin, logOut } from '../actions/index.js'


class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      email: ''
    }
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
    console.log('ini navbar token',);
    return(
      <div>
        <nav className ="navbar navbar-default">
          <div className = "scontainer-fluid">
            <div className= "navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to='/'>Botick</Link>
            </div>

            <div className = "navbar-collapse collapse" id = "bs-example-navbar-collapse-1" aria-expanded="false" style={{height: 1}}>
              <ul className="nav navbar-nav navbar-right">
                { this.props.token ? <li><a className= 'btn' onClick= {() => this.props.logout('')}>Logout</a></li>  :
                <li><a className= 'btn' data-toggle="modal" data-target="#myModal" >Login</a></li> }

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
                  <form role="form">
                    <div className="form-group">
                      <label for="usrname"><span className="glyphicon glyphicon-user"></span> Username</label>
                    <input name= 'username' type="text" className= "form-control"  placeholder= "Enter user"  value= {this.state.username} onChange= {(e) => this.handleChange(e)}/>
                    </div>
                    <div className="form-group">
                      <label for="psw"><span className="glyphicon glyphicon-eye-open"></span> Password</label>
                    <input name= 'password' type="password" className="form-control" placeholder="Enter password" value= {this.state.password} onChange= {(event) => this.handleChange(event)}/>
                    </div>
                    <button  type="button" className="btn btn-success btn-block" data-dismiss="modal" onClick={() => this.props.postLogin(this.state)}><span className="glyphicon glyphicon-off"></span> Login</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span> Cancel</button>
                  <p>Not a member? <a href="#">Sign Up</a></p>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
 }
 const mapStateToProps = (state) => ({
   token: state.token.token
 })

 const mapDispatchToProps = (dispatch) => {
   return {
      postLogin: (data) => {
        this.setState({
          username: '',
          password: ''
        })
        dispatch(postLogin(data))
      },
      logout: (data) => {
        dispatch(logOut(data))
      }
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(Navbar)
