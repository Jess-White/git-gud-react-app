import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Navigation extends Component {
  state = {}
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLogoutClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    this.props.history.push('/login');
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#00E000" }} >
          <div className="container">
            <div>
              {localStorage.token && localStorage.user_id ?
                <div>
                  <NavLink style={{ color: "black" }} className="navbar-brand" to="/dashboard">Dashboard</NavLink>
                  <NavLink style={{ color: "black" }} className="navbar-brand" to="/resources">Resources</NavLink>
                  <NavLink style={{ color: "black" }} className="navbar-brand" to="/resources-new">Add Resource</NavLink>
                  {/* <NavLink style={{ color: "black" }} className="navbar-brand" to={() => props.logout()}>Logout</NavLink> */}
                  {/* <Link to={() => props.logout()}>Logout</Link> */}
                  <div className="navbar-brand btn btn-danger" onClick={this.handleLogoutClick}>Logout</div>
                </div>
                :
                <div>
                  <NavLink style={{ color: "black" }} className="navbar-brand" to="/signup">Signup</NavLink>
                  <NavLink style={{ color: "black" }} className="navbar-brand" to="/login">Login</NavLink>
                </div>
              }

            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);
