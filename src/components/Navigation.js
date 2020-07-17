import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  state = {}

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#00E000" }} >
          <div className="container">
            <div>
              <NavLink style={{ color: "black" }} className="navbar-brand" to="/signup">Signup</NavLink>
              <NavLink style={{ color: "black" }} className="navbar-brand" to="/login">Login</NavLink>
              <NavLink style={{ color: "black" }} className="navbar-brand" to="/dashboard">Dashboard</NavLink>
              <NavLink style={{ color: "black" }} className="navbar-brand" to="/resources">Resources</NavLink>
              <NavLink style={{ color: "black" }} className="navbar-brand" to="/reviews">Reviews</NavLink>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
