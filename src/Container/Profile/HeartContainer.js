import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Heart from '../../Component/Profile/Heart';
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import { openPopup } from '../../Modules/popup';
import {
  activeIdOfPost,
  activeIndexOfPost,
  nextProfileHeartPosts as nextPosts,
  updateLastDocByProfileHeartPosts as updateLastDocs,
} from '../../Modules/posts';
import { getNextProfileHeartPosts as fetchNextPosts } from '../../services/firestore';

const HeartContainer = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.currentUser);
  const { heartsModal: heartsModalState } = useSelector(state => state.popup);
  const { data: profileHeartPosts, loading, error } = useSelector(
    state => state.posts.profileHeartPosts,
  );
  const lastDoc = useSelector(state => state.posts.lastDocByProfileHeartPosts);

  const intersectionObserver = useInfiniteScroll({
    threshold: 0.9,
    fetchNextPosts,
    lastDoc,
    nextPosts,
    updateLastDocs,
    uid,
  });

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
    <Heart
      posts={profileHeartPosts}
      onClickPostModal={onClickPostModal}
      isLoading={loading}
      lastDoc={lastDoc}
      intersectionObserver={intersectionObserver}
    />
  );
};

export default HeartContainer;
