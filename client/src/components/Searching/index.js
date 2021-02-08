import React, { Component } from 'react';
import { Col, Row, Container } from '../Grid';
import {Card} from "react-bootstrap";
import Song from "../Song/index";
import "./style.css";

class Searching extends Component {

    state = {
        search: "",
        songs: [],
        filter: []
      };

    componentDidMount() {
        API.getSongs().populate("user")
        .then(res => this.setState({ songs: res.data.results }))
        .catch(err => console.log(err))
        .then(this.setState({filter: songs.slice([0], [9])}));
      };

    handleSearch = event => {
        event.preventDefault();
        const filtered = this.state.songs.filter(song => song.title.includes(this.state.search)
        || song.creator.includes(this.state.search)
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
                <button className="button-color">Search</button>
            </form>
        </div>

        {this.state.filter.map(song => (
          <Song 
          key={song.id}
          title={song.title}
          creator={song.creator}
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