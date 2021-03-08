import React from 'react';
import styled from 'styled-components';
import InfoRouter from '../Router/infoRouter';
import Profile from './Profile';
import SubNavigation from './SubNavigation';

const User = () => {
  return (
    <StWrapper>
      <StMain>
        <Profile />
        <SubNavigation />
        {/* <section>하단 섹션(sub route section)</section> */}
        <InfoRouter />
      </StMain>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  flex-grow: 1;
  margin-top: 5rem;
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

export default User;
