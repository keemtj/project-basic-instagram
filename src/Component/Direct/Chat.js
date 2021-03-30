import React from 'react';
import styled, { css } from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { InformationCircle } from '@styled-icons/ionicons-outline/InformationCircle';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';

const Chat = () => {
  const chats = [
    { dm: '1message', send: true },
    { dm: '2test', send: false },
    { dm: '3dmdm', send: true },
    { dm: '4hi', send: true },
    { dm: '5hello', send: false },
    { dm: '6insta', send: false },
    { dm: '7how are you', send: true },
    { dm: '8im fine', send: false },
    { dm: '9whats going on', send: false },
    { dm: '10nothing', send: true },
    { dm: '11yeah see you soon', send: false },
    { dm: '12abcd', send: false },
    { dm: '13efg', send: false },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
    { dm: '12ok bye', send: true },
  ];
  return (
    <StChat>
      <StChatHeader>
        <ProfileImage
          src="/images/default_profile.png"
          width={2.5}
          height={2.5}
          marginLeft={1}
          fontSize={1.8}
          username={'username'}
        />
        <StIcons />
      </StChatHeader>
      <StChatBox>
        {chats.reverse().map((chat, index) => (
          <StChatBubble key={index} send={chat.send}>
            {chat.dm}
          </StChatBubble>
        ))}
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
  padding: 0rem 2rem;
  height: 5.5rem;
  min-height: 5.5rem;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
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

const StChatBubble = styled.div`
  border-radius: 3rem;
  background: rgba(219, 219, 219, 0.5);
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

const StChatFooter = styled.footer`
  height: 7.5rem;
  padding: 1.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StChatLabel = styled.label`
  border: 1px solid rgba(219, 219, 219, 1);
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
  color: #0095f6;
`;

export default Chat;
