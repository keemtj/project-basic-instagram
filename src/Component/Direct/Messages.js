import React from 'react';
import styled from 'styled-components';
import MessageFooterContainer from '../../Container/Direct/MessageFooterContainer';
import MessageHeader from './MessageHeader';
import MessageBox from './MessageBox';
import MessageDetails from './MessageDetails';

const Messages = ({
  uid,
  id,
  onClickDetails,
  displayName,
  photoURL,
  messages,
  directDetailsState,
  onMoveProfilePage,
  onRemoveDirect,
}) => {
  return (
    <StMessages>
      <MessageHeader
        directDetailsState={directDetailsState}
        onClickDetails={onClickDetails}
        displayName={displayName}
        photoURL={photoURL}
      />
      {directDetailsState ? (
        <MessageDetails
          displayName={displayName}
          photoURL={photoURL}
          onMoveProfilePage={onMoveProfilePage}
          onRemoveDirect={onRemoveDirect}
        />
      ) : (
        <>
          <MessageBox messages={messages} uid={uid} photoURL={photoURL} />
          <MessageFooterContainer uid={uid} id={id} />
        </>
      )}
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
