import React, { useState, useEffect, Component } from 'react';
import { Col, Row, Container } from '../Grid';
import axios from "axios";
import Jumbotron from '../Jumbotron';
import {Modal} from "react-bootstrap";
import "./style.css";

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';


// Required imports when recording audio-only using the videojs-wavesurfer plugin
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
// Register videojs-wavesurfer plugin
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';


// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';

WaveSurfer.microphone = MicrophonePlugin;


class RecordComp extends Component {

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

    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, () => {
            // print version information at startup
            const version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version;
            videojs.log(version_info);
        });

        // device is ready
        this.player.on('deviceReady', () => {
            console.log('device is ready!');
        });

        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
            console.log('started recording!');
        });

        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording: ', this.player.recordedData);

        });

        // error handling
        this.player.on('error', (element, error) => {
            console.warn(error);
        });

        this.player.on('deviceError', () => {
            console.error('device error:', this.player.deviceErrorCode);
        });

    }

    Upload = (ev) => {
        let blob = this.player.recordedData;
        var fd = new FormData();
        fd.append('fname', "Bullshit.ogg");
        fd.append('data', blob);
        fd.append('title', this.state.title);
        fd.append('genre', this.state.genre);
        fd.append('instrument', this.state.instrument);
        fd.append('description', this.state.description);
        axios({
            method: 'post',
            url: '/api/song',
            data: fd,
            headers: {Authorization: localStorage.getItem('SavedToken')},
            processData: false,
            contentType: false
        }).then(function (data) {
            console.log(data);
        });
    }

    render() {

        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <Row>
                                <div className="col-md-12">
                                    <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
                                </div>
                            </Row>
                            <Row>
                                <button className="button-color button-width" onClick={this.setShow}>Upload</button>
                            </Row>
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
    };
};

export default RecordComp;