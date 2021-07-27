import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Heart from '../../Component/Profile/Heart';
import {
  activeIndex,
  activePostIdData,
  activePostsData,
  openPopup,
} from '../../Modules/popup';

const HeartContainer = () => {
  const dispatch = useDispatch();
  const { postModal: postModalState } = useSelector(state => state.popup);
  const { data: profileHeartPosts, loading, error } = useSelector(
    state => state.posts.profileHeartPosts,
  );

  const onClickPostModal = (posts, id, index) => {
    dispatch(openPopup('postModal'));
    dispatch(activePostsData(posts));
    dispatch(activePostIdData(id));
    dispatch(activeIndex(index));
  };

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  if (loading) return <Loading isLoading={loading} />;
  if (error) return <div>에러 발생</div>;
  return (
    <Heart posts={profileHeartPosts} onClickPostModal={onClickPostModal} />
  );
};

export default HeartContainer;
