import React, { useState } from 'react';
import PostItem from '../../Component/Profile/PostItem';

const PostItemContainer = ({ post, onClickPostModal }) => {
  const { imagesArray, hearts, comments } = post;
  const [hover, setHover] = useState(false);
  const onShow = () => setHover(true);
  const onHide = () => setHover(false);

  return (
    <PostItem
      imagesArray={imagesArray}
      hover={hover}
      onShow={onShow}
      onHide={onHide}
      heartCount={hearts.length}
      comments={comments.length}
      onClickPostModal={onClickPostModal}
    />
  );
};

export default PostItemContainer;
