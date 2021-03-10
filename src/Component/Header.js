import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import MainNavigation from './MainNavigation';

const Header = () => {
  return (
    <StWrapper>
      <StHeader>
        <StTitle>
          <NavLink to="/">
            <StLogo
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt="instagram"
            />
          </NavLink>
        </StTitle>
        <StSearch>
          <StSearchInput type="search" placeholder="검색" />
        </StSearch>
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
  height: 5.5rem;
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
  width: 100%;
  & > a {
    text-decoration: none;
    color: black;
  }
`;

const StLogo = styled.img`
  width: 10rem;
  height: 100%;
`;

const StSearch = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StSearchInput = styled.input`
  width: 22rem;
  height: 3rem;
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 3px;
  background-color: #fafafa;
  padding-left: 2.5rem;
  &::placeholder {
    color: #828282;
    font-weight: 100;
  }
`;

export default Header;
