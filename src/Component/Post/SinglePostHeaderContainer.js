import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostHeader from '../../Component/Main/PostHeader';
import { closePopup, openPopup } from '../../Modules/popup';
import { getProfilePosts } from '../../Modules/posts';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';

const SinglePostHeaderContainer = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: user } = useSelector(state => state.user.profileUserData);

  const onMoveProfilePage = () => {
    dispatch(closePopup('postModal'));
    dispatch(getProfileUserData(post.uid));
    dispatch(getProfileUserFollowData(post.uid));
    dispatch(getProfilePosts(post.uid));
    history.push(`/${user?.displayName}`);
  };

  const onClickSetting = () => {
    console.log('Post Setting Modal Trigger');
    dispatch(openPopup('postSettingModal'));
  };

  return (
    <PostHeader
      displayName={user?.displayName}
      photoURL={user?.photoURL || '/images/default_profile.png'}
      location={post?.location}
      onMoveProfilePage={onMoveProfilePage}
      onClickSetting={onClickSetting}
    />
  );
};

export default SinglePostHeaderContainer;
