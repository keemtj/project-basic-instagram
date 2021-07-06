import React from 'react';
import styled, { css } from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { calcTimeStamp } from '../../lib/calcTime';

const MessageBox = ({ messages, uid, photoURL }) => {
  return (
    <StMessageBox>
      {messages?.map((message, index) => {
        const { msg, timeStamp, uid: msgUid } = message;
        return (
          <div key={index}>
            <StTimeStamp>{calcTimeStamp(timeStamp)}</StTimeStamp>
            <StChatBubbleBox>
              {msgUid !== uid && (
                <ProfileImage
                  src={photoURL}
                  width={2.5}
                  height={2.5}
                  marginLeft={1}
                />
              )}
              <StChatBubble send={msgUid === uid}>{msg}</StChatBubble>
            </StChatBubbleBox>
          </div>
        );
      })}
    </StMessageBox>
  );
};

const StMessageBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column-reverse nowrap;
  padding: 2rem 2rem;
  overflow-y: scroll;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

const StChatBubbleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`;

const StChatBubble = styled.div`
  border-radius: 3rem;
  background: ${({ send, theme }) => (send ? theme.activeBlue : theme.gray5)};
  color: ${({ send, theme }) => (send ? theme.white : theme.black)};
  width: fit-content;
  padding: 1.5rem;
  ${({ send }) =>
    send &&
    css`
      margin-left: auto;
    `}
  font-size: 1.5rem;
  margin-top: 1rem;
`;

const StTimeStamp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
`;

export default MessageBox;
