import React, { Component } from 'react';
import axios from 'axios';

class ResourcesNew extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			url: '',
			author: '',
			description: '',
			resource_type: '',
			format: '',
			difficulty: '',
			cost: '',
			user_id: localStorage.user_id,
			tag_list: '',
			tags: [],
			errors: [],
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		axios
			.get('/api/tags', {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			})
			.then((response) => {
				console.log(response);
				this.setState({ tags: response.data });
			})
			.catch((error) => console.log(error));
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSelect = (event) => {
		let tag_list = this.state.tag_list;
		tag_list += ` ${event.target.value},`;
		this.setState({
			tag_list: tag_list,
		});
	};

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
			user_id,
			tag_list,
		} = this.state;

		axios
			.post(
				'/api/resources',
				{
					name: name,
					url: url,
					author: author,
					description: description,
					resource_type: resource_type,
					format: format,
					difficulty: difficulty,
					cost: cost,
					user_id: user_id,
					tag_list: tag_list,
				},
				{ headers: { Authorization: `Bearer ${localStorage.token}` } }
			)

			.then((response) => {
				if (response.data) {
					this.props.history.push('/resources');
				}
			})
			.catch((error) => {
				console.log('resource creation error', error);
			});
		event.preventDefault();
	}

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>Resource Name</label>
							<input
								type="text"
								name="name"
								value={this.state.name}
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label>URL or Web Address</label>
							<input
								type="text"
								name="url"
								value={this.state.url}
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label>Author</label>
							<input
								type="text"
								name="author"
								value={this.state.author}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Resource Type</label>
							<select
								name="resource_type"
								value={this.state.resource_type}
								onChange={this.handleChange}
								required
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
								required
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
								required
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
								required
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
						<div className="form-group">
							<label>Add Your Own Tags:</label>
							<input
								type="text"
								name="tag_list"
								placeholder="Javascript, CSS, ...."
								value={this.state.tag_list}
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label>Existing Tags To Choose From:</label>
							<select name="tag_list" onChange={this.handleSelect}>
								<option value="" disabled>
									Select Multiple 1 or More Tags
								</option>
								{this.state.tags.map((tag) => {
									return (
										<option
											key={tag.id}
											value={tag.name}
											onChange={this.handleChange}
										>
											{tag.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="text-center">
							<button type="submit" className="btn-lg">
								Add Your Resource
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default ResourcesNew;
