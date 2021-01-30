import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from '../Grid';
import {Card} from "react-bootstrap";
import "./style.css";

function Searching() {
    return (
        <Container fluid>
        <div className="form-group">
            <form className="search">
                <input
                name="search"
                type="text"
                placeholder="search"
                className="form-control">
                </input>
                <button className="button-color">Search</button>
            </form>
        </div>

        <Row>
            <Col size="md-12">
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
        </Container>
    )
}

export default Searching;