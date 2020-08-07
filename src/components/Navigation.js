import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function Navigation(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#00E000" }} >
        <div className="container">
          <div>
            {localStorage.token && localStorage.user_id ? null :
              <div>
                <NavLink style={{ color: "black" }} className="navbar-brand" to="/signup">Signup</NavLink>
                <NavLink style={{ color: "black" }} className="navbar-brand" to="/login">Login</NavLink>
              </div>
            }
            <NavLink style={{ color: "black" }} className="navbar-brand" to="/dashboard">Dashboard</NavLink>
            <NavLink style={{ color: "black" }} className="navbar-brand" to="/resources">Resources</NavLink>
            <NavLink style={{ color: "black" }} className="navbar-brand" to="/resources-new">Add Resource</NavLink>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
