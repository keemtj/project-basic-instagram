import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostHeader from '../../Component/Main/PostHeader';
import { closePopup, openPopup } from '../../Modules/popup';
import { getProfilePosts } from '../../Modules/posts';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';

const PostHeaderContainer = ({ post }) => {
  const { currentUser } = useSelector(state => state.user);
  const { uid, displayName, photoURL } = currentUser;
  const history = useHistory();
  const dispatch = useDispatch();

  const onMoveProfilePage = () => {
    dispatch(closePopup('postsModal'));
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
      location={post?.location}
      onMoveProfilePage={onMoveProfilePage}
      onClickSetting={onClickSetting}
    />
  );
};

export default PostHeaderContainer;
