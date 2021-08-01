import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Loading from '../../Component/Global/Loading';
import Posts from '../../Component/Profile/Posts';
import { openPopup } from '../../Modules/popup';
import { activeIndexOfPost, activeIdOfPost } from '../../Modules/posts';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { postsModal: postsModalState } = useSelector(state => state.popup);
  const { displayName } = useSelector(state => state.user.currentUser);
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
      isMypage={params[displayName]}
    />
  );
};

export default PostsContainer;
