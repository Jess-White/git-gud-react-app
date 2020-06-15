import React, { Component } from 'react';
import axios from 'axios';

class Reviews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/api/reviews')
    .then(response => {
      console.log(response)
      this.setState({reviews: response.data})
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        {this.state.reviews.map((review) => {
          return(
            <div className="tile" key={review.id} >
              <h4>{review.title}</h4>
              <p>{review.body}</p>
            </div>
          )       
        })}
      </div>
    )
  }
}

export default Reviews;
