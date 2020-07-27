import React, { Component } from 'react';
import axios from 'axios';

class ReviewUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      body: this.props.body,
      rating: this.props.rating,
      review_id: this.props.id,
      isHidden: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleUserDelete = this.handleUserDelete.bind(this);
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3001/api/reviews/' + localStorage.user_id,
  //     { headers: { "Authorization": `Bearer ${localStorage.token}` } })
  //     .then(response => {
  //       this.setState({
  //         first_name: response.data.first_name,
  //         last_name: response.data.last_name,
  //         email: response.data.email
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  // }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
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
        'http://localhost:3001/api/reviews/' + this.state.review_id,
        {
          title: title,
          body: body,
          rating: rating
        },
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => console.log(response))
      .catch(error => {
        console.log('review update error', error);
      });
    event.preventDefault();
  }

  // handleUserDelete() {
  //   axios
  //     .delete(
  //       'http://localhost:3001/api/users/' + localStorage.user_id,
  //       { headers: { "Authorization": `Bearer ${localStorage.token}` } }
  //     )
  //     .then(response => {
  //       console.log(response);
  //       if (response.data.message) {
  //         this.props.history.push('/signup');
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('user_id');
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
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
                <label>Review ID</label>
                <input
                  type="text"
                  value={this.state.review_id}
                  name="review_id"
                  placeholder={this.state.review_id}
                  onChange={this.handleChange}
                />
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
              <br />
              <button
                onClick={() => this.handleUserDelete()}
                className="btn btn-danger">
                Delete Account
              </button>

            </div>
          ) : (
              null
            )}
        </div>
      </div>
    )
  }
}

export default ReviewUpdate;