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

const PostTextBoxContainer = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postModal: postModalState } = useSelector(state => state.popup);
  const { data: profileUserData } = useSelector(
    state => state.user.profileUserData,
  );
  const { displayName } = profileUserData;

  const onMoveProfilePage = () => {
    history.push(`/${displayName}`);
    dispatch(closePopup('postsModal'));
    dispatch(getProfileUserData(post?.uid));
    dispatch(getProfileUserFollowData(post?.uid));
    dispatch(getProfilePosts(post?.uid));
  };

  return (
    <PostTextBox
      displayName={displayName}
      text={post?.text}
      postModalState={postModalState}
      onMoveProfilePage={onMoveProfilePage}
    />
  );
};

export default PostTextBoxContainer;
