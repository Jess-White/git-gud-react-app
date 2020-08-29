import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Favorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: [],
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/api/favorites', {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			})
			.then((response) => {
				console.log(response);
				this.setState({ favorites: response.data });
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<div>
				<br />
				<h1>Your Favorites:</h1>
				{this.state.favorites.map((favorite) => {
					return (
						<div className="card bg-light mb-3" key={favorite.id}>
							<div className="card-header" style={{ backgroundColor: 'black' }}>
								<Link
									className="inapp-link"
									to={'/resources/' + favorite.resource.id}
								>
									{favorite.resource.name}
								</Link>
							</div>
							<div className="card-body" style={{ backgroundColor: '#009B00' }}>
								{favorite.resource.author ? (
									<h4 style={{ color: 'black' }}>
										By: {favorite.resource.author}
									</h4>
								) : null}
								<a href={favorite.resource.url}>{favorite.resource.url}</a>
								<br />
								{/* <div>
									Tags:{' '}
									{favorite.resource.tags.map((tag, index) => {
										return <span key={index}>{tag}, </span>;
									})}
								</div> */}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Favorites;

/* <div className="card" key={favorite.id}>
	<Link to={'/resources/' + favorite.resource.id}>
		<h4>{favorite.resource.name}</h4>
	</Link>
</div> */
