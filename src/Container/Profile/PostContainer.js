import React, { useEffect, useRef, useState } from 'react';
import Post from '../../Component/Profile/Post';
import { useSelector } from 'react-redux';
import { getCommentsByPost } from '../../services/firestore';

const PostContainer = ({ post, modalLoading, newComments, setNewComments }) => {
  const inputRef = useRef(null);
  const [comments, setComments] = useState([]);
  const { activePostId } = useSelector(state => state.posts);

  useEffect(async () => {
    const datas = await getCommentsByPost(post.id);
    setComments(datas);
    setNewComments([]);
  }, [activePostId]);

  return (
    <Post
      modalLoading={modalLoading}
      post={post}
      comments={comments}
      newComments={newComments}
      setNewComments={setNewComments}
      inputRef={inputRef}
    />
  );
};

export default PostContainer;
