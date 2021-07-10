import React from 'react';
import styled, { css } from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { calcRecentTime, calcTimeStamp } from '../../lib/calcTime';

const MessageBox = ({ messages, uid, photoURL }) => {
  return (
    <StMessageBox>
      {messages?.map((message, index) => {
        const { msg, timeStamp, uid: msgUid } = message;
        return (
          <div key={index}>
            {msgUid !== 'system' ? (
              <StChatBubbleBox>
                {msgUid !== uid && (
                  <ProfileImage
                    src={photoURL}
                    width={2.5}
                    height={2.5}
                    marginLeft={1}
                  />
                )}
                <StChatBubbleWrapper send={msgUid === uid}>
                  {msgUid === uid && (
                    <StTimeStamp>{calcTimeStamp(timeStamp)}</StTimeStamp>
                  )}
                  <StChatBubble send={msgUid === uid}>{msg}</StChatBubble>
                  {msgUid !== uid && (
                    <StTimeStamp>{calcTimeStamp(timeStamp)}</StTimeStamp>
                  )}
                </StChatBubbleWrapper>
              </StChatBubbleBox>
            ) : (
              <>
                <StSystemMessage>{msg}</StSystemMessage>
                <StSystemMessage>{calcRecentTime(timeStamp)}</StSystemMessage>
              </>
            )}
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

const StChatBubbleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  max-width: 60%;
  ${({ send }) =>
    send &&
    css`
      margin-left: auto;
    `}
`;

const StChatBubble = styled.div`
  border-radius: 1rem;
  background: ${({ send, theme }) => (send ? theme.activeBlue : theme.gray5)};
  color: ${({ send, theme }) => (send ? theme.white : theme.black)};
  width: fit-content;
  padding: 1.5rem;
  font-size: 1.5rem;
  line-height: 1.2;
`;

const StTimeStamp = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.5rem;
  min-width: fit-content;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
`;

const StSystemMessage = styled.div`
  margin: 0.5rem auto;
  padding: 0.5rem 2rem;
  width: fit-content;
  height: auto;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.2;
`;

export default MessageBox;
