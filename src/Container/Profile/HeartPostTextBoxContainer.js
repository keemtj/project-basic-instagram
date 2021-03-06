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

const HeartPostTextBoxContainer = ({ post, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { heartsModal: heartsModalState } = useSelector(state => state.popup);

  const onMoveProfilePage = () => {
    dispatch(closePopup('heartsModal'));
    dispatch(getProfileUserData(user.uid));
    dispatch(getProfileUserFollowData(user.uid));
    dispatch(getProfilePosts(user.uid));
    history.push(`/${user.displayName}`);
  };

  return (
    <PostTextBox
      displayName={user.displayName}
      text={post?.text}
      postModalState={heartsModalState}
      onMoveProfilePage={onMoveProfilePage}
    />
  );
};

export default HeartPostTextBoxContainer;
