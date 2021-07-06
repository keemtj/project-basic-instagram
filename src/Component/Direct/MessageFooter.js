import React from 'react';
import styled from 'styled-components';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';
import Emoji from '../Global/Emoji';

const MessageFooter = ({
  onSubmit,
  onChange,
  comment,
  onShowEmojiPicker,
  onEmojiClick,
  isShow,
  inputRef,
}) => {
  return (
    <StMessageFooter>
      {isShow && <Emoji onEmojiClick={onEmojiClick} direct />}
      <StForm onSubmit={onSubmit}>
        <StMessageLabel onKeyPress={e => console.log(e.key)}>
          <StEmojiPickerButton onClick={onShowEmojiPicker}>
            <StEmojiSmile />
          </StEmojiPickerButton>
          <StMessageInput
            ref={inputRef}
            type="text"
            placeholder="메시지 입력..."
            value={comment}
            onChange={onChange}
          />
          <StMessageSendButton type="submit" comment={comment}>
            보내기
          </StMessageSendButton>
        </StMessageLabel>
      </StForm>
    </StMessageFooter>
  );
};

const StMessageFooter = styled.footer`
  width: 100%;
  height: 6.5rem;
  min-height: 6.5rem;
  padding: 0rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  position: relative; /* Emoji Picker */
  border: 1px solid red;
`;

const StForm = styled.form`
  width: 100%;
  height: 100%;
`;

const StMessageLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StEmojiPickerButton = styled.button`
  border: 1px solid red;
  cursor: pointer;
`;

const StEmojiSmile = styled(EmojiSmile)`
  width: 2.5rem;
`;

const StMessageInput = styled.input`
  border: none;
  margin-left: 1.5rem;
  width: 90%;
  height: 100%;
  outline: none;
  border: 1px solid blue;
`;

const StMessageSendButton = styled.button`
  width: 5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme, comment }) =>
    comment.length > 0 ? theme.activeBlue : theme.inactiveBlue};
  cursor: ${({ comment }) => (comment.length > 0 ? 'pointer' : 'default')};
  border: 1px solid green;
  height: 100%;
`;

export default MessageFooter;
