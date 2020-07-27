import React, { Component } from 'react';
import axios from 'axios';

class CurrentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      isHidden: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/users/' + localStorage.user_id,
      { headers: { "Authorization": `Bearer ${localStorage.token}` } })
      .then(response => {
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const { first_name, last_name, email } = this.state;
    axios
      .patch(
        'http://localhost:3001/api/users/' + localStorage.user_id,
        {
          first_name: first_name,
          last_name: last_name,
          email: email
        },
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => console.log(response))
      .catch(error => {
        console.log('user update error', error);
      });
    event.preventDefault();
  }

  handleUserDelete() {
    axios
      .delete(
        'http://localhost:3001/api/users/' + localStorage.user_id,
        { headers: { "Authorization": `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        console.log(response);
        if (response.data.message) {
          this.props.history.push('/signup');
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h1>Current User Info:</h1>
        <h3>{this.state.first_name} {this.state.last_name}</h3>
        <h3>{this.state.email}</h3>
        <div>
          <button onClick={this.toggleHidden.bind(this)}>
            Update User Info
          </button>
          <br />
          <br />
          {/* {!this.state.isHidden && <UserUpdate />} */}
          {this.state.isHidden ? (
            <div>
              <h1>User Update here</h1>
              <form onSubmit={this.handleSubmit}>
                <label>First Name</label>
                <input
                  type="text"
                  value={this.state.first_name}
                  name="first_name"
                  placeholder={this.state.first_name}
                  onChange={this.handleChange}
                />
                <br />
                <label>Last Name</label>
                <input
                  type="text"
                  value={this.state.last_name}
                  name="last_name"
                  placeholder={this.state.last_name}
                  onChange={this.handleChange}
                />
                <br />
                <label>Email</label>
                <input
                  type="text"
                  value={this.state.email}
                  name="email"
                  placeholder={this.state.email}
                  onChange={this.handleChange}
                />
                <br />
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
              <br />
              <button
                onClick={() => this.handleUserDelete()}
                className="btn btn-danger">
                Delete Account
              </button>

            </div>
          ) : (
              null
            )}
        </div>
      </div>
    )
  }
}

export default CurrentUser;