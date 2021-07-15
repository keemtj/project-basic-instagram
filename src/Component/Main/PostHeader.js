import React from 'react';
import styled from 'styled-components';
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots';
import ProfileImage from '../Global/ProfileImage';

const PostHeader = ({
  photoURL,
  displayName,
  location,
  onMoveProfilePage,
  onClickSetting,
}) => {
  return (
    <StHeader>
      <ProfileImage
        src={photoURL}
        alt={displayName}
        width={3.5}
        height={3.5}
        onClick={onMoveProfilePage}
      >
        <div>
          <StDisplayName onClick={onMoveProfilePage}>
            {displayName}
          </StDisplayName>
          {location && <StLocation>{location}</StLocation>}
        </div>
      </ProfileImage>
      <StSettingButton onClick={onClickSetting}>
        <StSettingIcon />
      </StSettingButton>
    </StHeader>
  );
};

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  padding: 1rem 1.5rem;
  width: 100%;
  height: 5.5rem;
  & > div {
    display: flex;
    align-items: center;
    & > div {
      margin-left: 1rem;
    }
  }
  font-size: 1.4rem;
  font-weight: 600;
`;

const StDisplayName = styled.h2`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StLocation = styled.div`
  margin-top: 0.3rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
`;

const StSettingButton = styled.button`
  cursor: pointer;
`;

const StSettingIcon = styled(ThreeDots)`
  width: 2rem;
  height: 2rem;
`;

export default PostHeader;
