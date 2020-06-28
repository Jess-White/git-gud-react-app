import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

  class Navigation extends Component {
    state = {
    };

    logout = () => {
    localStorage.removeItem("token");
    };

    render() {
      return (
          <div className="App" > 
                  <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor: "#350350"}} >
                    <div className="container">
                       <div> 
                          <NavLink style={{color: "white"}} className="navbar-brand" to="/">Home</NavLink>
                          <NavLink style={{color: "white"}} className="navbar-brand" to="/dashboard">Dashboard</NavLink>
                          <NavLink style={{color: "white"}} className="navbar-brand" to="/resources">Resources</NavLink>
                          <NavLink style={{color: "white"}} className="navbar-brand" to="/reviews">Reviews</NavLink>
                  </div>
                </div>
              </nav>
          </div>
        );
    }
  }

  export default Navigation;
