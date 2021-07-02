import React from 'react';
import styled, { css } from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { InformationCircle } from '@styled-icons/ionicons-outline/InformationCircle';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';
import { calcTimeStamp } from '../../lib/calcTime';

const Messages = ({ uid, onClickDetails, displayName, photoURL, messages }) => {
  return (
    <StChat>
      <StChatHeader>
        <ProfileImage
          src={photoURL}
          width={2.5}
          height={2.5}
          marginLeft={1}
          fontSize={1.5}
          username={displayName}
        />
        <StIcons onClick={onClickDetails} />
      </StChatHeader>
      <StChatBox>
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
      </StChatBox>
      <StChatFooter>
        <StChatLabel>
          <button>
            <StEmojiSmile />
          </button>
          <StChatInput type="text" placeholder="메시지 입력..." />
          <StChatButton type="submit">보내기</StChatButton>
        </StChatLabel>
      </StChatFooter>
    </StChat>
  );
};

const StChat = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`;

const StChatHeader = styled.header`
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

const StChatBox = styled.div`
  display: flex;
  flex-flow: column-reverse nowrap;
  padding: 2rem 2rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const StChatBubbleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`;

const StChatBubble = styled.div`
  border-radius: 3rem;
  background: ${({ theme }) => theme.gray5};
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

const StChatFooter = styled.footer`
  height: 7.5rem;
  padding: 1.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StChatLabel = styled.label`
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5rem;
  margin: 0 auto;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StChatInput = styled.input`
  border: none;
  margin-left: 1.5rem;
  width: 90%;
  outline: none;
`;

const StEmojiSmile = styled(EmojiSmile)`
  width: 2.5rem;
`;

const StChatButton = styled.button`
  width: 5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.activeBlue};
`;

export default Messages;
