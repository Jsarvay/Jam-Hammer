import React from 'react';
import Record from "../components/Record/index";
import { Col, Row, Container } from '../components/Grid';
import API from '../utils/API';
import WaveSurfer from 'wavesurfer.js';

const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: true,
    controlBar: {
        fullscreenToggle: false
    },
    plugins: {
        
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            backend: 'WebAudio',
            waveColor: '#01B7DE',
            progressColor: '#E97DB1',
            debug: true,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true,
            displayMilliseconds: true,
            plugins: [
                // enable microphone plugin
                WaveSurfer.microphone.create({
                    bufferSize: 4096,
                    numberOfInputChannels: 1,
                    numberOfOutputChannels: 1,
                    constraints: {
                        video: false,
                        audio: true
                    }
                })
            ]
        },
        
        record: {
            audio: true,
            audioMimeType: 'audio/wav',
            video: false,
            maxLength: 5*60,
            debug: true
        }
    }
};

function Recording() {
    return (
        <Container>
        <Record {...videoJsOptions}/>
        </Container>
    )
}

export default Recording;