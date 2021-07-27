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

const PostTextBoxContainer = ({ user, post }) => {
  const { displayName } = user;
  const { text, uid } = post;
  const history = useHistory();
  const dispatch = useDispatch();
  const { postModal: postModalState } = useSelector(state => state.popup);

  const onMoveProfilePage = () => {
    history.push(`/${displayName}`);
    dispatch(closePopup('postModal'));
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getProfilePosts(uid));
  };

  return (
    <PostTextBox
      displayName={displayName}
      text={text}
      postModalState={postModalState}
      onMoveProfilePage={onMoveProfilePage}
    />
  );
};

export default PostTextBoxContainer;
