import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../../Component/Profile/PostItem';
import { getPostImagesToStorage } from '../../Modules/post';

const PostItemContainer = ({ post, index }) => {
  const { uid, id, images } = post;
  const dispatch = useDispatch();

  const state = useSelector(state => state.post);
  const src = state[index]?.data?.srcs?.[0];
  console.log(index);
  React.useEffect(() => {
    dispatch(getPostImagesToStorage({ uid, id, images }));
  }, [uid, id, images]);
  return <PostItem post={post} src={src} alt={images[index]} />;
};

export default PostItemContainer;
