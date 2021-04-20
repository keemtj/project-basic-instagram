import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from '@styled-icons/ionicons-outline/Search';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import NewPost from '../New/NewPost';
import MainNavigationContainer from '../../Container/Global/MainNavigationContainer';

const Header = () => {
  const [modalState, setModalState] = useState(false);
  const [progress, setProgress] = useState(0);

  const openModal = () => {
    console.log('open new post!');
    setModalState(!modalState);
  };

  const closeModal = () => {
    console.log('close new post!');
    setModalState(!modalState);
  };

  useEffect(() => {
    document.body.style.overflow = modalState ? 'hidden' : 'auto';
  }, [modalState]);

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
          <StSearchInput type="text" placeholder="검색" />
          <StSearchIcon />
          <StClearBtn>
            <StCloseCircleIcon />
          </StClearBtn>
        </StSearch>
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

const StSearch = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StSearchInput = styled.input`
  width: 22rem;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 3px;
  background: ${({ theme }) => theme.background};
  padding: 0rem 2.5rem;
  &::placeholder {
    color: ${({ theme }) => theme.darkGray};
    font-weight: 100;
  }
`;

const StSearchIcon = styled(Search)`
  position: absolute;
  width: 1.4rem;
  left: 5.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

const StClearBtn = styled.button`
  position: absolute;
  right: 5rem;
`;

const StCloseCircleIcon = styled(CloseCircle)`
  width: 1.5rem;
  height: 3rem;
  color: ${({ theme }) => theme.darkGray};
`;

export default Header;
