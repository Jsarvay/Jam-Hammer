import React, { Component } from 'react';
import { Col, Row, Container } from '../Grid';
import {Card} from "react-bootstrap";
import Song from "../Song/index";
import API from "../../utils/API";
import "./style.css";

class Searching extends Component {

    state = {
        search: "",
        songs: [],
        filter: []
      };

    componentDidMount() {
        API.getSongs()
        .then((res) => {
            this.setState({ songs: res.data, filter: res.data })
        }
        )
        .catch(err => console.log(err));
      };

    handleSearch = event => {
        event.preventDefault();
        const filtered = this.state.songs.filter(song => song.title.includes(this.state.search)
        || song.creator.username.includes(this.state.search)
        || song.genre.includes(this.state.search)
        || song.instrument.includes(this.state.search));
        console.log(filtered)
        this.setState({ filter: filtered });
    };

    handleInputChange = event => {
        this.setState({search: event.target.value});
    };

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
                <button className="button-color" onClick={this.handleSearch}>Search</button>
            </form>
        </div>

        {this.state.filter.map(song => (
          <Song 
          key={song.id}
          title={song.title}
          creator={song.creator.username}
          id={song._id}
          audio={song.audio}
          genre={song.genre}
          instrument={song.instrument}
          description={song.description}
          download={song.download}
          likes={song.likes}
          />
        ))}
        </Container>
    )}
}

export default Searching;