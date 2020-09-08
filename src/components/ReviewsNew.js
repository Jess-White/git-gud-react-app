import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ReviewsNew extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			body: '',
			rating: '',
			user_id: localStorage.user_id,
			resource_id: this.props.resource_id,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	clearForm = () => {
		this.setState({
			title: '',
			body: '',
			rating: '',
		});
	};

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		const newReview = this.state;

		axios
			.post('http://localhost:3001/api/reviews', newReview, {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			})
			.then((response) => {
				if (response.data) {
					this.props.updateReviews(response.data);
					this.clearForm();
				}
			})
			.catch((error) => {
				console.log('review creation error', error);
			});
		event.preventDefault();
	}

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>Title</label>
							<input
								type="text"
								name="title"
								value={this.state.title}
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label>Tell Us What You Think</label>
							<textarea
								name="body"
								value={this.state.body}
								onChange={this.handleChange}
								rows="4"
								cols="50"
								required
							></textarea>
						</div>
						<div className="form-group">
							<label>How Would You Rate This Resource?</label>
							<select
								name="rating"
								value={this.state.rating}
								onChange={this.handleChange}
								required
							>
								<option value="" disabled>
									Between 1 and 5 Stars
								</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
						<div className="text-center">
							<button type="submit" className="btn-md">
								Add New Review
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(ReviewsNew);
