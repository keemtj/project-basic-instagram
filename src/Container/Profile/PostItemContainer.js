import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../../Component/Profile/PostItem';
import { getPostImages } from '../../Modules/images';

const PostItemContainer = ({ post }) => {
  const { uid, id, images } = post;
  const dispatch = useDispatch();
  const { data: myPostsImages, loading, error } = useSelector(
    state => state.images.myPostsImages,
  );

  const sortedImages = () => {
    if (myPostsImages) {
      return [...myPostsImages].sort((a, b) => b.date - a.date);
    }
  };

  const image = sortedImages() && sortedImages().find(value => value.id === id);

  useEffect(() => {
    if (!myPostsImages) dispatch(getPostImages({ uid, id, images }));
  }, []);
  if (loading) return <div>로딩</div>;
  if (error) return <div>에러발생</div>;
  if (!myPostsImages) return <div>이미지 데이터 없음</div>;
  return <PostItem srcs={myPostsImages && image.srcs} alt={images[0]} />;
};

export default PostItemContainer;