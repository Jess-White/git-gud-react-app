import React, { Component } from 'react';
import axios from 'axios';

class Resources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resources: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/api/resources')
    .then(response => {
      console.log(response)
      this.setState({resources: response.data})
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        {this.state.resources.map((resource) => {
          return(
            <div className="tile" key={resource.id} >
              <h4>{resource.name}</h4>
              <p>{resource.url}</p>
            </div>
          )       
        })}
      </div>
    )
  }
}

export default Resources;
