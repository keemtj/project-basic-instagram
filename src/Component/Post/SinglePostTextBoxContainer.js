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

const SinglePostTextBoxContainer = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: user } = useSelector(state => state.user.profileUserData);
  const { postModal: postModalState } = useSelector(state => state.popup);

  const onMoveProfilePage = () => {
    dispatch(closePopup('postModal'));
    dispatch(getProfileUserData(post?.uid));
    dispatch(getProfileUserFollowData(post?.uid));
    dispatch(getProfilePosts(post?.uid));
    history.push(`/${user?.displayName}`);
  };

  return (
    <PostTextBox
      displayName={user?.displayName}
      text={post?.text}
      postModalState={postModalState}
      onMoveProfilePage={onMoveProfilePage}
    />
  );
};

export default SinglePostTextBoxContainer;
