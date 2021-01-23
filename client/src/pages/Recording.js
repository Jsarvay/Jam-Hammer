import React from 'react';
import Nav from "../components/Nav/index";
import Record from "../components/Record/index";
import { Col, Row, Container } from '../components/Grid';
import API from '../utils/API';

function Recording() {
    return (
        <Container>
        <Record />
        </Container>
    )
}

export default Recording;