import React, { Component } from 'react';
import {useParams} from "react-router-dom";
import { Col, Row, Container } from '../Grid';
import Jumbotron from '../Jumbotron';
import {Card} from "react-bootstrap";
import API from "../../utils/API";
import Song from "../Song/index";
import FadeIn from 'react-fade-in';
import "./style.css";

class User extends Component {

    state = {
        user: {},
        profilePicture: "",
        songs: []
    };


    componentDidMount() {
        API.getCurrentUser().then((res) => {
            if(typeof res.data != "object") {
              window.location.assign("/");
            }
          })
        let id = window.location.pathname.substring(6)
        if(id == ""){
            API.getCurrentUser().then((res) => {
                this.setState({ user: res.data })
                this.setState({ profilePicture: "https://jamhammer.s3.amazonaws.com/ProfilePictures/" + res.data.profilePicture + ".png" })
                this.setState({songs: this.state.user.songs})
            });
        }else{
            console.log(id);
            API.getUser(id).then((res) => {
                this.setState({ user: res.data })
                this.setState({ profilePicture: "https://jamhammer.s3.amazonaws.com/ProfilePictures/" + res.data.profilePicture + ".png" })
                this.setState({songs: this.state.user.songs})
            });
        }
      };

    render() {
    return (
        <FadeIn
        transitionDuration={2000}>
        <Container fluid>
        <Row>
            <Col size="md-4">
                <Card className="background-card">
                    <Card.Img variant="top" src={this.state.profilePicture} />
                    <Card.Body>
                    <Card.Title><h4>{this.state.user.username}</h4></Card.Title>
                    </Card.Body>
                </Card>
            </Col>

            <Col size="md-8">
                <Jumbotron>
                {this.state.songs.map(song => (
                <Song 
                song={song}
                isUser="true"
                />
                ))}
                </Jumbotron>
            </Col>
        </Row>
    </Container>
    </FadeIn>
    )
}};

export default User;