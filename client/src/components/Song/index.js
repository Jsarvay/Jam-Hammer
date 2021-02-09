import React, { Component, useState } from 'react';
import { Col, Row, Container } from '../Grid';
import {Card} from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import "./style.css";

function Song(props) {

    let link = "/user/" + props.id;

    return (
        <Row>
            <Col size="md-12">
            <Card className="background-card">
                <Card.Body>
                    <ReactAudioPlayer
                    src={props.audio}
                    controls
                    />                   
                    <Card.Title><p>{props.title}</p></Card.Title>
                    <Card.Text>
                        <p>Creator: <a href={link}>{props.creator}</a></p>
                    </Card.Text>
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
                        <p>Likes: {props.likes.length}</p>
                    </Card.Text>
                    <button className="button-color">Jam to this!</button>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    )
};

export default Song;