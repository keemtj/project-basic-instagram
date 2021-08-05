import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostHeader from '../../Component/Main/PostHeader';
import { closePopup, openPopup } from '../../Modules/popup';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';
import { getProfilePosts } from '../../Modules/posts';

const PostHeaderContainer = ({ post }) => {
  const { data: profileUserData } = useSelector(
    state => state.user.profileUserData,
  );
  const { uid, displayName, photoURL } = profileUserData;
  const history = useHistory();
  const dispatch = useDispatch();

  const onMoveProfilePage = () => {
    dispatch(closePopup('postsModal'));
    dispatch(getProfileUserData(uid));
    dispatch(getProfileUserFollowData(uid));
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
      location={post?.location}
      onMoveProfilePage={onMoveProfilePage}
      onClickSetting={onClickSetting}
    />
  );
};

export default PostHeaderContainer;
