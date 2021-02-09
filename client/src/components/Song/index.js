import React, { Component } from 'react';
import { Col, Row, Container } from '../Grid';
import {Card} from "react-bootstrap";
import "./style.css";

function Song(props) {
    return (
        <Row>
            <Col size="md-12">
            <Card className="background-card">
                <Card.Body>
                    <audio src={props.audio}></audio>
                    <Card.Title><p>{props.title}</p></Card.Title>
                    <Card.Text>
                        <p>Instrument: {props.instrument}</p>
                    </Card.Text>
                    <Card.Text>
                        <p>Genre: {props.genre}</p>
                    </Card.Text>
                    <Card.Text>
                        <p>Description: {props.description}</p>
                    </Card.Text>
                    <Card.Text>
                        <p>Downloads: {props.download}</p>
                    </Card.Text>
                    <Card.Text>
                        <p>Likes: {props.likes}</p>
                    </Card.Text>
                    <button className="button-color">Jam to this!</button>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    )
};

export default Song;