import React, { useState } from 'react';
import PostChatInput from '../../Component/Main/PostChatInput';
import { addCommentToPost } from '../../services/firestore';

const PostChatInputContainer = ({ isPossibleComment, uid, id }) => {
  const [comment, setComment] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    if (comment.length === 0) return;
    await addCommentToPost(uid, id, comment);
    setComment('');
  };

  const onChange = ({ target }) => {
    setComment(target.value);
  };

  return (
    <PostChatInput
      isPossibleComment={isPossibleComment}
      onSubmit={onSubmit}
      onChange={onChange}
      comment={comment}
    />
  );
};

export default PostChatInputContainer;
