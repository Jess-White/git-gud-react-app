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
    // this.state = {
    //   favorites: []
    // }

    // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3001/api/favorites', { headers: { "Authorization": `Bearer ${localStorage.token}` } })
  //     .then(response => {
  //       console.log(response)
  //       this.setState({ favorites: response.data })
  //     })
  //     .catch(error => console.log(error))
  // }

  handleLogoutClick() {
    this.props.history.push('/login');
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }

  render() {
    // let favorites = this.state.favorites;
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

