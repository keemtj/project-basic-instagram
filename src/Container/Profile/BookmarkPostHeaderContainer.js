import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import PostHeader from '../../Component/Main/PostHeader';
import { closePopup, openPopup } from '../../Modules/popup';
import { getProfilePosts } from '../../Modules/posts';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';

const BookmarkPostHeaderContainer = ({ post, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onMoveProfilePage = () => {
    dispatch(closePopup('bookmarksModal'));
    dispatch(getSearchUserData(user.uid));
    dispatch(getSearchUserFollowData(user.uid));
    dispatch(getProfilePosts(user.uid));
    history.push(`/${user.displayName}`);
  };

  const onClickSetting = () => {
    console.log('Post Setting Modal Trigger');
    dispatch(openPopup('postSettingModal'));
  };

  return (
    <PostHeader
      displayName={user.displayName}
      photoURL={user.photoURL || '/images/default_profile.png'}
      location={post?.location}
      onMoveProfilePage={onMoveProfilePage}
      onClickSetting={onClickSetting}
    />
  );
};

export default BookmarkPostHeaderContainer;
