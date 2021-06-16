import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import Loading from '../Global/Loading';

const Aside = ({
  handleSignOut,
  displayName,
  photoURL,
  followed,
  loading,
  onFollow,
}) => {
  return (
    <StAside>
      <StProfileImageWrapper>
        <ProfileImage
          src={photoURL}
          alt={displayName}
          width={5.5}
          height={5.5}
          marginLeft={1.2}
          fontSize={1.4}
          username={displayName}
        />
        <StButton onClick={handleSignOut}>로그아웃</StButton>
      </StProfileImageWrapper>
      {loading ? (
        <Loading isLoading={loading} />
      ) : (
        <>
          {followed?.length > 0 && (
            <StRecommendTitle>회원님을 위한 추천</StRecommendTitle>
          )}
          <StRecommend>
            {followed?.slice(0, 5)?.map((user, index) => (
              <StProfileImageWrapper key={index}>
                <ProfileImage
                  username={user.displayName}
                  width={3.5}
                  height={3.5}
                  marginLeft={1.2}
                  fontSize={1.4}
                  src={user.photoURL}
                />
                <StButton onClick={() => onFollow(user.uid, user.displayName)}>
                  팔로우
                </StButton>
              </StProfileImageWrapper>
            ))}
          </StRecommend>
        </>
      )}
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
  color: ${({ theme }) => theme.activeBlue};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
`;

const StRecommendTitle = styled.div`
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.35rem;
  font-weight: 600;
`;

const StRecommend = styled.div`
  margin-top: 1rem;
`;

export default Aside;
