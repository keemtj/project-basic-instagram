import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageFooter from '../../Component/Direct/MessageFooter';
import { clearDirectText, directText, emojiText } from '../../Modules/direct';
import { firestore } from '../../services/firebase';
import { generatedId } from '../../services/firestore';

const MessageFooterContainer = ({ uid, id }) => {
  const dispatch = useDispatch();
  const { text: comment } = useSelector(state => state.direct);
  const inputRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const onSubmit = async () => {
    console.log('send', comment);
    if (comment.length === 0) return;
    const msgId = generatedId();
    const timeStamp = Date.now();
    await firestore
      .collection('direct')
      .doc(id)
      .collection('messages')
      .doc(msgId)
      .set({
        id: msgId,
        msg: comment,
        uid,
        timeStamp,
      });
    await firestore.collection('direct').doc(id).update({
      timeStamp,
      msg: comment,
    });
    console.log('Send Message');
    dispatch(clearDirectText());
    setIsShow(false);
  };

  const onChange = ({ target }) => {
    dispatch(directText(target.value));
  };

  const onClickInput = () => {
    setIsShow(false);
  };

  const onShowEmojiPicker = e => {
    e.preventDefault();
    setIsShow(!isShow);
  };

  const onEmojiClick = (e, emojiObject) => {
    dispatch(emojiText(emojiObject.emoji));
    inputRef.current.focus();
  };

  const onKeyPress = e => {
    if (e.key !== 'Enter') return;
    onSubmit();
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
      onKeyPress={onKeyPress}
      onClickInput={onClickInput}
    />
  );
};

export default MessageFooterContainer;
