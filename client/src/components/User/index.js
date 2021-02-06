import React, { Component } from 'react';
import { Col, Row, Container } from '../Grid';
import Jumbotron from '../Jumbotron';
import {Card} from "react-bootstrap";
import "./style.css";

class User extends Component {

    render() {
    return (
        <Container fluid>
        <Row>
            <Col size="md-4">
                <Card className="background-card">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                    <Card.Title><h4>Username</h4></Card.Title>
                    </Card.Body>
                </Card>
            </Col>

            <Col size="md-8">
                <Jumbotron>
                    <Row>
                        <Col size="md-12">
                            <h1>Jam Creations</h1>
                            <Card className="background-card">
                                <Card.Body>
                                    <audio></audio>
                                <Card.Title><p>Jam Name</p></Card.Title>
                                <Card.Text>
                                    <p>Instrument: </p>
                                </Card.Text>
                                <Card.Text>
                                    <p>Genre: </p>
                                </Card.Text>
                                <Card.Text>
                                    <p>Description: </p>
                                </Card.Text>
                                <Card.Text>
                                    <p>Downloads: </p>
                                </Card.Text>
                                <Card.Text>
                                    <p>Likes: </p>
                                </Card.Text>
                                <button className="button-color">Jam to this!</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Jumbotron>
            </Col>
        </Row>
    </Container>
    )
}};

export default User;