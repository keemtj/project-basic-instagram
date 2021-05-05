import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Profile from '../../Component/Profile/Profile';
import { getPosts, getSearchUserPosts } from '../../Modules/posts';
import {
  getWatchUserByDisplayName,
  searchUserFollow,
} from '../../Modules/user';
import { firebaseAuth } from '../../services/firebase';
import {
  getCurrentUserData,
  getFollowData,
  getUid,
} from '../../services/firestore';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const watchName = params.displayName;

  useEffect(async () => {
    const { uid } = firebaseAuth.currentUser;
    dispatch(getPosts(uid));
    let currentDisplayName = '';
    const { displayName } = await getCurrentUserData(uid);
    currentDisplayName = await displayName;

    console.log('변하는값', watchName);
    console.log('불변 값?', currentDisplayName);

    // switch posts
    if (currentDisplayName !== watchName) {
      const watchNameUid = await getUid(watchName);
      dispatch(getSearchUserPosts(watchNameUid));
      dispatch(getWatchUserByDisplayName(watchName));
      const followData = await getFollowData(watchNameUid);
      dispatch(searchUserFollow(followData));
    } else {
      dispatch(getPosts(uid));
    }
    console.log(
      '이건  무슨값?',
      currentDisplayName !== watchName ? watchName : currentDisplayName,
    );
    document.title = `@${
      currentDisplayName !== watchName ? watchName : currentDisplayName
    } • Instagram 사진 및 동영상`;
  }, []);

  return <Profile watchName={watchName} />;
};

export default ProfileContainer;
