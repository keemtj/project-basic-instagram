import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostChatInput from '../../Component/Main/PostChatInput';
import useToast from '../../Hooks/useToast';
import { addCommentToPost } from '../../services/firestore';

const PostChatInputContainer = ({
  post,
  newComments,
  setNewComments,
  inputRef,
}) => {
  const { id } = post;
  const { displayName } = useSelector(state => state.user.currentUser);
  const [text, setText] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [toast] = useToast();

  const onSubmit = async e => {
    e.preventDefault();
    if (text.length === 0) return;
    const date = Date.now();
    await addCommentToPost(id, text, date);
    setNewComments([...newComments, { displayName, text, date }]);
    setText('');
    setIsShow(false);
    toast('댓글 작성이 완료되었습니다.');
  };

  const onChange = ({ target }) => {
    setText(target.value);
  };

  const onShowEmojiPicker = () => {
    setIsShow(!isShow);
  };

  const onEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
    inputRef.current.focus();
  };

  return (
    <PostChatInput
      onSubmit={onSubmit}
      onChange={onChange}
      text={text}
      onShowEmojiPicker={onShowEmojiPicker}
      onEmojiClick={onEmojiClick}
      isShow={isShow}
      inputRef={inputRef}
    />
  );
};

export default PostChatInputContainer;
