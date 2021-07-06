import React, { useRef, useState } from 'react';
import MessageFooter from '../../Component/Direct/MessageFooter';

const MessageFooterContainer = ({ id }) => {
  console.log(id);
  const inputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [isShow, setIsShow] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    console.log('send', comment);
    if (comment.length === 0) return;
    setComment('');
    setIsShow(false);
  };

  const onChange = ({ target }) => {
    setComment(target.value);
  };

  const onShowEmojiPicker = e => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  const onEmojiClick = (e, emojiObject) => {
    setComment(comment + emojiObject.emoji);
    inputRef.current.focus();
  };

  return (
    <MessageFooter
      onShowEmojiPicker={onShowEmojiPicker}
      onEmojiClick={onEmojiClick}
      onSubmit={onSubmit}
      onChange={onChange}
      isShow={isShow}
      inputRef={inputRef}
      comment={comment}
    />
  );
};

export default MessageFooterContainer;
