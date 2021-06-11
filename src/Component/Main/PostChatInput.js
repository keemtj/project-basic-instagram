import React from 'react';
import styled from 'styled-components';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';

const PostChatInput = ({ isPossibleComment }) => {
  return (
    <>
      {!isPossibleComment && (
        <StChatCommentLabel>
          <button>
            <StEmojiSmile />
          </button>
          <StCommentInput type="text" placeholder="댓글 달기..." />
          <StCommentButton type="submit">게시</StCommentButton>
        </StChatCommentLabel>
      )}
    </>
  );
};

const StChatCommentLabel = styled.label`
  border-top: 1px solid ${({ theme }) => theme.gray};
  padding: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StEmojiSmile = styled(EmojiSmile)`
  width: 3rem;
`;

const StCommentInput = styled.input`
  border: none;
  background: ${({ theme }) => theme.white};
  margin-left: 1.5rem;
  width: 100%;
  outline: none;
`;

const StCommentButton = styled.button`
  width: 4rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.activeBlue};
`;

export default PostChatInput;
