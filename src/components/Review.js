import React, { Component } from 'react';
// import ReviewsNew from './ReviewsNew';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class Review extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      loading: true,
      review: null
    }
  }
  componentDidMount() {
    console.log("test");
    axios.get(
      `http://localhost:3001/api/reviews/${this.props.match.params.id}`,
      { headers: { "Authorization": `Bearer ${localStorage.token}` } }
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          review: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    if (this.state.loading) {
      return (
        <h1>Loading....</h1>
      )
    }
    return (
      <div className="container">
        <h3>Title: {this.state.review.title}</h3>
        <h3>Body: {this.state.review.body}</h3>
        <h3>Rating: {this.state.review.rating}</h3>
        <h3>User: {this.state.review.user_id}</h3>
        <h3>Review: {this.state.review.resource_id}</h3>

        {/* <Link to={{
          pathname: "/reviews-new",
          state: {
            pass: "some data"
          }
        }}>
          <button type="button">
            Add New Review
             </button>
        </Link> */}
        {/* <ReviewsNew
          resource_id={this.state.resource.id}
          history={this.props.history} /> */}
      </div>
    )
  }
}

export default Review;