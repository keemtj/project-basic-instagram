import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <StWrapper>
      <StHeader>
        <StTitle>Instagram</StTitle>
        <StSearch type="search" placeholder="검색" />
        <StMainNavigation>
          <ul>
            <li>홈</li>
            <li>DM</li>
            <li>탐색</li>
            <li>좋아요</li>
            <li>Profile</li>
          </ul>
        </StMainNavigation>
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
`;

const StSearch = styled.input`
  width: 22rem;
  height: 2.5rem;
`;

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
  }
`;

export default Header;
