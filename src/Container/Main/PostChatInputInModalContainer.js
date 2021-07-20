import React, { useRef, useState } from 'react';
import PostChatInput from '../../Component/Main/PostChatInput';
import useToast from '../../Hooks/useToast';
import { addCommentToPost } from '../../services/firestore';

const PostChatInputInModalContainer = ({ post }) => {
  const { isPossibleComment, id, uid } = post;
  const inputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [toast] = useToast();

  const onSubmit = async e => {
    e.preventDefault();
    if (comment.length === 0) return;
    await addCommentToPost(uid, id, comment);
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
      isPossibleComment={isPossibleComment}
      onSubmit={onSubmit}
      onChange={onChange}
      comment={comment}
      onShowEmojiPicker={onShowEmojiPicker}
      onEmojiClick={onEmojiClick}
      isShow={isShow}
      setIsShow={setIsShow}
      inputRef={inputRef}
    />
  );
};

export default PostChatInputInModalContainer;
