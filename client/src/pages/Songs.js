import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';

function Songs() {
  // Setting our component's initial state
  const [songs, setSongs] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all songs and store them with setSongs
  useEffect(() => {
    loadSongs();
  }, []);

  // Loads all songs and sets them to songs
  function loadSongs() {
    API.getSongs()
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a song from the database with a given id, then reloads song from the db
  function deleteSong(id) {
    API.deleteSong(id)
      .then((res) => loadSongs())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveSong method to save the song data
  // Then reload song from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.creator) {
      API.saveSong({
        title: formObject.title,
        creator: formObject.creator,
        audio: formObject.audio,
        genre: formObject.genre,
        instrument: formObject.instrument,
        download: formObject.download,
        likes: formObject.likes,
        date: formObject.date,
        description: formObject.description
      })
        .then((res) => loadSongs())
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>What Songs Should I Check Out?</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              onChange={handleInputChange}
              name="creator"
              placeholder="Creator (required)"
            />
            <TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Description (Optional)"
            />
            <FormBtn
              disabled={!(formObject.creator && formObject.title)}
              onClick={handleFormSubmit}
            >
              Submit Song
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Songs On My List</h1>
          </Jumbotron>
          {songs.length ? (
            <List>
              {songs.map((song) => (
                <ListItem key={song._id}>
                  <Link to={'/songs/' + song._id}>
                    <strong>
                      {song.title} by {song.creator}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteSong(song._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Songs;
