import React, { useEffect, useState } from 'react';
import PostItem from '../../Component/Profile/PostItem';
import { getCommentsByPost } from '../../services/firestore';

const PostItemContainer = ({ post, onClickPostModal }) => {
  const { imagesArray, hearts, id } = post;
  const [comments, setComments] = useState([]);
  const [hover, setHover] = useState(false);
  const onShow = () => setHover(true);
  const onHide = () => setHover(false);

  useEffect(async () => {
    const datas = await getCommentsByPost(id);
    setComments(datas);
  }, []);

  return (
    <PostItem
      imagesArray={imagesArray}
      hover={hover}
      onShow={onShow}
      onHide={onHide}
      heartCount={hearts.length}
      comments={comments?.length}
      onClickPostModal={onClickPostModal}
    />
  );
};

export default PostItemContainer;
