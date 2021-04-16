import React from 'react';
import styled from 'styled-components';
import ProfileRouter from '../../Router/profileRouter';
import User from './User';
import ProfileNavigation from './ProfileNavigation';

const Profile = () => {
  React.useEffect(() => {
    const username = 'username';
    document.title = `@${username} • Instagram 사진 및 동영상`;
  }, []);
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
