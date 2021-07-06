import React from 'react';
import styled from 'styled-components';
import MessageFooterContainer from '../../Container/Direct/MessageFooterContainer';
import MessageHeader from './MessageHeader';
import MessageBox from './MessageBox';

const Messages = ({
  uid,
  id,
  onClickDetails,
  displayName,
  photoURL,
  messages,
}) => {
  return (
    <StMessages>
      <MessageHeader
        onClickDetails={onClickDetails}
        displayName={displayName}
        photoURL={photoURL}
      />
      <MessageBox messages={messages} uid={uid} photoURL={photoURL} />
      <MessageFooterContainer id={id} />
    </StMessages>
  );
};

const StMessages = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`;

export default Messages;
