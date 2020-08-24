import React, { Component } from 'react';
import ReviewsNew from './ReviewsNew';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Resource extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			loading: true,
			user_id: '',
			id: '',
			url: '',
			name: '',
			resource_type: '',
			format: '',
			difficulty: '',
			cost: '',
			currentResourceId: '',
			favorite: '',
			canEdit: false,
			reviews: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showEditAbility = this.showEditAbility.bind(this);
	}
	componentDidMount() {
		axios
			.get(
				`http://localhost:3001/api/resources/${this.props.match.params.id}`,
				{ headers: { Authorization: `Bearer ${localStorage.token}` } }
			)
			.then((response) => {
				console.log(response.data);
				this.setState({
					user_id: response.data.user_id,
					id: response.data.id,
					url: response.data.url,
					name: response.data.name,
					resource_type: response.data.resource_type,
					format: response.data.format,
					difficulty: response.data.difficulty,
					cost: response.data.cost,
					reviews: response.data.reviews,
					favorite: response.data.favorite,
					loading: false,
				});
			})
			.then((response) => {
				this.showEditAbility();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	toggleHidden() {
		this.setState({
			isHidden: !this.state.isHidden,
		});
	}

	showEditAbility() {
		if (this.state.user_id == localStorage.user_id) {
			this.setState({
				canEdit: !this.state.canEdit,
			});
		}
	}

	createFavorite() {
		axios
			.post(
				'http://localhost:3001/api/favorites',
				{
					user_id: localStorage.user_id,
					resource_id: this.state.id,
				},
				{ headers: { Authorization: `Bearer ${localStorage.token}` } }
			)
			.then((response) => {
				this.setState({
					favorite: true,
				});
				console.log(response);
			})
			.catch((error) => {
				console.log('favorite create error', error);
			});
	}

	handleFavoriteDelete() {
		axios
			.delete(
				'http://localhost:3001/api/favorites/' +
					'user_id=' +
					localStorage.user_id +
					'&resource_id=' +
					this.state.id,
				{ headers: { Authorization: `Bearer ${localStorage.token}` } }
			)
			.then((response) => {
				this.setState({
					favorite: false,
				});
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		const { url, name, resource_type, format, difficulty, cost } = this.state;
		axios
			.patch(
				'http://localhost:3001/api/resources/' + this.state.id,
				{
					url: url,
					name: name,
					resource_type: resource_type,
					format: format,
					difficulty: difficulty,
					cost: cost,
				},
				{ headers: { Authorization: `Bearer ${localStorage.token}` } }
			)
			.then((response) => {
				this.toggleHidden();
			})
			.catch((error) => {
				console.log('resource update error', error);
			});
		event.preventDefault();
	}

	render() {
		if (this.state.loading) {
			return <h1>Loading....</h1>;
		}
		return (
			<div className="container">
				<a href={this.state.url} target="_blank" className="inapp-link">
					{this.state.name}
				</a>
				<h3>Type: {this.state.resource_type}</h3>
				<h3>Format: {this.state.format}</h3>
				<h3>Difficulty: {this.state.difficulty}</h3>
				<h3>Cost: {this.state.cost}</h3>
				<br />

				{this.state.favorite === false ? (
					<button onClick={this.createFavorite.bind(this)}>
						Add to Your Favorites
					</button>
				) : (
					<button onClick={this.handleFavoriteDelete.bind(this)}>
						Remove from Favorites
					</button>
				)}
				<br />
				<br />

				<h1>Add Your Review:</h1>
				<div>
					<ReviewsNew
						resource_id={this.state.id}
						history={this.props.history}
					/>
				</div>
				<br />
				<br />

				<div>
					<h1>Reviews:</h1>
					{this.state.reviews.map((review) => {
						return (
							<div className="card bg-light mb-3" key={review.id}>
								<div
									className="card-header"
									style={{ backgroundColor: 'black' }}
								>
									<NavLink className="inapp-link" to={`/reviews/${review.id}`}>
										{review.title}
									</NavLink>
								</div>
								<div
									className="card-body"
									style={{ backgroundColor: '#00e000' }}
								>
									{review.body.length > 100 ? (
										<h3>{review.body.slice(0, 100)} ...</h3>
									) : (
										<h3>{review.body}</h3>
									)}
									<h3>By: {review.user.user_name}</h3>
									<br />
								</div>
							</div>
						);
					})}
				</div>
				<br />

				{/* beginning of resource update */}

				{this.state.canEdit ? (
					<div>
						<button onClick={this.toggleHidden.bind(this)}>
							Update Resource
						</button>
						<br />
						<br />
						{this.state.isHidden ? (
							<div>
								<h1>Resource Update</h1>
								<form onSubmit={this.handleSubmit}>
									<label>URL</label>
									<input
										type="text"
										value={this.state.url}
										name="url"
										placeholder={this.state.url}
										onChange={this.handleChange}
									/>
									<br />
									<label>Name</label>
									<input
										type="text"
										value={this.state.name}
										name="name"
										placeholder={this.state.name}
										onChange={this.handleChange}
									/>
									<br />

									<label>
										Resource Type:
										<select
											name="resource_type"
											value={this.state.resource_type}
											onChange={this.handleChange}
										>
											<option value="cheat_sheet">Cheat Sheet</option>
											<option value="tutorial">Tutorial</option>
											<option value="deep_dive">Deep Dive</option>
											<option value="channel">Channel</option>
										</select>
									</label>
									<br />

									<label>
										Format:
										<select
											name="format"
											value={this.state.format}
											onChange={this.handleChange}
										>
											<option value="text">Text</option>
											<option value="video">Video</option>
										</select>
									</label>
									<br />

									<label>
										Difficulty:
										<select
											name="difficulty"
											value={this.state.difficulty}
											onChange={this.handleChange}
										>
											<option value="basic">Basic</option>
											<option value="beginner">Beginner</option>
											<option value="intermediate">Intermediate</option>
											<option value="advanced">Advanced</option>
										</select>
									</label>
									<br />

									<label>
										Cost:
										<select
											name="cost"
											value={this.state.cost}
											onChange={this.handleChange}
										>
											<option value="0">Free</option>
											<option value="1">$</option>
											<option value="2">$$</option>
											<option value="3">$$$</option>
											<option value="4">$$$$</option>
										</select>
									</label>
									<br />
									<br />
									<div>
										<button type="submit">Submit</button>
									</div>
								</form>
								<br />
							</div>
						) : null}
					</div>
				) : null}
			</div>
		);
	}
}

export default Resource;
