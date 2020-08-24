import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Search from './Search';

class Resources extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resources: [],
			// tags: [],
			query: '',
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:3001/api/resources', {
				headers: { Authorization: `Bearer ${localStorage.token}` },
			})
			.then((response) => {
				console.log(response);
				this.setState({ resources: response.data });
			})
			.catch((error) => console.log(error));

		// axios.get('http://localhost:3001/api/tags/')
		//   .then(response => {
		//     this.setState({ tags: response.data });
		//     // console.log(this.state.tags);
		//   })
		//   .catch(function (error) {
		//     console.log(error);
		//   })
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	// filterQuery() {
	//   const tagQuery = this.query.includes(this.tags);

	//   return lowerCaseStateName.includes(lowerCaseQuery)
	//     || lowerCaseStateAbbreviation.includes(lowerCaseQuery)

	// }

	render() {
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
								{resource.author ? <h4>By: {resource.author}</h4> : null}
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
