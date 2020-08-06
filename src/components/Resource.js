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
      user_id: "",
      id: "",
      url: "",
      name: "",
      resource_type: "",
      format: "",
      difficulty: "",
      cost: "",
      currentResourceId: "",
      favorite: "",
      canEdit: false,
      reviews: [],
      user: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showEditAbility = this.showEditAbility.bind(this);
  }
  componentDidMount() {
    axios.get(
      `http://localhost:3001/api/resources/${this.props.match.params.id}`,
      { headers: { "Authorization": `Bearer ${localStorage.token}` } }
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          user_id: response.data.user_id,
          id: response.data.id,
          url: response.data.url,
          name: response.data.name,
          resource_type: response.data.resource_type,
          format: response.data.format,
          difficulty: response.data.difficulty,
          cost: response.data.cost,
          reviews: response.data.reviews,
          favorite: response.data.favorite,
          loading: false,
          user: response.data.user
        });
      })
      .then(response => {
        this.showEditAbility()
      })
      .catch(error => {
        console.log(error);
      })
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  showEditAbility() {
    if (this.state.user_id == localStorage.user_id) {
      this.setState({
        canEdit: !this.state.canEdit
      })
    }
  }

  createFavorite() {
    axios
      .post(
        'http://localhost:3001/api/favorites',
        {
          user_id: localStorage.user_id,
          resource_id: this.state.id
        },
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        this.setState({
          favorite: true
        })
        console.log(response);
      })
      .catch(error => {
        console.log('favorite create error', error);
      });
  }

  handleFavoriteDelete() {
    axios
      .delete(
        'http://localhost:3001/api/favorites/' + "user_id=" + localStorage.user_id + "&resource_id=" + this.state.id,
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        this.setState({
          favorite: false
        })
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleReviewDelete() {
    axios
      .delete(
        'http://localhost:3001/api/reviews/' + this.state.id,
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        console.log(response);
        if (response.data.message) {
          this.props.history.push('/reviews');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const { url, name, resource_type, format, difficulty, cost } = this.state;
    axios
      .patch(
        'http://localhost:3001/api/resources/' + this.state.id,
        {
          url: url,
          name: name,
          resource_type: resource_type,
          format: format,
          difficulty: difficulty,
          cost: cost
        },
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        this.toggleHidden();
      })
      .catch(error => {
        console.log('resource update error', error);
      });
    event.preventDefault();
  }

  render() {
    if (this.state.loading) {
      return (
        <h1>Loading....</h1>
      )
    }
    return (
      <div className="container">
        <a href={this.state.url}>{this.state.name}</a>
        <h3>Type: {this.state.resource_type}</h3>
        <h3>Format: {this.state.format}</h3>
        <h3>Difficulty: {this.state.difficulty}</h3>
        <h3>Cost: {this.state.cost}</h3>
        <h3>Id: {this.state.id}</h3>

        {this.state.favorite === false ?
          <button onClick={this.createFavorite.bind(this)}>Add to Favorites</button>
          : <button onClick={this.handleFavoriteDelete.bind(this)}>Remove from Favorites</button>
        }

        <br />

        <div className="container">
          <h1>Reviews:</h1>
          {this.state.reviews.map((review) => {
            return (
              <div className="tile" key={review.id} >
                <h3>{review.title}</h3>
                <h3>{review.body}</h3>
                <h3>{}</h3>
                <br />
              </div>
            );
          })}
        </div>

        {this.state.canEdit ? (
          <div>
            <button onClick={this.toggleHidden.bind(this)}>
              Update Review
            </button>
            <br />
            <br />
            {this.state.isHidden ? (
              <div>
                <h1>Review Update</h1>
                <form onSubmit={this.handleSubmit}>
                  <label>URL</label>
                  <input
                    type="text"
                    value={this.state.url}
                    name="url"
                    placeholder={this.state.url}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label>Name</label>
                  <input
                    type="text"
                    value={this.state.name}
                    name="name"
                    placeholder={this.state.name}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label>Resource Type</label>
                  <input
                    type="text"
                    value={this.state.resource_type}
                    name="resource_type"
                    placeholder={this.state.resource_type}
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <label>Format</label>
                  <input
                    type="text"
                    value={this.state.format}
                    name="format"
                    placeholder={this.state.format}
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <label>Difficulty</label>
                  <input
                    type="text"
                    value={this.state.difficulty}
                    name="difficulty"
                    placeholder={this.state.difficulty}
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <label>Cost</label>
                  <input
                    type="text"
                    value={this.state.cost}
                    name="cost"
                    placeholder={this.state.cost}
                    onChange={this.handleChange}
                  />
                  <br />
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
                <br />
                <button
                  onClick={() => this.handleReviewDelete()}
                  className="btn btn-danger">
                  Delete Review
                </button>

              </div>
            ) : (
                null
              )}
          </div>
        ) : (
            null
          )}
        <div>
          <ReviewsNew
            resource_id={this.state.id}
            history={this.props.history} />
        </div>
      </div>
    )
  }
}

export default Resource;