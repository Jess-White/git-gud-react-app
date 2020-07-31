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
      user_id: localStorage.user_id,
      tag_list: "",
      tags: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/tags', { headers: { "Authorization": `Bearer ${localStorage.token}` } })
      .then(response => {
        console.log(response)
        this.setState({ tags: response.data })
      })
      .catch(error => console.log(error))
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSelect = (event) => {
    let tag_list = this.state.tag_list
    tag_list += ` ${event.target.value},`
    this.setState({
      tag_list: tag_list
    })

  }

  handleSubmit(event) {
    const {
      name, url, resource_type, format, difficulty, cost, user_id, tag_list
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
          user_id: user_id,
          tag_list: tag_list
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
            placeholder="Resource Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <br />

          <input
            type="text"
            name="url"
            placeholder="Url"
            value={this.state.url}
            onChange={this.handleChange}
            required
          />
          <br />

          <input
            type="text"
            name="resource_type"
            placeholder="Resource Type"
            value={this.state.resource_type}
            onChange={this.handleChange}
            required
          />
          <br />

          <input
            type="text"
            name="format"
            placeholder="Format"
            value={this.state.format}
            onChange={this.handleChange}
            required
          />
          <br />

          <input
            type="text"
            name="difficulty"
            placeholder="Difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
            required
          />
          <br />

          <input
            type="text"
            name="cost"
            placeholder="Cost"
            value={this.state.cost}
            onChange={this.handleChange}
            required
          />
          <br />

          <label>Tags:</label>
          <input
            type="text"
            name="tag_list"
            placeholder="Javascript, CSS, ...."
            value={this.state.tag_list}
            onChange={this.handleChange}
            required
          />
          <br />

          <label>Tags:</label>
          <select name="tag_list" onChange={this.handleSelect}>
            {this.state.tags.map((tag) => {
              return (
                <option
                  key={tag.id}
                  value={tag.name}
                  onChange={this.handleChange}
                >
                  {tag.name}
                </option>
              )
            })}
          </select>

          <button type="submit">Add New Resource</button>

        </form>
      </div>
    );
  }
}





export default ResourcesNew;