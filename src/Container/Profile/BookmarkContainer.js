import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Saved from '../../Component/Profile/Saved';
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import { openPopup } from '../../Modules/popup';
import {
  activeIdOfPost,
  activeIndexOfPost,
  nextProfileBookmarkPosts as nextPosts,
  updateLastDocByProfileBookmarkPosts as updateLastDocs,
} from '../../Modules/posts';
import { getNextProfileBookmarkPosts as fetchNextPosts } from '../../services/firestore';

const BookmarkContainer = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.currentUser);
  const { bookmarksModal: bookmarksModalState } = useSelector(
    state => state.popup,
  );
  const { data: profileBookmarkPosts, loading, error } = useSelector(
    state => state.posts.profileBookmarkPosts,
  );
  const lastDoc = useSelector(
    state => state.posts.lastDocByProfileBookmarkPosts,
  );

  const intersectionObserver = useInfiniteScroll({
    threshold: 0.9,
    fetchNextPosts,
    lastDoc,
    nextPosts,
    updateLastDocs,
    uid,
  });

  const onClickPostModal = (id, index) => {
    console.log('bookmarks modal up!');
    dispatch(openPopup('bookmarksModal'));
    dispatch(activeIndexOfPost(index));
    dispatch(activeIdOfPost(id));
  };

  useEffect(() => {
    document.body.style.overflow = bookmarksModalState ? 'hidden' : 'auto';
  }, [bookmarksModalState]);

  if (loading) return <Loading isLoading={loading} />;
  if (error) return <div>에러 발생</div>;
  return (
    <Saved
      posts={profileBookmarkPosts}
      onClickPostModal={onClickPostModal}
      isLoading={loading}
      lastDoc={lastDoc}
      intersectionObserver={intersectionObserver}
    />
  );
};

export default BookmarkContainer;
