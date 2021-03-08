import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MainNavigation = () => {
  return (
    <StMainNavigation>
      <ul>
        <li>
          <NavLink to="/">홈</NavLink>
        </li>
        <li>
          <NavLink to="/direct">DM</NavLink>
        </li>
        <li>
          <NavLink to="/explore">탐색</NavLink>
        </li>
        <li>좋아요</li>
        <li>
          <NavLink to="/user">Profile</NavLink>
        </li>
      </ul>
    </StMainNavigation>
  );
};

const StMainNavigation = styled.nav`
  width: 15rem;
  & > ul {
    display: flex;
    flex-flow: row nowrap;
    & > li {
      flex-grow: 1;
    }
    & > li:last-child {
      flex-grow: 0;
    }
    & > li > a {
      text-decoration: none;
      color: black;
    }
  }
`;

export default MainNavigation;
