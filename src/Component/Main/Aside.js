import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { firebaseAuth } from '../../services/firebase';

const Aside = ({ setSignin }) => {
  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      setSignin(false);
      console.log('sign out');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <StAside>
      <StProfileImageWrapper>
        <ProfileImage
          src="/images/default_profile.png"
          width={5}
          height={5}
          username={'username'}
        />
        <button onClick={handleLogout}>로그아웃</button>
      </StProfileImageWrapper>
      <div>
        <img />
        <div>followers username</div>
        <button>팔로우</button>
        <img />
        <div>followers username</div>
        <button>팔로우</button>
        <img />
        <div>followers username</div>
        <button>팔로우</button>
        <img />
        <div>followers username</div>
        <button>팔로우</button>
        <img />
        <div>followers username</div>
        <button>팔로우</button>
      </div>
    </StAside>
  );
};

const StAside = styled.aside`
  border: 1px solid orange;
`;

const StProfileImageWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export default Aside;
