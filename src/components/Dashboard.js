import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentUser from './CurrentUser';
import Favorites from './Favorites';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="container">
				<CurrentUser history={this.props.history} />
				<br />
				<Link to="/resources-new">
					<button className="btn-lg">Add New Learning Resource</button>
				</Link>
				<Favorites />
			</div>
		);
	}
}

export default Dashboard;
