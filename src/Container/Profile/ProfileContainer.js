import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router';
import Profile from '../../Component/Profile/Profile';
import { getUid } from '../../services/firestore';
import {
  getProfileBookmarkPosts,
  getProfileHeartPosts,
  getProfilePosts,
  updateLastDocByProfilePosts,
} from '../../Modules/posts';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';

const ProfileContainer = () => {
  const { params } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: profilePosts } = useSelector(state => state.posts.profilePosts);
  const { displayName } = useSelector(state => state.user.currentUser);
  const watchName = params.displayName;

  useEffect(async () => {
    const uid = await getUid(watchName);
    dispatch(getProfileUserData(uid));
    dispatch(getProfileUserFollowData(uid));
    if (!profilePosts) {
      dispatch(getProfilePosts({ uid, dispatch, updateLastDocByProfilePosts }));
    }
    if (location.pathname === `/${watchName}/heart`) {
      dispatch(getProfileHeartPosts(uid));
    } else if (location.pathname === `/${watchName}/saved`) {
      dispatch(getProfileBookmarkPosts(uid));
    }
  }, [watchName]);

  useEffect(() => {
    document.title = `@${watchName} • Instagram 사진 및 동영상`;
  }, []);

  return <Profile watchName={watchName} displayName={displayName} />;
};

export default ProfileContainer;
