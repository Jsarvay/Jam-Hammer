import React from "react";
import { Col, Row, Container } from '../Grid';
import "./index.css";

function LoginForm() {
  return (
    <Container className="form-color">
    <form className="form-color">
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
      </div>
      <input className="button-color" type="submit" value="LOGIN" />
    </form>
    </Container>
  );
}

export default LoginForm;
