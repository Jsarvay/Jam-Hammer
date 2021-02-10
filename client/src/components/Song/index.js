import React, { Component, useState } from 'react';
import { Col, Row, Container } from '../Grid';
import { Card } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import API from "../../utils/API";
import "./style.css";

function Song(props) {
    console.log(props.song.title);
    const [SongData, setSongData] = useState(props.song);
    const [isLiked, setIsLiked] = useState(false);

    var checkLiked = function () {
        var jwt = localStorage.getItem('SavedToken');
        var firstPeriod = jwt.indexOf(".");
        var jwtData = jwt.substring(firstPeriod + 1, jwt.indexOf(".", firstPeriod + 1));
        var userData = JSON.parse(atob(jwtData));

        if (SongData.likes.includes(userData.userId)) {
            console.log("Song: " + SongData.title);
            return ("Already Jamming")
        } else {
            return ("Jam to this")
        }

    }

    var jamLike = function () {
        API.updateSong(SongData._id).then((res) => {
            setSongData(res.data);
        })
    };

    var link = "";

    if (props.isUser == "false") {
        link = "/user/" + SongData.creator._id;
    }
    return (
        <Row>
            <Col size="md-12">
                <Card className="background-card">
                    <Card.Body>
                        <ReactAudioPlayer
                            src={SongData.audio}
                            controls
                        />
                        <Card.Title><p>{SongData.title}</p></Card.Title>
                        {props.isUser == "false" &&
                            <Card.Text>
                                <p>Creator: <a href={link}>{SongData.creator.username}</a></p>
                            </Card.Text>
                        }
                        <Card.Text>
                            <p>Instrument: {SongData.instrument}</p>
                        </Card.Text>
                        <Card.Text>
                            <p>Genre: {SongData.genre}</p>
                        </Card.Text>
                        <Card.Text>
                            <p>Description: {SongData.description}</p>
                        </Card.Text>
                        <Card.Text>
                            <p>Likes: {SongData.likes.length}</p>
                        </Card.Text>
                        <button className="button-color" id={SongData._id} onClick={jamLike}>{checkLiked()}</button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
};

export default Song;