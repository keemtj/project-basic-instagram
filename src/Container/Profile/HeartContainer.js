import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Heart from '../../Component/Profile/Heart';
import { openPopup } from '../../Modules/popup';
import { activeIdOfPost, activeIndexOfPost } from '../../Modules/posts';

const HeartContainer = () => {
  const dispatch = useDispatch();
  const { heartsModal: heartsModalState } = useSelector(state => state.popup);
  const { data: profileHeartPosts, loading, error } = useSelector(
    state => state.posts.profileHeartPosts,
  );

  const onClickPostModal = (id, index) => {
    console.log('hearts modal up!');
    dispatch(openPopup('heartsModal'));
    dispatch(activeIndexOfPost(index));
    dispatch(activeIdOfPost(id));
  };

  useEffect(() => {
    document.body.style.overflow = heartsModalState ? 'hidden' : 'auto';
  }, [heartsModalState]);

  if (loading) return <Loading isLoading={loading} />;
  if (error) return <div>에러 발생</div>;
  return (
    <Heart posts={profileHeartPosts} onClickPostModal={onClickPostModal} />
  );
};

export default HeartContainer;
