import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Posts from '../../Component/Profile/Posts';
import { openPopup } from '../../Modules/popup';
import { activeIndexOfPost, activeIdOfPost } from '../../Modules/posts';

const PostsContainer = ({ watchName }) => {
  const dispatch = useDispatch();
  const { displayName } = useSelector(state => state.user.currentUser);
  const { postsModal: postsModalState } = useSelector(state => state.popup);
  const { data: profilePosts, loading, error } = useSelector(
    state => state.posts.profilePosts,
  );

  const onClickPostModal = (id, index) => {
    dispatch(openPopup('postsModal'));
    dispatch(activeIndexOfPost(index));
    dispatch(activeIdOfPost(id));
  };

  useEffect(() => {
    document.body.style.overflow = postsModalState ? 'hidden' : 'auto';
  }, [postsModalState]);

  if (loading) return <Loading isLoading={loading} />;
  if (error) return <div>에러 발생</div>;
  return (
    <Posts
      posts={profilePosts}
      onClickPostModal={onClickPostModal}
      isMypage={watchName === displayName}
    />
  );
};

export default PostsContainer;
