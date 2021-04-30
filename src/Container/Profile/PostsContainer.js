import React from 'react';
import { useSelector } from 'react-redux';
import Posts from '../../Component/Profile/Posts';

const PostsContainer = () => {
  const { data: myPosts, loading, error } = useSelector(
    state => state.main.myPosts,
  );

  const sortedPosts = () => {
    if (myPosts) {
      return [...myPosts].sort((a, b) => b.date - a.date);
    }
  };

  return <Posts myPosts={sortedPosts()} loading={loading} error={error} />;
};

export default PostsContainer;
