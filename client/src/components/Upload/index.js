import React, { Component } from 'react';
import { Col, Row, Container } from '../Grid';
import Jumbotron from '../Jumbotron';
import {Modal} from "react-bootstrap";

import './style.css';

class Upload extends Component {

  state = {
    show: false,
    title: "",
    genre: "",
    instrument: "",
    description: ""
};

setShow = event => {
  this.setState({show: true});
};

setClose = event => {
  this.setState({show: false});
};

handleTitleChange = event => {
  this.setState({title: event.target.value})
};

handleGenreChange = event => {
  this.setState({genre: event.target.value})
};

handleInstrumentChange = event => {
  this.setState({instrument: event.target.value})
};

handleDescriptionChange = event => {
  this.setState({description: event.target.value})
};

  render() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <Row>
              <button onClick={this.setShow}>Upload</button>
            </Row>
            <Row></Row>
            <Modal show={this.state.show} onHide={this.setClose}>
              <Modal.Body className="recording-background">
                <form>
                  <div className="form-group">
                    <label>Title</label>
                      <input type="text" className="form-control" onChange={this.handleTitleChange} />
                  </div>

                  <div className="form-group">
                    <label>Genre</label>
                      <input type="text" className="form-control" onChange={this.handleGenreChange} />
                  </div>

                  <div className="form-group">
                    <label>Instrument</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleInstrumentChange}
                        />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleDescriptionChange}
                        />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer className="recording-background">
                <button className="button-color button-width" onClick={this.Upload}>Upload</button>
              </Modal.Footer>
              </Modal>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}};

export default Upload;
