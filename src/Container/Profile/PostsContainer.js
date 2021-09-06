import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Posts from '../../Component/Profile/Posts';
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import { openPopup } from '../../Modules/popup';
import {
  activeIndexOfPost,
  activeIdOfPost,
  nextProfilePosts as nextPosts,
  updateLastDocByProfilePosts as updateLastDocs,
} from '../../Modules/posts';
import { getNextProfilePosts as fetchNextPosts } from '../../services/firestore';

const PostsContainer = ({ watchName }) => {
  const dispatch = useDispatch();
  const { displayName, uid } = useSelector(state => state.user.currentUser);
  const { postsModal: postsModalState } = useSelector(state => state.popup);
  const { data: profilePosts, loading, error } = useSelector(
    state => state.posts.profilePosts,
  );
  const lastDoc = useSelector(state => state.posts.lastDocByProfilePosts);

  const intersectionObserver = useInfiniteScroll({
    threshold: 0.9,
    fetchNextPosts,
    lastDoc,
    nextPosts,
    updateLastDocs,
    uid,
  });

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
      isLoading={loading}
      lastDoc={lastDoc}
      intersectionObserver={intersectionObserver}
    />
  );
};

export default PostsContainer;
