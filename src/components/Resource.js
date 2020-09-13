import React, { Component } from 'react';
import ReviewsNew from './ReviewsNew';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Resource extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			user_id: '',
			id: '',
			url: '',
			name: '',
			author: '',
			description: '',
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
		this.createStars = this.createStars.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		axios
			.get(`/api/resources/${this.props.match.params.id}`, {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			})
			.then((response) => {
				this.setState({
					user_id: response.data.user_id,
					id: response.data.id,
					url: response.data.url,
					name: response.data.name,
					author: response.data.author,
					description: response.data.description,
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

	updateReviews = (newReview) => {
		const reviews = this.state.reviews;
		reviews.push(newReview);
		this.setState({
			reviews: reviews,
		});
	};

	toggleHidden() {
		this.setState({
			isHidden: !this.state.isHidden,
		});
	}

	showEditAbility() {
		if (this.state.user_id === parseInt(localStorage.user_id)) {
			this.setState({
				canEdit: !this.state.canEdit,
			});
		}
	}

	createFavorite() {
		axios
			.post(
				'/api/favorites',
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
			})
			.catch((error) => {
				console.log('favorite create error', error);
			});
	}

	handleFavoriteDelete() {
		axios
			.delete(
				'/api/favorites/' +
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
		const {
			name,
			url,
			author,
			description,
			resource_type,
			format,
			difficulty,
			cost,
		} = this.state;
		axios
			.patch(
				'/api/resources/' + this.state.id,
				{
					name: name,
					url: url,
					author: author,
					description: description,
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

	createStars(num) {
		let star = '\u2605';
		let blankStar = '\u2606';
		return star.repeat(parseInt(num)) + blankStar.repeat(5 - parseInt(num));
	}

	render() {
		if (this.state.loading) {
			return <h1>Loading....</h1>;
		}
		return (
			<div className="container">
				<a
					href={this.state.url}
					target="_blank"
					className="inapp-link"
					rel="noopener noreferrer"
					style={{ fontSize: 30 }}
				>
					{this.state.name}
				</a>
				<br />
				<br />
				<ul style={{ fontSize: 25 }}>
					{this.state.author ? <li>Author: {this.state.author}</li> : null}
					<li>Type: {this.state.resource_type}</li>
					<li>Format: {this.state.format}</li>
					<li>Difficulty: {this.state.difficulty}</li>
					<li>
						Cost:{' '}
						{this.state.cost === 0
							? 'Free'
							: '$'.repeat(parseInt(this.state.cost))}
					</li>
					<li>Description: {this.state.description}</li>
				</ul>
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

				{/* Create review starts here */}

				<h1>Add Your Own Review</h1>
				<div>
					<ReviewsNew
						resource_id={this.state.id}
						history={this.props.history}
						updateReviews={this.updateReviews}
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
									<Link className="inapp-link" to={`/reviews/${review.id}`}>
										{review.title}
									</Link>
									{/* <h3>{review.rating}</h3> */}
									{/* <h3>&#9733;&#9734;</h3> */}
									<h3>{this.createStars(review.rating)}</h3>
									{review.body.length > 100 ? (
										<h3>{review.body.slice(0, 100)} ...</h3>
									) : (
										<h3>{review.body}</h3>
									)}
									<h3>By: {review.user.user_name}</h3>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										style={{ display: 'none' }}
									>
										<symbol id="star" viewBox="214.7 0 182.6 792">
											{/* link or path to star svg */}
										</symbol>
										<svg className="icon">
											<use xlinkHref="#star" />
										</svg>
									</svg>
								</div>
							</div>
						);
					})}
				</div>
				<br />

				{/* beginning of resource update if user created resource */}

				{this.state.canEdit ? (
					<div className="container">
						<button onClick={this.toggleHidden.bind(this)}>
							Update Resource
						</button>
						<br />
						<br />
						{this.state.isHidden ? (
							<div className="card">
								<div className="card-body">
									<form onSubmit={this.handleSubmit}>
										<div className="form-group">
											<label>Resource Name</label>
											<input
												type="text"
												value={this.state.name}
												name="name"
												placeholder={this.state.name}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label>URL</label>
											<input
												type="text"
												value={this.state.url}
												name="url"
												placeholder={this.state.url}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label>Author</label>
											<input
												type="text"
												value={this.state.author}
												name="author"
												placeholder={this.state.author}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label>Resource Type</label>
											<select
												name="resource_type"
												value={this.state.resource_type}
												onChange={this.handleChange}
											>
												<option value="" disabled>
													Select a Resource Type
												</option>
												<option value="channel">Channel</option>
												<option value="cheat_sheet">Cheat Sheet</option>
												<option value="deep_dive">Deep Dive</option>
												<option value="tutorial">Tutorial</option>
											</select>
										</div>
										<div className="form-group">
											<label>Format:</label>
											<select
												name="format"
												value={this.state.format}
												onChange={this.handleChange}
											>
												<option value="" disabled>
													Select a Format
												</option>
												<option value="text">Text</option>
												<option value="video">Video</option>
											</select>
										</div>
										<div className="form-group">
											<label>Difficulty:</label>
											<select
												name="difficulty"
												value={this.state.difficulty}
												onChange={this.handleChange}
											>
												<option value="" disabled>
													Select a Level of Difficulty
												</option>
												<option value="basic">Basic</option>
												<option value="beginner">Beginner</option>
												<option value="intermediate">Intermediate</option>
												<option value="advanced">Advanced</option>
											</select>
										</div>
										<div className="form-group">
											<label>Cost:</label>
											<select
												name="cost"
												value={this.state.cost}
												onChange={this.handleChange}
											>
												<option value="" disabled>
													Select a Cost $
												</option>
												<option value="0">Free</option>
												<option value="1">$</option>
												<option value="2">$$</option>
												<option value="3">$$$</option>
												<option value="4">$$$$</option>
											</select>
										</div>
										<div className="form-group">
											<label>Description</label>
											<textarea
												name="description"
												value={this.state.description}
												onChange={this.handleChange}
												rows="4"
												cols="50"
												required
											></textarea>
										</div>
										<div className="text-center">
											<button type="submit" className="btn-lg">
												Submit Update
											</button>
											<button
												onClick={this.toggleHidden.bind(this)}
												className="btn-lg"
											>
												Close
											</button>
										</div>
									</form>
									<br />
								</div>
							</div>
						) : null}
					</div>
				) : null}
			</div>
		);
	}
}

export default Resource;
