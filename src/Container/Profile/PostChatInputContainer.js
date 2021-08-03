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
  const [comment, setComment] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [toast] = useToast();

  const onSubmit = async e => {
    e.preventDefault();
    if (comment.length === 0) return;
    const date = Date.now();
    await addCommentToPost(id, comment, date);
    setNewComments([...newComments, { displayName, comment, date }]);
    setComment('');
    setIsShow(false);
    toast('댓글 작성이 완료되었습니다.');
  };

  const onChange = ({ target }) => {
    setComment(target.value);
  };

  const onShowEmojiPicker = () => {
    setIsShow(!isShow);
  };

  const onEmojiClick = (e, emojiObject) => {
    setComment(comment + emojiObject.emoji);
    inputRef.current.focus();
  };

  return (
    <PostChatInput
      onSubmit={onSubmit}
      onChange={onChange}
      comment={comment}
      onShowEmojiPicker={onShowEmojiPicker}
      onEmojiClick={onEmojiClick}
      isShow={isShow}
      inputRef={inputRef}
    />
  );
};

export default PostChatInputContainer;
