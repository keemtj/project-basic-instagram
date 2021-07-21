import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Heart from '../../Component/Profile/Heart';
import { getHeartPosts } from '../../Modules/heart';
import {
  activeIndex,
  activePostIdData,
  activePostsData,
  openPopup,
} from '../../Modules/popup';

const HeartContainer = () => {
  const dispatch = useDispatch();
  const hearts = useSelector(state => state.heart.hearts);
  const { data: posts, loading, error } = useSelector(
    state => state.heart.posts,
  );
  const { postModal: postModalState } = useSelector(state => state.popup);

  const onClickPostModal = (posts, id, index) => {
    dispatch(openPopup('postModal'));
    dispatch(activePostsData(posts));
    dispatch(activePostIdData(id));
    dispatch(activeIndex(index));
  };

  // useEffect(() => {
  //   observeHeart(dispatch, getHearts);
  // }, []);

  useEffect(() => {
    dispatch(getHeartPosts(hearts));
  }, [hearts]);

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  if (loading) return <Loading isLoading={loading} />;
  if (error) return <div>에러 발생</div>;
  return <Heart posts={posts} onClickPostModal={onClickPostModal} />;
};

export default HeartContainer;
