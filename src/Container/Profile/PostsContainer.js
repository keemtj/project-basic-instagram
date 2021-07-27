import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Loading from '../../Component/Global/Loading';
import Posts from '../../Component/Profile/Posts';
import {
  openPopup,
  activePostsData,
  activePostIdData,
  activeIndex,
} from '../../Modules/popup';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { postModal: postModalState } = useSelector(state => state.popup);
  const { displayName } = useSelector(state => state.user.currentUser);
  const { data: profilePosts, loading, error } = useSelector(
    state => state.posts.profilePosts,
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
    <Posts
      posts={profilePosts}
      onClickPostModal={onClickPostModal}
      isMe={params[displayName]}
    />
  );
};

export default PostsContainer;
