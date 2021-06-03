import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Heart from '../../Component/Profile/Heart';
import { getHeartPosts, getHearts } from '../../Modules/heart';
import { openPopup } from '../../Modules/popup';
import { observeHeart } from '../../services/firestore';

const HeartContainer = () => {
  const dispatch = useDispatch();
  const hearts = useSelector(state => state.heart.hearts);
  const { data: posts, loading, error } = useSelector(
    state => state.heart.posts,
  );
  const { postModal: postModalState } = useSelector(state => state.popup);

  const [postId, setPostId] = React.useState('');
  const [postUid, setPostUid] = React.useState('');

  const onClickPostModal = (uid, id) => {
    setPostId(id);
    setPostUid(uid);
    dispatch(openPopup('postModal'));
  };

  useEffect(() => {
    observeHeart(dispatch, getHearts);
  }, []);

  useEffect(() => {
    dispatch(getHeartPosts(hearts));
  }, [hearts]);

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;
  return (
    <Heart
      posts={posts}
      onClickPostModal={onClickPostModal}
      postId={postId}
      postUid={postUid}
    />
  );
};

export default HeartContainer;
