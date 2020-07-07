import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Resources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resources: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/resources')
      .then(response => {
        console.log(response)
        this.setState({ resources: response.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        <h1>Resources:</h1>
        {this.state.resources.map((resource) => {
          return (
            <div className="tile" key={resource.id} >
              <h4>{resource.name}</h4>
              <p>{resource.url}</p>
              <NavLink style={{ color: "green" }} className="navbar-brand" to={`/resources/${resource.id}`}>Show Resource</NavLink>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Resources;