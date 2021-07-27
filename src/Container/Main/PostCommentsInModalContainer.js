import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import PostCommentsInModal from '../../Component/Main/PostCommentsInModal';
import { closePopup } from '../../Modules/popup';
import { getProfilePosts } from '../../Modules/posts';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getDisplayName, getPhotoURL, getUids } from '../../services/firestore';

const PostCommentsInModalContainer = ({ post }) => {
  const { comments } = post;
  const [displayNames, setDisplayNames] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [uids, setUids] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const onMoveProfilePage = data => {
    const { uid, displayName } = data;
    history.push(`/${displayName}`);
    dispatch(closePopup('postModal'));
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getProfilePosts(uid));
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
      displayNames={displayNames}
      photoURLs={photoURLs}
      uids={uids}
      comments={comments}
      onMoveProfilePage={onMoveProfilePage}
    />
  );
};

export default PostCommentsInModalContainer;
