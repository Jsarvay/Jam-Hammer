import React, { Component } from 'react';
import {useParams} from "react-router-dom";
import { Col, Row, Container } from '../Grid';
import Jumbotron from '../Jumbotron';
import {Card, Modal} from "react-bootstrap";
import API from "../../utils/API";
import Song from "../Song/index";
import FadeIn from 'react-fade-in';
import "./style.css";

class User extends Component {

    state = {
        user: {},
        profilePicture: "",
        songs: [],
        state: false,
        picture: false,
        src: false
    };

    setShow = event => {
        this.setState({show: true});
    };

    setClose = event => {
        this.setState({show: false});
    };

    pictureChange = event => {
        let upload = event.target.files[0];
        let src = URL.createObjectURL(upload);

        this.setState({
            picture: upload,
            src: src
        })
    }

    Upload = (ev) => {
        var fd = new FormData();
        fd.append('picture', this.state.picture);
        axios({
            method: 'post',
            url: '/api/users/profile',
            data: fd,
            headers: {Authorization: localStorage.getItem('SavedToken')},
            processData: false,
            contentType: false
        }).then(function (data) {
            console.log(data);
            window.location.assign('/user');
        });
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
                    <button className="button-color" onClick={this.setShow}>Upload Picture</button>
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
        <Modal show={this.state.show} onHide={this.setClose}>
            <Modal.Body className="recording-background">
                <form>
                    <input type="file" accept="image/*" multiple="false" onChange={this.pictureChange}></input>
                </form>
            </Modal.Body>
            <Modal.Footer className="recording-background">
                <button className="button-color button-width" onClick={this.Upload}>Upload</button>
            </Modal.Footer>
        </Modal>
    </Container>
    </FadeIn>
    )
}};

export default User;