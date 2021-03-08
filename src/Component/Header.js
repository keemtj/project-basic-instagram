import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import MainNavigation from './MainNavigation';

const Header = () => {
  return (
    <StWrapper>
      <StHeader>
        <StTitle>
          <NavLink to="/">Instagram</NavLink>
        </StTitle>
        <StSearch type="search" placeholder="검색" />
        <MainNavigation />
      </StHeader>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 5rem;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  background-color: white;
`;

const StHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 95rem;
  height: 100%;
`;

const StTitle = styled.h1`
  width: 15rem;
  & > a {
    text-decoration: none;
    color: black;
  }
`;

const StSearch = styled.input`
  width: 22rem;
  height: 2.5rem;
`;

export default Header;
