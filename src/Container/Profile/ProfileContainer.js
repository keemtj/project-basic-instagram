import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import NotFound from '../../Component/Global/NotFound';
import Profile from '../../Component/Profile/Profile';
import {
  getWatchUserByDisplayName,
  searchUserFollow,
} from '../../Modules/user';
import { getAllPostsByCurrentUid } from '../../Modules/main';
import { getFollowData, getUid } from '../../services/firestore';

const ProfileContainer = () => {
  const [noUser, setNoUser] = useState(false);
  const { displayName } = useSelector(state => state.user.currentUser);
  const { data } = useSelector(state => state.user.searchUser);
  const { data: posts } = useSelector(state => state.main.myPosts);
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { displayName: watchName } = params;

  console.log('watch =>', watchName);

  useEffect(async () => {
    document.title = `@${watchName} • Instagram 사진 및 동영상`;
    if (displayName !== watchName) {
      console.log('다른 유저의 페이지로 이동');
      dispatch(getWatchUserByDisplayName(watchName));
      const uid = await getUid(watchName);
      const searchUserFollowData = await getFollowData(uid);
      if (searchUserFollowData === 'no-user') {
        setNoUser(true);
      } else {
        setNoUser(false);
        dispatch(searchUserFollow(searchUserFollowData));
      }
      if (!posts) {
        dispatch(getAllPostsByCurrentUid(uid));
      }
    }
  }, []);
  if (data === []) return null;
  if (noUser) return <NotFound />;
  return (
    <Profile watchName={displayName !== watchName ? watchName : displayName} />
  );
};

export default ProfileContainer;
