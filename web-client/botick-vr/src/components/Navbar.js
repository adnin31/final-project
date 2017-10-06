import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


class Navbar extends Component {
  constructor() {
    super()
  }
  render () {
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
                <li><a href="#">Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }

}

export default Navbar
