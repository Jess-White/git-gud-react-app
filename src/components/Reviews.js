import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Reviews extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
		};
	}
	componentDidMount() {
		axios
			.get('/api/reviews', {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			})
			.then((response) => {
				console.log(response);
				this.setState({ reviews: response.data });
			})
			.catch((error) => console.log(error));
	}
	render() {
		return (
			<div className="container">
				<h1>Reviews:</h1>
				{this.state.reviews.map((review) => {
					return (
						<div className="tile" key={review.id}>
							<NavLink
								style={{ color: 'green' }}
								className="navbar-brand"
								to={`/reviews/${review.id}`}
							>
								{review.title}
							</NavLink>
							<p style={{ color: 'green' }}>{review.body}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Reviews;
