import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from '../Grid';
import Jumbotron from '../Jumbotron';
import './style.css';

function Upload() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <Row>
              <button>Upload</button>
            </Row>
            <Row></Row>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Upload;
