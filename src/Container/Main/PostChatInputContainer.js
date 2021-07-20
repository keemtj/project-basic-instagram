import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PostChatInput from '../../Component/Main/PostChatInput';
import useToast from '../../Hooks/useToast';
import { updateMainPosts } from '../../Modules/posts';
import { addCommentToPost, updatePostsData } from '../../services/firestore';

const PostChatInputContainer = ({ isPossibleComment, uid, id }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [toast] = useToast();

  const onSubmit = async e => {
    e.preventDefault();
    if (comment.length === 0) return;
    await addCommentToPost(uid, id, comment);
    await updatePostsData(dispatch, updateMainPosts);
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

export default PostChatInputContainer;
