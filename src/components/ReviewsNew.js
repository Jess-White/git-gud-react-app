import React, { Component } from 'react';
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

	componentDidMount() {
		console.log(this.state);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		const { title, body, rating, user_id, resource_id } = this.state;

		axios
			.post(
				'http://localhost:3001/api/reviews',
				{
					title: title,
					body: body,
					rating: rating,
					user_id: user_id,
					resource_id: resource_id,
				},
				{ headers: { Authorization: `Bearer ${localStorage.token}` } }
			)
			.then((response) => {
				if (response.data) {
					this.props.history.push('/reviews');
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
							>
								<option value="" disabled selected>
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

export default ReviewsNew;
