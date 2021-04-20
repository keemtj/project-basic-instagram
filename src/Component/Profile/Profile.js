import React from 'react';
import styled from 'styled-components';
import ProfileRouter from '../../Router/profileRouter';
import UserContainer from '../../Container/Profile/UserContainer';
import ProfileNavigation from './ProfileNavigation';

const Profile = ({ displayName }) => {
  return (
    <StWrapper>
      <StMain>
        <UserContainer />
        <ProfileNavigation displayName={displayName} />
        <ProfileRouter displayName={displayName} />
      </StMain>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  flex-grow: 1;
  margin-top: 5.5rem;
  width: 100%;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
`;

const StMain = styled.main`
  width: 95rem;
`;

export default Profile;
