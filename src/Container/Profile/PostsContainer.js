import React from 'react';
import { useSelector } from 'react-redux';
import Posts from '../../Component/Profile/Posts';

const PostsContainer = () => {
  const { data: myPosts, loading, error } = useSelector(
    state => state.posts.myPosts,
  );
  const { data: images } = useSelector(state => state.images.myPostsImages);

  const sortedPosts = () => {
    if (myPosts) {
      return [...myPosts].sort((a, b) => b.date - a.date);
    }
  };
  const sortedImages = () => {
    if (images) {
      return [...images].sort((a, b) => b.date - a.date);
    }
  };

  return (
    <Posts
      myPosts={sortedPosts()}
      loading={loading}
      error={error}
      images={sortedImages()}
    />
  );
};

export default PostsContainer;
