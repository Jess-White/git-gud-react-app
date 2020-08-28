import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			loggedInStatus: 'NOT_LOGGED_IN',
			user: {},
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	checkLoginStatus() {
		if (localStorage.token && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
			this.setState({
				loggedInStatus: 'LOGGED_IN',
			});
		} else if (
			!localStorage.token &&
			this.state.loggedInStatus === 'LOGGED_IN'
		) {
			this.setState({
				loggedInStatus: 'NOT_LOGGED_IN',
				user: {},
			});
		}
	}

	componentDidMount() {
		this.checkLoginStatus();
	}

	handleLogout() {
		this.setState({
			loggedInStatus: 'NOT_LOGGED_IN',
			user: {},
		});
	}

	handleLogin(data) {
		this.setState({
			loggedInStatus: 'LOGGED_IN',
			user: data.user,
		});
	}

	render() {
		return (
			<div className="app">
				<BrowserRouter>
					<Navigation loggedInStatus={this.state.loggedInStatus} />
					<Header />
					<Switch>
						<Route exact path="/">
							<Redirect to="/signup" />
						</Route>
						<Route exact path={'/signup'} component={Signup} />
						<Route exact path={'/login'} component={Login} />
						<Route
							exact
							path={'/dashboard'}
							render={(props) => (
								<Dashboard
									{...props}
									loggedInStatus={this.state.loggedInStatus}
								/>
							)}
						/>
						<Route exact path={'/resources'} component={Resources} />
						<Route exact path={'/resources/:id'} component={Resource} />
						<Route exact path={'/resources-new'} component={ResourcesNew} />
						<Route exact path={'/reviews'} component={Reviews} />
						<Route exact path={'/reviews/:id'} component={Review} />
						<Route exact path={'/reviews-new'} component={ReviewsNew} />
						{/* <Route
              exact path={"/logout"} component={Logout}
            /> */}
					</Switch>
				</BrowserRouter>
				<Footer />
			</div>
		);
	}
}
