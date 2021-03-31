import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { firebaseAuth } from '../../services/firebase';
import { useHistory } from 'react-router';

const Aside = () => {
  const { push } = useHistory();
  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      push('/login');
      console.log('sign out');
    } catch (e) {
      console.log(e.message);
    }
  };

  const followedMe = [
    'username2',
    'username3',
    'username4',
    'username5',
    'username6',
    'username7',
    'username8',
  ];

  return (
    <StAside>
      <StProfileImageWrapper>
        <ProfileImage
          src="/images/default_profile.png"
          width={5.5}
          height={5.5}
          marginLeft={1.2}
          fontSize={1.4}
          username={'username'}
        />
        <StButton onClick={handleLogout}>로그아웃</StButton>
      </StProfileImageWrapper>
      <StRecommendTitle>회원님을 위한 추천</StRecommendTitle>
      <StRecommend>
        {followedMe.slice(0, 5).map((username, index) => (
          <StProfileImageWrapper key={index}>
            <ProfileImage
              username={username}
              width={3.5}
              height={3.5}
              marginLeft={1.2}
              fontSize={1.4}
              src="/images/default_profile.png"
            />
            <StButton>팔로우</StButton>
          </StProfileImageWrapper>
        ))}
      </StRecommend>
    </StAside>
  );
};

const StAside = styled.aside`
  padding: 1.5rem 0rem;
`;

const StProfileImageWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  & + & {
    margin-top: 0.8rem;
  }
`;

const StButton = styled.button`
  color: #0092f5;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
`;

const StRecommendTitle = styled.div`
  margin-top: 1.5rem;
  color: #828282;
  font-size: 1.35rem;
  font-weight: 600;
`;

const StRecommend = styled.div`
  margin-top: 1rem;
`;

export default Aside;
