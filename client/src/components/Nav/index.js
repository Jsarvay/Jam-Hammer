import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import "./style.css";

function Navigate() {

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand className="title" href="/"><h1><span>jam</span><br /><span>Hammer</span></h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="nav-links" href="/recording"><h3>Record</h3></Nav.Link>
          <Nav.Link className="nav-links" href="/upload"><h3>Upload</h3></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }

export default Navigate;
