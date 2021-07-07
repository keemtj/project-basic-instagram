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
  onKeyPress,
  onClickInput,
}) => {
  return (
    <StMessageFooter>
      {isShow && <Emoji onEmojiClick={onEmojiClick} direct />}
      <StMessageInputWrapper>
        <StMessageLabel onKeyPress={onKeyPress}>
          <StEmojiPickerButton onClick={onShowEmojiPicker}>
            <StEmojiSmile />
          </StEmojiPickerButton>
          <StMessageInput
            ref={inputRef}
            type="text"
            placeholder="메시지 입력..."
            value={comment}
            onChange={onChange}
            onClick={onClickInput}
          />
          <StMessageSendButton
            type="button"
            comment={comment}
            onClick={onSubmit}
          >
            보내기
          </StMessageSendButton>
        </StMessageLabel>
      </StMessageInputWrapper>
    </StMessageFooter>
  );
};

const StMessageFooter = styled.footer`
  width: 100%;
  height: 6.5rem;
  min-height: 6.5rem;
  /* padding: 0rem 2rem; */
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  position: relative; /* Emoji Picker */
`;

const StMessageInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 2rem;
`;

const StMessageLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StEmojiPickerButton = styled.button`
  cursor: pointer;
  padding: 2rem 1.5rem;
`;

const StEmojiSmile = styled(EmojiSmile)`
  width: 2.5rem;
`;

const StMessageInput = styled.input`
  border: none;
  width: 90%;
  height: 100%;
  outline: none;
`;

const StMessageSendButton = styled.button`
  min-width: 5rem;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme, comment }) =>
    comment.length > 0 ? theme.activeBlue : theme.inactiveBlue};
  cursor: ${({ comment }) => (comment.length > 0 ? 'pointer' : 'default')};
`;

export default MessageFooter;
