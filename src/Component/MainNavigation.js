import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Home } from '@styled-icons/ionicons-outline/Home';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Compass } from '@styled-icons/ionicons-outline/Compass';
import { Heart } from '@styled-icons/ionicons-outline/Heart';

const MainNavigation = () => {
  return (
    <StMainNavigation>
      <ul>
        <li>
          <NavLink to="/">
            <StIcon>
              <Home />
            </StIcon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/direct">
            <StIcon>
              <PaperPlane />
            </StIcon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore">
            <StIcon>
              <Compass />
            </StIcon>
          </NavLink>
        </li>
        <li>
          <StIcon>
            <Heart />
          </StIcon>
        </li>
        <li>
          <NavLink to="/user">
            <StProfile>
              <StProfileImage
                src="https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/27/105114070.2.jpg"
                alt="일론머스크"
              />
            </StProfile>
          </NavLink>
        </li>
      </ul>
    </StMainNavigation>
  );
};

const StMainNavigation = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > ul {
    width: fit-content;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    & > li + li {
      margin-left: 1.8rem;
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

const StIcon = styled.div`
  width: 2.6rem;
  height: 2.6rem;
`;

const StProfile = styled.div`
  /* true면 black false면 white */
  border: 1px solid black;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StProfileImage = styled.img`
  border: 2px solid white;
  border-radius: 50%;
  width: 2.6rem;
  height: 2.6rem;
  object-fit: cover;
`;

export default MainNavigation;
