import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import firebase from '../firebase';

const HeadingContainer = styled.div`
  .nav {
    color: #fff;
    text-decoration: none;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const Heading = () => {
  
  const { displayName, uid, accessToken } = useSelector((state) => state.user);

  const navigate = useNavigate();

  // const LogoutHandler = useCallback(() => {
  //   firebase.auth().signOut();
  //   navigate('/')
  // }, [navigate]);
  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate('/')
  };

  return (
    <HeadingContainer>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Community ^_^</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav" to="/">
                Home
              </Link>
              <Link className="nav" to="/upload">
                Upload
              </Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            {accessToken ? (
              <Navbar.Text className='nav' onClick={LogoutHandler}>
                Logout
              </Navbar.Text>
            ) : (
              <Link className="nav" to="/login">
                Login
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeadingContainer>
  );
};

export default Heading;
