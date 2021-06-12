import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Saved from '../../Component/Profile/Saved';
import { activeIndex, activePostsData, openPopup } from '../../Modules/popup';
import { getBookmarkPosts, getBookmarks } from '../../Modules/saved';
import { observeBookmark } from '../../services/firestore';

const SavedContainer = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.saved.bookmarks);
  const { data: posts, loading, error } = useSelector(
    state => state.saved.posts,
  );
  const { postModal: postModalState } = useSelector(state => state.popup);

  const onClickPostModal = (posts, post, id, index) => {
    console.log(posts, post, id, index);
    dispatch(openPopup('postModal'));
    dispatch(activePostsData(posts));
    dispatch(activeIndex(index));
  };

  useEffect(() => {
    observeBookmark(dispatch, getBookmarks);
  }, []);

  useEffect(() => {
    dispatch(getBookmarkPosts(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  if (loading) return <Loading isLoading={loading} />;
  if (error) return <div>에러 발생</div>;
  return <Saved posts={posts} onClickPostModal={onClickPostModal} />;
};

export default SavedContainer;
