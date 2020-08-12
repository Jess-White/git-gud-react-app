import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentUser from './CurrentUser';
// import axios from 'axios';
// import Resource from './Resource';
// import Users from './Users';
// import Resources from './Resources';
// import Reviews from './Reviews';
import Favorites from './Favorites';

// import Login from './Login';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    // let favorites = this.state.favorites;
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <br />
        <CurrentUser history={this.props.history} />
        <br />
        <br />

        <Link to="/resources-new">
          <button type="button">
            Add New Resource
             </button>
        </Link>

        <Favorites />
        {/* <div>
          {this.state.favorites.map(favorite =>
            <Resource key={favorite.resource.id} />
          )}
        </div> */}
      </div>
    );
  }
}

export default Dashboard;

