import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Reviews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/reviews', { headers: { "Authorization": `Bearer ${localStorage.token}` } })
      .then(response => {
        console.log(response)
        this.setState({ reviews: response.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="container">
        <h1>Reviews:</h1>
        {this.state.reviews.map((review) => {
          return (
            <div className="tile" key={review.id} >
              <h4>{review.title}</h4>
              <p>{review.body}</p>
              <NavLink style={{ color: "green" }} className="navbar-brand" to={`/reviews/${review.id}`}>Show Review</NavLink>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Reviews;
