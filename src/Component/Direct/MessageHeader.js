import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { InformationCircle } from '@styled-icons/ionicons-outline/InformationCircle';

const MessageHeader = ({ displayName, photoURL, onClickDetails }) => {
  return (
    <StMessageHeader>
      <ProfileImage
        src={photoURL}
        width={2.5}
        height={2.5}
        marginLeft={1}
        fontSize={1.5}
        username={displayName}
      />
      <StIcons onClick={onClickDetails} />
    </StMessageHeader>
  );
};

const StMessageHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem;
  height: 6.5rem;
  min-height: 6.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

const StIcons = styled(InformationCircle)`
  width: 3rem;
  height: 3rem;
  margin-left: auto;
`;

export default MessageHeader;
