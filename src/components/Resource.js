import React, { Component } from 'react';
import axios from 'axios';

class Resource extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      loading: true,
      resource: null
    }
  }
  componentDidMount() {
    console.log("test");
    axios.get(`http://localhost:3001/api/resources/${this.props.match.params.id}`)
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
      <div>
        <h1>Can you see this?</h1>
        <h1>{this.state.resource.name}</h1>
      </div>
    )
  }
}

export default Resource;