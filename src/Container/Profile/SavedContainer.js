import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Saved from '../../Component/Profile/Saved';
import { openPopup } from '../../Modules/popup';
import { activeIdOfPost, activeIndexOfPost } from '../../Modules/posts';

const SavedContainer = () => {
  const dispatch = useDispatch();
  const { bookmarksModal: bookmarksModalState } = useSelector(
    state => state.popup,
  );
  const { data: profileBookmarkPosts, loading, error } = useSelector(
    state => state.posts.profileBookmarkPosts,
  );

  const onClickPostModal = (id, index) => {
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
    <Saved posts={profileBookmarkPosts} onClickPostModal={onClickPostModal} />
  );
};

export default SavedContainer;
