import React from 'react';
import styled from 'styled-components';
import ProfileRouter from '../Router/profileRouter';
import User from './User';
import ProfileNavigation from './ProfileNavigation';

const Profile = () => {
  return (
    <StWrapper>
      <StMain>
        <User />
        <ProfileNavigation />
        <ProfileRouter />
      </StMain>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  flex-grow: 1;
  margin-top: 5.5rem;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
`;

const StMain = styled.main`
  width: 95rem;
`;

export default Profile;
