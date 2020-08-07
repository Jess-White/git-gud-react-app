import React, { Component } from 'react';
// import ReviewsNew from './ReviewsNew';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class Review extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      title: '',
      body: '',
      rating: '',
      resource_id: '',
      id: '',
      user_name: '',
      loading: true,
      canEdit: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showEditAbility = this.showEditAbility.bind(this);
    // this.handleUserDelete = this.handleUserDelete.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    axios.get(
      `http://localhost:3001/api/reviews/${this.props.match.params.id}`,
      { headers: { "Authorization": `Bearer ${localStorage.token}` } }
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          body: response.data.body,
          rating: response.data.rating,
          user_id: response.data.user_id,
          resource_id: response.data.resource_id,
          id: response.data.id,
          user_name: response.data.user.user_name,
          loading: false
        });
      })
      .then(response => {
        this.showEditAbility()
      })
      .catch(error => {
        console.log(error);
      })
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  showEditAbility() {
    if (this.state.user_id == localStorage.user_id) {
      this.setState({
        canEdit: !this.state.canEdit
      })
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const { title, body, rating } = this.state;
    axios
      .patch(
        'http://localhost:3001/api/reviews/' + this.state.id,
        {
          title: title,
          body: body,
          rating: rating
        },
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        this.toggleHidden();
      })
      .catch(error => {
        console.log('review update error', error);
      });
    event.preventDefault();
  }

  handleReviewDelete() {
    axios
      .delete(
        'http://localhost:3001/api/reviews/' + this.state.id,
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        console.log(response);
        if (response.data.message) {
          this.props.history.push('/reviews');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <h1>Loading....</h1>
      )
    }
    return (
      <div className="container">
        <h3>Title: {this.state.title}</h3>
        <h3>Body: {this.state.body}</h3>
        <h3>Rating: {this.state.rating}</h3>
        <h3>User: {this.state.user_id}</h3>
        <h3>Resource ID: {this.state.resource_id}</h3>
        <h3>Review ID: {this.state.id}</h3>
        <h3>Author: {this.state.user_name}</h3>

        {this.state.canEdit ? (
          <div>
            <button onClick={this.toggleHidden.bind(this)}>
              Update Review
          </button>
            <br />
            <br />
            {/* {!this.state.isHidden && <UserUpdate />} */}
            {this.state.isHidden ? (
              <div>
                <h1>Review Update</h1>
                <form onSubmit={this.handleSubmit}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={this.state.title}
                    name="title"
                    placeholder={this.state.title}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label>Body</label>
                  <input
                    type="text"
                    value={this.state.body}
                    name="body"
                    placeholder={this.state.body}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label>Rating</label>
                  <input
                    type="text"
                    value={this.state.rating}
                    name="rating"
                    placeholder={this.state.rating}
                    onChange={this.handleChange}
                  />
                  <br />
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
                <br />
                <button
                  onClick={() => this.handleReviewDelete()}
                  className="btn btn-danger">
                  Delete Review
              </button>

              </div>
            ) : (
                null
              )}
          </div>
        ) : (
            null
          )}
      </div>
    )
  }
}

export default Review;