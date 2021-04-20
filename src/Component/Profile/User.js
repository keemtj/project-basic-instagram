import React from 'react';
import styled from 'styled-components';
import { Settings } from '@styled-icons/ionicons-sharp/Settings';
import { Settings as FilledSettings } from '@styled-icons/ionicons-outline/Settings';

const User = ({
  photoURL,
  username,
  presentation,
  displayName,
  followersCount,
  followingCount,
  postsCount,
  onClickSettings,
  settings,
}) => {
  return (
    <StUser>
      <StImageWrapper>
        <StImage src={photoURL} alt={displayName} />
      </StImageWrapper>
      <StDetail>
        <StIdBox>
          <StId>{displayName}</StId>
          <StEditBtn>프로필 편집</StEditBtn>
          <StSettingsBtn onClick={onClickSettings}>
            {settings ? <Settings /> : <FilledSettings />}
          </StSettingsBtn>
        </StIdBox>
        <StFollowBox>
          <li>
            게시물 <StNumber>{postsCount}</StNumber>
          </li>
          <li>
            팔로워 <StNumber>{followersCount}</StNumber>
          </li>
          <li>
            팔로우 <StNumber>{followingCount}</StNumber>
          </li>
        </StFollowBox>
        <div>{username}</div>
        <div>{presentation}</div>
      </StDetail>
    </StUser>
  );
};

const StUser = styled.section`
  display: flex;
  align-items: center;
  height: 22.5rem;
  & > div + div {
    margin-left: 3rem;
  }
`;

const StImageWrapper = styled.div`
  width: 30rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StImage = styled.img`
  display: inline-block;
  width: 15rem;
  height: 15rem;
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
`;

const StDetail = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  height: 15rem;
`;

const StIdBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
`;

const StEditBtn = styled.button`
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-left: 2rem;
  width: fit-content;
  height: 100%;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
`;

const StSettingsBtn = styled.button`
  width: 2rem;
  height: 100%;
  margin-left: 0.5rem;
  cursor: pointer;
  outline: none;
`;

const StId = styled.div`
  font-size: 2.7rem;
  font-weight: 300;
`;

const StFollowBox = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 2.6rem;
  font-size: 1.6rem;

  & > li + li {
    margin-left: 4rem;
  }
`;

const StNumber = styled.span`
  font-weight: 600;
`;
export default User;
