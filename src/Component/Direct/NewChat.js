import React from 'react';
import styled from 'styled-components';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';

const NewChat = () => {
  return (
    <StNewChat>
      <StIconWrapper>
        <StIcon />
      </StIconWrapper>
      <StTitle>내 메시지</StTitle>
      <StText>친구나 그룹에 비공개 사진과 메시지를 보내보세요.</StText>
      <StNewChatButton>메시지 보내기</StNewChatButton>
    </StNewChat>
  );
};

const StNewChat = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > div + div {
    margin-top: 1rem;
  }
`;

const StIconWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border: 3px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StIcon = styled(PaperPlane)`
  width: 4rem;
  height: 4rem;
`;

const StTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 200;
`;

const StText = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const StNewChatButton = styled.button`
  border-radius: 4px;
  background: #0098fa;
  margin-top: 2.5rem;
  padding: 0.8rem 1rem;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

export default NewChat;
