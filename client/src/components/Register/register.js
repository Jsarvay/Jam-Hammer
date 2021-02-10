import React, { Component } from 'react';
import { Col, Row, Container } from '../Grid';
import { Card } from 'react-bootstrap';
import API from "../../utils/API";
import FadeIn from 'react-fade-in';
import './style.css';

class Register extends Component {
  
  state = {
    realName: "",
    username: "",
    email: "",
    password: ""
  }

  componentDidMount() {
    API.getCurrentUser().then((res) => {
      if(typeof res.data == "object") {
        window.location.assign("/user");
      }
    })
  };

  handleNameChange = event => {
    this.setState({realName: event.target.value})
  };

  handleUserChange = event => {
    this.setState({username: event.target.value})
  };

  handleEmailChange = event => {
    this.setState({email: event.target.value})
  };

  handlePassChange = event => {
    this.setState({password: event.target.value})
  };

  registerUser = event => {
    event.preventDefault();
    console.log(this.state);
    API.registerUser(this.state)        
    .then( (response) => {
      console.log(response);
      if (response.data.result === "success") {
        var token = response.data.token;
        console.log(token);
        localStorage.setItem("SavedToken", 'Bearer ' + token);
        console.log(localStorage.getItem("SavedToken"));
        window.location.assign('/user');
      }
      else {
        alert("Please enter valid credentials")
      }
      })
  };

  render() {
  return (
    <FadeIn
    transitionDuration={2000}>
    <Container className="form-color">

    <form className="form-color">
      <h2>Sign Up</h2>

      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Name" onChange={this.handleNameChange} />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input type="text" className="form-control" placeholder="Username" onChange={this.handleUserChange} />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={this.handleEmailChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={this.handlePassChange}
        />
      </div>

      <button type="submit" className="button-color" onClick={this.registerUser}>
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered <a href="/">sign in?</a>
      </p>
    </form>

    </Container>
    </FadeIn>
  );
}}

export default Register;
