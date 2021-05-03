import React from 'react';
import PostItem from '../../Component/Profile/PostItem';

const PostItemContainer = ({ post }) => {
  const { imagesArray } = post;

  return <PostItem imagesArray={imagesArray} />;
};

export default PostItemContainer;
