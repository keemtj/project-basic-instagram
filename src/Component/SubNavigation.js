import React from 'react';
import styled from 'styled-components';

const SubNavigation = () => {
  return (
    <StSubNavigation>
      <StNav>
        <StNavItem>게시물</StNavItem>
        <StNavItem>IGTV</StNavItem>
        <StNavItem>저장됨</StNavItem>
        <StNavItem>태그됨</StNavItem>
      </StNav>
    </StSubNavigation>
  );
};

const StSubNavigation = styled.nav`
  border-top: 1px solid rgba(219, 219, 219, 1);
  height: 5rem;
`;

const StNav = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StNavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 100%;
  color: rgba(142, 142, 142, 1);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  cursor: pointer;
  position: relative;
  & + & {
    margin-left: 6rem;
  }
  &::after {
    width: 100%;
    content: '';
    position: absolute;
    top: -1px;
    background: white;
    transition: all 0.2s ease-in-out;
    border-top: 1px solid black;
  }
`;
export default SubNavigation;
