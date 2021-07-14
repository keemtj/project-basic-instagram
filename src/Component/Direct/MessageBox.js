import React from 'react';
import styled from 'styled-components';
import MessageContainer from '../../Container/Direct/MessageContainer';

const MessageBox = ({ messages, uid, photoURL }) => {
  return (
    <StMessageBox>
      {messages?.map((message, index, arr) => (
        <MessageContainer
          message={message}
          key={index}
          uid={uid}
          photoURL={photoURL}
          latestMessageId={arr[0]?.id}
          secondMessageId={arr[1]?.id}
          secondMessage={arr[1]?.msg}
          secondMessageTimeStamp={arr[1]?.timeStamp}
        />
      ))}
    </StMessageBox>
  );
};

const StMessageBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column-reverse nowrap;
  padding: 2rem 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

export default MessageBox;
