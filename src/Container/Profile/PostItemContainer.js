import React from 'react';
import PostItem from '../../Component/Profile/PostItem';

const PostItemContainer = ({ post, image }) => {
  const { images } = post;
  return <PostItem src={image?.srcs} alt={images} />;
};

export default PostItemContainer;
