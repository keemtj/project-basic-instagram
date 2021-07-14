import React from 'react';
import styled, { css } from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { calcRecentTime, calcTimeStamp } from '../../lib/calcTime';
import { Trash2 } from '@styled-icons/feather/Trash2';
import { Copy } from '@styled-icons/feather/Copy';

const Message = ({
  uid,
  photoURL,
  msg,
  timeStamp,
  msgUid,
  hover,
  onShow,
  onHide,
  onRemoveMessage,
  onCopyMessage,
}) => {
  return (
    <>
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
          <StChatBubbleWrapper
            onMouseEnter={onShow}
            onMouseLeave={onHide}
            send={msgUid === uid}
          >
            {msgUid === uid && (
              <>
                {hover ? (
                  <StTimeStamp hover={hover} send={msgUid === uid}>
                    <StTrash2 onClick={onRemoveMessage} />
                    <StCopy onClick={() => onCopyMessage(msg)} />
                  </StTimeStamp>
                ) : (
                  <StTimeStamp send={msgUid === uid}>
                    {calcTimeStamp(timeStamp)}
                  </StTimeStamp>
                )}
              </>
            )}
            <StChatBubble send={msgUid === uid}>{msg}</StChatBubble>
            {msgUid !== uid && (
              <>
                {hover ? (
                  <StTimeStamp hover={hover} send={msgUid === uid}>
                    <StCopy onClick={() => onCopyMessage(msg)} />
                  </StTimeStamp>
                ) : (
                  <StTimeStamp send={msgUid === uid}>
                    {calcTimeStamp(timeStamp)}
                  </StTimeStamp>
                )}
              </>
            )}
          </StChatBubbleWrapper>
        </StChatBubbleBox>
      ) : (
        <>
          <StSystemMessage>{msg}</StSystemMessage>
          <StSystemMessage>{calcRecentTime(timeStamp)}</StSystemMessage>
        </>
      )}
    </>
  );
};

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
  word-break: break-all;
`;

const StTimeStamp = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.5rem;
  min-width: 7.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
  ${({ hover, send }) => {
    return hover
      ? send
        ? css`
            justify-content: flex-end;
          `
        : css`
            justify-content: flex-start;
          `
      : send
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: flex-start;
        `;
  }}
`;

const StTrash2 = styled(Trash2)`
  margin-right: 0.5rem;
  width: 2.5rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.black};
  }
`;

const StCopy = styled(Copy)`
  width: 2.5rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.black};
  }
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

export default Message;
