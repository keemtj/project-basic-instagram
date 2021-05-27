import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Home } from '@styled-icons/ionicons-outline/Home';
import { Home as HomeFilled } from '@styled-icons/ionicons-solid/Home';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { PaperPlane as PaperPlaneFilled } from '@styled-icons/ionicons-solid/PaperPlane';
import { AddCircle } from '@styled-icons/ionicons-outline/AddCircle';
import { AddCircle as AddCircleFilled } from '@styled-icons/ionicons-sharp/AddCircle';
// import { Heart } from '@styled-icons/ionicons-outline/Heart';
import PopupContainer from '../../Container/Global/PopupContainer';

const MainNavigation = ({
  photoURL,
  displayName,
  onPopup,
  openModal,
  profilePopup,
  newPostModal,
  path,
}) => {
  return (
    <StMainNavigation>
      <ul>
        <li>
          <NavLink to="/" exact>
            <StIcon>
              {path === '/' && !profilePopup && !newPostModal ? (
                <HomeFilled />
              ) : (
                <Home />
              )}
            </StIcon>
          </NavLink>
        </li>
        <li>
          <NavLink to="/direct">
            <StIcon>
              {path === '/direct' && !profilePopup && !newPostModal ? (
                <PaperPlaneFilled />
              ) : (
                <PaperPlane />
              )}
            </StIcon>
          </NavLink>
        </li>
        <li>
          <StNewPostButton onClick={openModal}>
            <StIcon>
              {newPostModal ? <AddCircleFilled /> : <AddCircle />}
            </StIcon>
          </StNewPostButton>
        </li>
        <li
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={onPopup}
        >
          <StProfile
            active={
              profilePopup ||
              path === `/${displayName}` ||
              path === `/${displayName}/saved` ||
              path === `/${displayName}/heart`
            }
          >
            <StProfileImage src={photoURL} alt={displayName} />
          </StProfile>
        </li>
      </ul>
      {profilePopup && <PopupContainer />}
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
      color: ${({ theme }) => theme.black};
    }
  }
`;

const StNewPostButton = styled.button`
  cursor: pointer;
`;

const StIcon = styled.div`
  width: 2.6rem;
  height: 2.6rem;
`;

const StProfile = styled.div`
  /* true면 black false면 white */
  border: 1px solid
    ${({ active, theme }) => (active ? theme.black : theme.white)};
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StProfileImage = styled.img`
  border: 2px solid ${({ theme }) => theme.white};
  border-radius: 50%;
  width: 2.6rem;
  height: 2.6rem;
  object-fit: cover;
`;

export default MainNavigation;
