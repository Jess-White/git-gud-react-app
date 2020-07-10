import React, { Component } from 'react';
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
    localStorage.removeItem("token");
  }

  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        {/* <Resources />
        <Reviews />
        <Favorites /> */}
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>
          Log Out</button>
      </div>
    );
  }
}

export default Dashboard;




// import React, { Component } from 'react';
// // import Resources from './Resources';
// // import Reviews from './Reviews';
// import Favorites from './Favorites';

// export default class Dashboard extends Component {
//   state = {}
//   render() {
//     return (
//       <div>
//         <h1>Dashboard</h1>
//         {/* <Resources /> */}
//         {/* <Reviews /> */}
//         <Favorites />
//         <h1>Status: {this.props.loggedInStatus}</h1>
//         {/* <button onClick={() => this.handleLogoutClick()}>
//           Log Out</button> */}
//       </div>
//     );
//   }
// }
//   // constructor(props) {
//   //   super(props);

//     // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
//     // this.handleLogoutClick = this.handleLogoutClick.bind(this);




//   // handleLogoutClick() {
//   //   this.props.handleLogout();
//   //   localStorage.removeItem("token");
//   // }