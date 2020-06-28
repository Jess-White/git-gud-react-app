import React, { Component } from 'react';
import axios from 'axios';

class Resource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resource: {}
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/resource/')
    .then(response => {
      console.log(response)
      this.setState({resource: response.data})
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        <h1>{resource.name}</h1>
        {this.state.resource((resource) => {
          return(
            <div className="tile" key={resource.id} >
              <p>{resource.url}</p>
              <p>{resource.resource_type}</p>
              <p>{resource.format}</p>
              <p>{resource.difficulty}</p>
              <p>{resource.cost}</p>
            </div>
          )       
        })}
      </div>
    )
  }
}

export default Resource;