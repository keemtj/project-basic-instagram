import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Saved from '../../Component/Profile/Saved';
import { openPopup } from '../../Modules/popup';
import { getBookmarkPosts, getBookmarks } from '../../Modules/saved';
import { observeBookmark } from '../../services/firestore';

const SavedContainer = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.saved.bookmarks);
  const { data: posts, loading, error } = useSelector(
    state => state.saved.posts,
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
    observeBookmark(dispatch, getBookmarks);
  }, []);

  useEffect(() => {
    dispatch(getBookmarkPosts(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;
  return (
    <Saved
      posts={posts}
      onClickPostModal={onClickPostModal}
      postId={postId}
      postUid={postUid}
    />
  );
};

export default SavedContainer;
