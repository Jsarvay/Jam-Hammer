import React from 'react';
import Log from '../components/Login/index';
import { Col, Row, Container } from '../components/Grid';
import Logo from '../components/Logo';
import API from '../utils/API';
import { Fragment } from 'react';

function Login() {
  return (
    <Fragment>
      <Logo />
      <Container>
        <Log />
      </Container>
    </Fragment>
  );
}

export default Login;
