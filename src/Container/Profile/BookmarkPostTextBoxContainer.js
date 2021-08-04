import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostTextBox from '../../Component/Main/PostTextBox';
import { closePopup } from '../../Modules/popup';
import { getProfilePosts } from '../../Modules/posts';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';

const BookmarkPostTextBoxContainer = ({ post, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { bookmarksModal: bookmarksModalState } = useSelector(
    state => state.popup,
  );

  const onMoveProfilePage = () => {
    dispatch(closePopup('bookmarksModal'));
    dispatch(getSearchUserData(user.uid));
    dispatch(getSearchUserFollowData(user.uid));
    dispatch(getProfilePosts(user.uid));
    history.push(`/${user.displayName}`);
  };

  return (
    <PostTextBox
      displayName={user.displayName}
      text={post?.text}
      postModalState={bookmarksModalState}
      onMoveProfilePage={onMoveProfilePage}
    />
  );
};

export default BookmarkPostTextBoxContainer;
