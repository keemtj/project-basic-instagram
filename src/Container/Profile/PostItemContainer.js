import React, { useState } from 'react';
import PostItem from '../../Component/Profile/PostItem';

const PostItemContainer = ({ post, onClickPostModal }) => {
  const { imagesArray, heartCount, comments } = post;
  const [hover, setHover] = useState(false);
  const onShow = () => setHover(true);
  const onHide = () => setHover(false);

  return (
    <PostItem
      imagesArray={imagesArray}
      hover={hover}
      onShow={onShow}
      onHide={onHide}
      heartCount={heartCount}
      comments={comments.length}
      onClickPostModal={onClickPostModal}
    />
  );
};

export default PostItemContainer;
