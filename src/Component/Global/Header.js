import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import MainNavigationContainer from '../../Container/Global/MainNavigationContainer';
import SearchContainer from '../../Container/Global/SearchContainer';
import NewPost from '../New/NewPost';

const Header = ({
  modalState,
  progress,
  setProgress,
  openModal,
  closeModal,
}) => {
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
        <SearchContainer />
        <MainNavigationContainer openModal={openModal} />
      </StHeader>
      {progress !== 0 && <StProgressbar value={progress} max={100} />}
      {modalState && (
        <NewPost closeModal={closeModal} setProgress={setProgress} />
      )}
    </StWrapper>
  );
};

const StProgressbar = styled.progress`
  position: fixed;
  top: 5.5rem;
  left: 0;
  z-index: 2;

  border: none;
  width: 100%;
  height: 0.3rem;
  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.background};
  }
  &::-webkit-progress-value {
    background-image: -webkit-linear-gradient(
      left,
      #f09433 0%,
      #e6683c 25%,
      #dc2743 50%,
      #cc2366 75%,
      #bc1888 100%
    );
  }
`;

const StWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 5.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  background-color: ${({ theme }) => theme.white};
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
    color: ${({ theme }) => theme.black};
  }
`;

const StLogo = styled.img`
  width: 10rem;
  height: 100%;
`;

export default Header;
