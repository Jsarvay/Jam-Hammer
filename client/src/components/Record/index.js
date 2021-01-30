import React, { useState, useEffect, Component } from 'react';
import { Col, Row, Container } from '../Grid';
import axios from "axios";
import Jumbotron from '../Jumbotron';
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
                                <div className="col-md-4"></div>
                                <button className="button-color" onClick={this.Upload}>Upload</button>
                                <div className="col-md-4">
                                </div>
                            </Row>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    };
};

export default RecordComp;