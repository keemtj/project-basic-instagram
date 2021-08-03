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

const PostTextBoxContainer = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postModal: postModalState } = useSelector(state => state.popup);
  const { currentUser } = useSelector(state => state.user);
  const { displayName } = currentUser;

  const onMoveProfilePage = () => {
    history.push(`/${displayName}`);
    dispatch(closePopup('postsModal'));
    dispatch(getSearchUserData(post?.uid));
    dispatch(getSearchUserFollowData(post?.uid));
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
