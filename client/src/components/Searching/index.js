import React, { Component } from 'react';
import { Col, Row, Container } from '../Grid';
import {Card} from "react-bootstrap";
import "./style.css";

class Searching extends Component {

    state = {
        search: "",
        songs: [],
        filter: []
      };

    /*componentDidMount() {
        API.getSongs()
        .then(res => this.setState({ songs: res.data.results }))
        .catch(err => console.log(err));
      };*/

    handleInputChange = event => {
        this.setState({search: event.target.value});
    }

    render(){
    return (
        <Container fluid>
        <div className="form-group">
            <form className="search">
                <input
                name="search"
                type="text"
                placeholder="search"
                className="form-control"
                onChange={this.handleInputChange}>
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
    )}
}

export default Searching;