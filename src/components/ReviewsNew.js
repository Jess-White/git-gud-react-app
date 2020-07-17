import React, { Component } from 'react';
import axios from 'axios';

class ReviewsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      rating: "",
      user_id: localStorage.user_id,
      resource_id: 1
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
      title, body, rating, user_id, resource_id
    } = this.state;

    axios
      .post(
        "http://localhost:3001/api/reviews",
        {
          title: title,
          body: body,
          rating: rating,
          user_id: user_id,
          resource_id: resource_id
        },
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )

      .then(response => {
        if (response.data) {
          this.props.history.push("/reviews")
        }
      })
      .catch(error => {
        console.log("review creation error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="body"
            placeholder="Body"
            value={this.state.body}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={this.state.rating}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Add New Review</button>

        </form>
      </div>
    );
  }
}

export default ReviewsNew;