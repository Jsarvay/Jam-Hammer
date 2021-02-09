import React from 'react';
import { Col, Row, Container } from '../components/Grid';
import Nav from '../components/Nav';
import Searching from '../components/Searching/index';
import { Fragment } from 'react';

function Search() {
  return (
    <Fragment>
      <Nav />
      <Container>
        <Nav />
        <Searching />
      </Container>
    </Fragment>
  );
}

export default Search;
