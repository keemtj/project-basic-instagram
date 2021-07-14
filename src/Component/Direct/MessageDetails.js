import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';

const MessageDetails = ({
  displayName,
  photoURL,
  onMoveProfilePage,
  onRemoveDirect,
}) => {
  return (
    <StMessageDetailsBox>
      <StMessageMembers>
        <StMessageMembersTitle>멤버</StMessageMembersTitle>
        <ProfileImage
          src={photoURL}
          width={6}
          height={6}
          marginLeft={1}
          fontSize={1.5}
          username={displayName}
          hover
          onClick={onMoveProfilePage}
        />
      </StMessageMembers>
      <StMessageDelete>
        <StDeleteButton onClick={onRemoveDirect}>채팅 삭제</StDeleteButton>
      </StMessageDelete>
    </StMessageDetailsBox>
  );
};

const StMessageDetailsBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const StMessageMembers = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

const StMessageMembersTitle = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const StMessageDelete = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

const StDeleteButton = styled.button`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.heart};
  &:active {
    color: ${({ theme }) => theme.heartRgb};
  }
  cursor: pointer;
`;

export default MessageDetails;
