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

const PostHeaderContainer = ({ user, post }) => {
  const { displayName, photoURL, uid } = user;
  const { location } = post;
  const history = useHistory();
  const dispatch = useDispatch();

  const onMoveProfilePage = () => {
    dispatch(closePopup('postModal'));
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getProfilePosts(uid));
    history.push(`/${displayName}`);
  };

  const onClickSetting = () => {
    console.log('Post Setting Modal Trigger');
    dispatch(openPopup('postSettingModal'));
  };

  return (
    <PostHeader
      displayName={displayName}
      photoURL={photoURL}
      location={location}
      onMoveProfilePage={onMoveProfilePage}
      onClickSetting={onClickSetting}
    />
  );
};

export default PostHeaderContainer;
