import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const HeadingContainer = styled.div`

  .nav {
    color: #fff;
    text-decoration: none;
  }
`;

const Heading = () => {
  return (
    <HeadingContainer>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav" to="/">Home</NavLink>
              <NavLink className="nav" to="/upload">Upload</NavLink>
              <NavLink className="nav" to="/list">List</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeadingContainer>
  );
};

export default Heading;
