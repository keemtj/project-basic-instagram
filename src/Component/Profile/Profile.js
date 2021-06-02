import React from 'react';
import styled from 'styled-components';
import ProfileRouter from '../../Router/ProfileRouter';
import UserContainer from '../../Container/Profile/UserContainer';
import ProfileNavigationContainer from '../../Container/Profile/ProfileNavigationContainer';

const Profile = ({ watchName }) => {
  return (
    <StWrapper>
      <StMain>
        <UserContainer watchName={watchName} />
        <ProfileNavigationContainer watchName={watchName} />
        <ProfileRouter watchName={watchName} />
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
