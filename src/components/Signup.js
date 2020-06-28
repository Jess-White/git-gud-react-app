import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      user_name: "",
      password: "",
      password_confirmation: "",
      signUpErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const {
      first_name, last_name, email, user_name, password, password_confirmation
    } = this.state;

    axios
      .post(
        "http://localhost:3001/api/users",
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          user_name: user_name,
          password: password,
          password_confirmation: password_confirmation
        }
        // { withCredentials: true }
      )
      .then(response => {
        console.log("registration res", response);
        // if (response.data.status === "created") {
        //   this.props.handleSuccessfulAuth(response.data);
        // }
      })
      .catch(error => {
        console.log("signup error", error);
        alert(JSON.stringify(error.response.data.errors))
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={this.state.first_name}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={this.state.last_name}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="user_name"
            placeholder="User Name"
            value={this.state.user_name}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Signup</button>

        </form>
      </div>
    );
  }
}