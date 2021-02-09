import React from 'react';
import Nav from '../components/Nav';
import { Col, Row, Container } from '../components/Grid';
import User from '../components/User/index';
import { Fragment } from 'react';

function Userpage() {
  return (
    <Fragment>
      <Nav />
      <Container>
        <User />
      </Container>
    </Fragment>
  );
}

export default Userpage;
