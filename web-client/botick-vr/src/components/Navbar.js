import React, {Component} from 'react'


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
              <a className="navbar-brand" href="#">Botick</a>
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
