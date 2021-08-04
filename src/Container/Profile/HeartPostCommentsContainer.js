import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PostCommentsInModal from '../../Component/Main/PostCommentsInModal';
import { closePopup } from '../../Modules/popup';
import { getProfileUserData } from '../../Modules/user';
import { getProfilePosts } from '../../Modules/posts';
import { getDisplayName, getPhotoURL, getUids } from '../../services/firestore';

const HeartPostCommentsContainer = ({
  comments,
  modalLoading,
  newComments,
}) => {
  const { photoURL, displayName, uid } = useSelector(
    state => state.user.currentUser,
  );
  const [displayNames, setDisplayNames] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [uids, setUids] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const onMoveProfilePage = data => {
    const { uid, displayName } = data;
    dispatch(getProfileUserData(uid));
    dispatch(getProfilePosts(uid));
    dispatch(closePopup('heartsModal'));
    history.push(`/${displayName}`);
  };

  useEffect(async () => {
    if (comments.length > 0) {
      console.log('comment 추가됨?');
      const displayNamesArray = await getDisplayName(comments);
      const photoURLsArray = await getPhotoURL(comments);
      const uidsArray = await getUids(comments);
      setDisplayNames(displayNamesArray);
      setPhotoURLs(photoURLsArray);
      setUids(uidsArray);
    }
  }, [comments]);

  return (
    <PostCommentsInModal
      modalLoading={modalLoading}
      displayNames={displayNames}
      photoURLs={photoURLs}
      uids={uids}
      comments={comments}
      newComments={newComments}
      onMoveProfilePage={onMoveProfilePage}
      displayName={displayName}
      photoURL={photoURL}
      uid={uid}
    />
  );
};

export default HeartPostCommentsContainer;
