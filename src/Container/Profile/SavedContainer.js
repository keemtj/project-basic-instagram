import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Saved from '../../Component/Profile/Saved';
import { openPopup } from '../../Modules/popup';

const SavedContainer = () => {
  const dispatch = useDispatch();
  const { bookmarksModal: bookmarksModalState } = useSelector(
    state => state.popup,
  );
  const { data: profileBookmarkPosts, loading, error } = useSelector(
    state => state.posts.profileBookmarkPosts,
  );

  const onClickPostModal = (posts, id, index) => {
    console.log('bookmarks modal up!', posts, id, index);
    dispatch(openPopup('bookmarksModal'));
    // dispatch(activePostsData(posts));
    // dispatch(activePostIdData(id));
    // dispatch(activeIndex(index));
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
