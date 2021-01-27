import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from '../Grid';
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import Jumbotron from '../Jumbotron';
import "./style.css";

function Record() {

        const {
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
        } = useReactMediaRecorder({ audio: true });
        
        async function Upload(ev){
            let blob = await fetch(mediaBlobUrl).then(r => r.blob());
            var fd = new FormData();
            fd.append('fname', 'MySong.wav');
            fd.append('data', blob);
            axios({
                method: 'post',
                url: '/api/song',
                data: fd,
                processData: false,
                contentType: false
            }).then(function (data) {
                console.log(data);
            });
        }

    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <Row>
                            <div className="col-md-12">
                                <p>{status}</p>
                                <audio src={mediaBlobUrl} controls></audio>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-nd-12">
                                <button onClick={startRecording}>Record</button>
                                <button onClick={stopRecording}>Stop</button>
                                <button onClick={Upload}>Upload</button>
                            </div>
                        </Row>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
};

export default Record;