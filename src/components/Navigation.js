import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navigation extends Component {
	state = {};
	constructor(props) {
		super(props);

		this.handleLogoutClick = this.handleLogoutClick.bind(this);
	}

	handleLogoutClick() {
		localStorage.removeItem('token');
		localStorage.removeItem('user_id');
		this.props.history.push('/login');
	}

	render() {
		return (
			<div>
				<nav
					className="navbar fixed-top navbar-expand-lg navbar-light"
					style={{ backgroundColor: '#00E000' }}
				>
					<div className="navbar-nav">
						{localStorage.token && localStorage.user_id ? (
							<ul className="nav">
								<li className="nav-item">
									<Link
										style={{ color: 'black' }}
										className="navbar-brand"
										to="/dashboard"
									>
										Dashboard
									</Link>
								</li>
								<li className="nav-item">
									<Link
										style={{ color: 'black' }}
										className="navbar-brand"
										to="/resources"
									>
										Resources
									</Link>
								</li>
								<li className="nav-item">
									<Link
										style={{ color: 'black' }}
										className="navbar-brand"
										to="/resources-new"
									>
										Add Resource
									</Link>
								</li>
								<li className="nav-item">
									<button
										className="logout-btn navbar-brand"
										onClick={this.handleLogoutClick}
									>
										Logout
									</button>
								</li>
							</ul>
						) : (
							<ul className="nav">
								<li className="nav-item">
									<Link
										style={{ color: 'black' }}
										className="navbar-brand"
										to="/signup"
									>
										Signup
									</Link>
								</li>
								<li className="nav-item">
									<Link
										style={{ color: 'black' }}
										className="navbar-brand"
										to="/login"
									>
										Login
									</Link>
								</li>
							</ul>
						)}
					</div>
				</nav>
			</div>
		);
	}
}

export default withRouter(Navigation);
