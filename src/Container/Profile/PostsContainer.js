import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../../Component/Profile/Posts';
import EmptyPosts from '../../Component/Profile/EmptyPosts';
import { getPosts } from '../../Modules/posts';
import { firebaseAuth } from '../../services/firebase';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const { data: myPosts, loading, error } = useSelector(
    state => state.posts.myPosts,
  );

  const sortedPosts = () => {
    if (myPosts) {
      return [...myPosts].sort((a, b) => b.date - a.date);
    }
  };

  useEffect(() => {
    if (!myPosts) {
      const { uid } = firebaseAuth.currentUser;
      dispatch(getPosts(uid));
    }
  }, []);

  if (loading) return <div>Posts Container 로딩중</div>;
  if (error) return <div>Posts Container 에러발생</div>;
  if (!myPosts) return <EmptyPosts />;
  return <Posts myPosts={sortedPosts()} />;
};

export default PostsContainer;
