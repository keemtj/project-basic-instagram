import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostTextBox from '../../Component/Main/PostTextBox';
import { closePopup } from '../../Modules/popup';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';
import { getProfilePosts } from '../../Modules/posts';

const BookmarkPostTextBoxContainer = ({ post, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { bookmarksModal: bookmarksModalState } = useSelector(
    state => state.popup,
  );

  const onMoveProfilePage = () => {
    dispatch(closePopup('bookmarksModal'));
    dispatch(getProfileUserData(user.uid));
    dispatch(getProfileUserFollowData(user.uid));
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
