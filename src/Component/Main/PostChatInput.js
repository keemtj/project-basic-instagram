import React from 'react';
import styled from 'styled-components';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';
import Emoji from '../Global/Emoji';

const PostChatInput = ({
  isPossibleComment,
  onSubmit,
  onChange,
  comment,
  onShowEmojiPicker,
  onEmojiClick,
  isShow,
  inputRef,
}) => {
  return (
    <>
      {!isPossibleComment && (
        <>
          {isShow && <Emoji onEmojiClick={onEmojiClick} />}
          <form onSubmit={onSubmit}>
            <StChatCommentLabel>
              <StEmojiPickerButton onClick={onShowEmojiPicker}>
                <StEmojiSmile />
              </StEmojiPickerButton>
              <StCommentInput
                ref={inputRef}
                type="text"
                placeholder="댓글 달기..."
                value={comment}
                onChange={onChange}
              />
              <StCommentButton type="submit" comment={comment}>
                게시
              </StCommentButton>
            </StChatCommentLabel>
          </form>
        </>
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

const StEmojiPickerButton = styled.div`
  cursor: pointer;
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
  color: ${({ theme, comment }) =>
    comment.length > 0 ? theme.activeBlue : theme.inactiveBlue};
  cursor: pointer;
`;

export default PostChatInput;
