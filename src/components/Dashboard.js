import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurrentUser from './CurrentUser';
import Favorites from './Favorites';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		// let favorites = this.state.favorites;
		return (
			<div className="container">
				<CurrentUser history={this.props.history} />
				<br />
				<Link to="/resources-new">
					<button className="btn-lg">Add New Learning Resource</button>
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
