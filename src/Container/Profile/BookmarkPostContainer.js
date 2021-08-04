import React, { useEffect, useRef, useState } from 'react';
import BookmarkPost from '../../Component/Profile/BookmarkPost';
import { useSelector } from 'react-redux';
import { getCommentsByPost, getUserDataByPost } from '../../services/firestore';

const BookmarkPostContainer = ({
  post,
  modalLoading,
  newComments,
  setNewComments,
}) => {
  const inputRef = useRef(null);
  const { activePostId } = useSelector(state => state.posts);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});

  useEffect(async () => {
    const data = await getUserDataByPost(post.uid);
    setUser(data);
  }, [activePostId]);

  useEffect(async () => {
    const datas = await getCommentsByPost(post.id);
    setComments(datas);
    setNewComments([]);
  }, [activePostId]);

  return (
    <BookmarkPost
      modalLoading={modalLoading}
      post={post}
      user={user}
      comments={comments}
      newComments={newComments}
      setNewComments={setNewComments}
      inputRef={inputRef}
    />
  );
};

export default BookmarkPostContainer;
