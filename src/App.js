import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/dashboard"} component={Dashboard} />
          </Switch>
        </BrowserRouter>
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

