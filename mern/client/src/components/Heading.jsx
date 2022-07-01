import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeadContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .nav {
      padding: 0 50px;
    }
  }
`;

const Heading = () => {
  return (
    <HeadContainer>
      <h1>Hello, React</h1>
      <nav>
        <NavLink className='nav' to="/">Home</NavLink>
        <NavLink className='nav' to="/upload">Upload</NavLink>
        <NavLink className='nav' to="/list">List</NavLink>
      </nav>
    </HeadContainer>
  );
};

export default Heading;
