import React, { Component } from "react";
import { Col, Row, Container } from '../Grid';
import {Redirect} from "react-router-dom";
import API from "../../utils/API";
import "./index.css";

class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    API.getCurrentUser().then((res) => {
      if(typeof res.data == "object") {
        window.location.assign("/user");
      }
    })
  };

  handleUserChange = event => {
    this.setState({username: event.target.value})
  };

  handlePassChange = event => {
    this.setState({password: event.target.value})
  };

  loginUser = event => {
    event.preventDefault();
    console.log(this.state);
    API.loginUser(this.state)        
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
        alert(response.data.reason)
      }
      })
  };

  render() {
  return (
    <Container className="form-color">
    <form className="form-color">
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input type="text" name="name" id="name" onChange={this.handleUserChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={this.handlePassChange} />
        </div>
      </div>
      <input className="button-color" type="submit" value="LOGIN" onClick={this.loginUser} />
    </form>
    </Container>
  );
}};

export default LoginForm;
