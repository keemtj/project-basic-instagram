import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Heart from '../../Component/Profile/Heart';
import { openPopup } from '../../Modules/popup';

const HeartContainer = () => {
  const dispatch = useDispatch();
  const { heartsModal: heartsModalState } = useSelector(state => state.popup);
  const { data: profileHeartPosts, loading, error } = useSelector(
    state => state.posts.profileHeartPosts,
  );

  const onClickPostModal = (posts, id, index) => {
    console.log('hearts modal up!', posts, id, index);
    dispatch(openPopup('heartsModal'));
    // dispatch(activePostsData(posts));
    // dispatch(activePostIdData(id));
    // dispatch(activeIndex(index));
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
