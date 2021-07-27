import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import PostComments from '../../Component/Main/PostComments';
import { getProfilePosts } from '../../Modules/posts';
import { getProfileUserData } from '../../Modules/user';
import { getDisplayName } from '../../services/firestore';

const PostCommentsContainer = ({ comments, onClickPostModal, newComments }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [displayNames, setDisplayNames] = useState([]);

  const onMoveProfilePage = (uid, displayName) => {
    console.log(uid);
    dispatch(getProfileUserData(uid));
    dispatch(getProfilePosts(uid));
    history.push(`/${displayName}`);
  };

  useEffect(async () => {
    if (comments.length > 0) {
      const result = await getDisplayName(comments);
      setDisplayNames(result);
    }
  }, [comments]);

  return (
    <PostComments
      displayNames={displayNames}
      comments={comments}
      onClickPostModal={onClickPostModal}
      newComments={newComments}
      onMoveProfilePage={onMoveProfilePage}
    />
  );
};

export default PostCommentsContainer;
