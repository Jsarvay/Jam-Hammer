import React from 'react';
import Upload from '../components/Upload/index';
import { Col, Row, Container } from '../components/Grid';
import API from '../utils/API';
import { Fragment } from 'react';
import Nav from '../components/Nav';

function Uploading() {
  return (
    <Fragment>
      <Nav />
      <Container>
        <Upload />
      </Container>
    </Fragment>
  );
}

export default Uploading;
