import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import MainNavigation from './MainNavigation';
import { Search } from '@styled-icons/ionicons-outline/Search';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import NewPost from '../New/NewPost';

const Header = () => {
  const [modalState, setModalState] = useState(false);
  // const [scrollY, setScrollY] = useState(0);

  const openModal = () => {
    console.log('open new post!');
    // setScrollY(window.scrollY);
    setModalState(!modalState);
  };

  const closeModal = () => {
    console.log('close new post!');
    setModalState(!modalState);
  };

  // const handleScroll = () => {
  //   // window.scrollTo(0, scrollY);
  //   window.scrollTo(0, 0);
  // };

  useEffect(() => {
    document.body.style.overflow = modalState ? 'hidden' : 'auto';
    // modalState && window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener('scroll', handleScroll);
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
        <MainNavigation openModal={openModal} />
      </StHeader>
      {modalState && <NewPost closeModal={closeModal} />}
    </StWrapper>
  );
};

const StWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 5.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
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
