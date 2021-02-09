import React from 'react';
import Register from '../components/Register/register';
import { Col, Row, Container } from '../components/Grid';
import API from '../utils/API';
import Logo from '../components/Logo';
import { Fragment } from 'react';

function register() {
  return (
    <Fragment>
      <Logo />
      <Container>
        <Register />
      </Container>
    </Fragment>
  );
}

// export default Register;
export default register;
