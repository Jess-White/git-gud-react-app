import React, { Component } from 'react';
import ReviewsNew from './ReviewsNew';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class Resource extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      loading: true,
      resource: null,
      currentResourceId: ""
    }
  }
  componentDidMount() {
    console.log("test");
    axios.get(
      `http://localhost:3001/api/resources/${this.props.match.params.id}`,
      { headers: { "Authorization": `Bearer ${localStorage.token}` } }
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          resource: response.data,
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
        <a href={this.state.resource.url}>{this.state.resource.name}</a>
        <h3>Type: {this.state.resource.resource_type}</h3>
        <h3>Format: {this.state.resource.format}</h3>
        <h3>Difficulty: {this.state.resource.difficulty}</h3>
        <h3>Cost: {this.state.resource.cost}</h3>
        <h3>Id: {this.state.resource.id}</h3>
        <br />

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

        <ReviewsNew
          resource_id={this.state.resource.id}
          history={this.props.history} />
      </div>
    )
  }
}

export default Resource;