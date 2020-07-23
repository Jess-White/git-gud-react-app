import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import login from './components/login';
// import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Resources from './components/Resources';
import ResourcesNew from './components/ResourcesNew';
import Reviews from './components/Reviews';
import Review from './components/Review';
import ReviewsNew from './components/ReviewsNew';
import Resource from './components/Resource';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    if (localStorage.token && this.state.loggedInStatus === "NOT_LOGGED_IN") {
      this.setState({
        loggedInStatus: "LOGGED_IN"
      });
    } else if (!localStorage.token && this.state.loggedInStatus === "LOGGED_IN") {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      })
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route
              exact path={"/signup"} component={Signup}
            />
            <Route
              exact path={"/login"} component={Login}
            />
            <Route
              exact path={"/dashboard"}
              render={props => (
                <Dashboard {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact path={"/resources"} component={Resources}
            />
            <Route
              exact path={"/resources/:id"} component={Resource}
            />
            <Route
              exact path={"/resources-new"} component={ResourcesNew}
            />
            <Route
              exact path={"/reviews"} component={Reviews}
            />
            <Route
              exact path={"/reviews/:id"} component={Review}
            />
            <Route
              exact path={"/reviews-new"} component={ReviewsNew}
            />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

// import SignUp from './components/SignUp';
// import Dashboard from './components/Dashboard';
// import Library from './components/Library';
// import ResourceNew from './components/ResourceNew';
// import ReviewNew from './components/ReviewNew';
// import ReviewShow from './components/ReviewShow';
// import ResourceShow from './components/ResourceShow';
// import ResourceEdit from './components/ResourceEdit';
// import ReviewEdit from './components/ReviewEdit';

// import Header from './components/Header';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Users from './components/Users';
// import Reviews from './components/Reviews';
// import Resources from './components/Resources';
// import Footer from './components/Footer';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         <FirstComponent displaytext="First Component Data"/>
//       </div>
// );
//   }
// }
// export default App;

// function App() {
//     return (
//         <BrowserRouter>
//         <div>
//           <Navigation />
//             <Switch>
//               <Route path="/" component={Dashboard} exact/>
//               <Route path="/Dashboard" component={Dashboard}/>

//               <Route component={Error}/>
//            </Switch>
//         </div> 
//       </BrowserRouter>
//     )
// };

