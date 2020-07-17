import React, { Component } from 'react';
import CurrentUser from './CurrentUser';
// import Users from './Users';
// import Resources from './Resources';
// import Reviews from './Reviews';
// import Favorites from './Favorites';
// import Login from './Login';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.history.push('/login');
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }

  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <br />
        <CurrentUser history={this.props.history} />
        <br />
        <h1>Status: {this.props.loggedInStatus}</h1>
        <br />
        <button onClick={() => this.handleLogoutClick()}>
          Log Out</button>
        <br />
        <br />
      </div>
    );
  }
}

export default Dashboard;
