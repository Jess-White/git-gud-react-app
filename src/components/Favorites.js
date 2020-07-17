import React, { Component } from 'react';
import axios from 'axios';

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/favorites', { headers: { "Authorization": `Bearer ${localStorage.token}` } })
      .then(response => {
        console.log(response)
        this.setState({ favorites: response.data })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        <h1>Favorites:</h1>
        {this.state.favorites.map((favorite) => {
          return (
            <div className="tile" key={favorite.id} >
              <h4>{favorite.name}</h4>
              <p>{favorite.url}</p>

            </div>
          )
        })}
      </div>
    )
  }
}

export default Favorites;