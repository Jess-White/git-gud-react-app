import React, { Component } from 'react';
import axios from 'axios';

class ResourcesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      url: "",
      resource_type: "",
      format: "",
      difficulty: "",
      cost: "",
      user_id: localStorage.user_id
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { 
      name, url, resource_type, format, difficulty, cost, user_id
    } = this.state;

    axios
      .post(
        "http://localhost:3001/api/resources",
        {
          name: name,
          url: url,
          resource_type: resource_type,
          format: format,
          difficulty: difficulty,
          cost: cost,
          user_id: user_id
        },
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )

      .then(response => {
        if (response.data) {
          this.props.history.push("/resources")
        }
      })
      .catch(error => {
        console.log("resource creation error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="url"
            placeholder="Url"
            value={this.state.url}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="resource_type"
            placeholder="Resource Type"
            value={this.state.resource_type}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="format"
            placeholder="Format"
            value={this.state.format}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="difficulty"
            placeholder="Difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="cost"
            placeholder="Cost"
            value={this.state.cost}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Add New Resource</button>

        </form>
      </div>
    );
  }
}





export default ResourcesNew;