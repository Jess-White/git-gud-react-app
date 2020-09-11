import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Search from './Search';

class Resources extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			resources: [],
			query: '',
		};
	}
	componentDidMount() {
		console.log(process.env.NODE_ENV);
		console.log(axios.defaults.baseURL);
		window.scrollTo(0, 0);
		axios
			.get('/api/resources', {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			})
			.then((response) => {
				this.setState({
					resources: response.data,
					loading: false,
				});
			})
			.catch((error) => console.log(error));
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		if (this.state.loading) {
			return <h1>Loading....</h1>;
		}
		const filteredResources = this.state.resources.filter((resource) => {
			return this.state.query
				? resource.tags.some((tag) =>
						tag.toLowerCase().includes(this.state.query.toLowerCase())
				  )
				: true;
		});

		return (
			<div className="container">
				<Search query={this.query} handleChange={this.handleChange} />
				<br />
				{filteredResources.map((resource) => {
					return (
						<div className="card bg-light mb-3" key={resource.id}>
							<div className="card-header" style={{ backgroundColor: 'black' }}>
								<NavLink
									className="inapp-link"
									to={`/resources/${resource.id}`}
								>
									{resource.name}
								</NavLink>
							</div>
							<div className="card-body" style={{ backgroundColor: '#009B00' }}>
								{resource.author ? (
									<h4 style={{ color: 'black' }}>By: {resource.author}</h4>
								) : null}
								<a href={resource.url}>{resource.url}</a>
								<br />
								<div>
									Tags:{' '}
									{resource.tags.map((tag, index) => {
										return <span key={index}>{tag}, </span>;
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Resources;
