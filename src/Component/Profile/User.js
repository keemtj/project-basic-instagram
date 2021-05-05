import React from 'react';
import styled, { css } from 'styled-components';
import { Settings } from '@styled-icons/ionicons-sharp/Settings';
import { Settings as FilledSettings } from '@styled-icons/ionicons-outline/Settings';
import { User as UserIcon } from '@styled-icons/boxicons-regular/User';
import { Check as CheckIcon } from '@styled-icons/boxicons-regular/Check';

const User = ({
  isFollowing,
  currentDisplayName,
  photoURL,
  username,
  presentation,
  displayName,
  postsCount,
  followersCount,
  followingCount,
  onEditProfile,
  onToggleFollow,
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
          {displayName === currentDisplayName ? (
            <>
              <StEditBtn onClick={onEditProfile}>프로필 편집</StEditBtn>
              <StSettingsBtn onClick={onClickSettings}>
                {settings ? <Settings /> : <FilledSettings />}
              </StSettingsBtn>
            </>
          ) : isFollowing ? (
            <StFollowBtn onClick={onToggleFollow} isFollowing={isFollowing}>
              <StUserIcon /> <StCheckIcon />
            </StFollowBtn>
          ) : (
            <StFollowBtn onClick={onToggleFollow} isFollowing={isFollowing}>
              팔로우하기
            </StFollowBtn>
          )}
        </StIdBox>
        <StFollowBox>
          <li>
            게시물 <StNumber>{postsCount || '0'}</StNumber>
          </li>
          <li>
            팔로워 <StNumber>{followersCount || '0'}</StNumber>
          </li>
          <li>
            팔로우 <StNumber>{followingCount || '0'}</StNumber>
          </li>
        </StFollowBox>
        <StUsername>{username}</StUsername>
        <StPresentation>
          <div>
            {presentation
              ? presentation
              : '프로필 편집 > 소개 문구를 작성해보세요.'}
          </div>
        </StPresentation>
        {/* {displayName !== currentDisplayName && (
          <StFollower>
            <span>{follower}</span>님이 팔로우합니다.
          </StFollower>
        )} */}
      </StDetail>
    </StUser>
  );
};

const StUser = styled.section`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  min-height: 15rem;
  height: auto;
  & > div + div {
    margin-left: 3rem;
  }
  margin: 3rem 0rem;
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
  justify-content: flex-start;
  height: 15rem;
  height: auto;
`;

const StIdBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
`;

const buttonCommonStyle = css`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-left: 2rem;
  width: fit-content;
  height: 100%;
  min-height: 2.9rem;
  border-radius: 4px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
`;

const StEditBtn = styled.button`
  ${buttonCommonStyle};
  border: 1px solid rgba(219, 219, 219, 1);
  background: none;
  color: ${({ theme }) => theme.black};
`;

const StFollowBtn = styled.button`
  ${buttonCommonStyle};
  ${({ isFollowing }) =>
    isFollowing
      ? css`
          border: 1px solid rgba(219, 219, 219, 1);
          background: none;
          color: ${({ theme }) => theme.black};
        `
      : css`
          border: none;
          background: ${({ theme }) => theme.activeBlue};
          color: ${({ theme }) => theme.white};
        `}
`;

const StUserIcon = styled(UserIcon)`
  width: 1.5rem;
  height: 100%;
`;

const StCheckIcon = styled(CheckIcon)`
  width: 1.5rem;
  height: 100%;
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

const StUsername = styled.div`
  margin-top: 1.5rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const StPresentation = styled.div`
  margin-top: 0.8rem;
  font-size: 1.5rem;
  line-height: 1.5;
`;

// const StFollower = styled.div`
//   margin-top: 1.2rem;
//   color: ${({ theme }) => theme.darkGray};
//   font-size: 1.1rem;
//   & > span {
//     color: ${({ theme }) => theme.black};
//     font-weight: 600;
//   }
// `;

const StNumber = styled.span`
  font-weight: 600;
`;

export default User;
