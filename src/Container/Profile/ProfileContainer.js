import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../../Component/Global/NotFound';
import Profile from '../../Component/Profile/Profile';
import { getFollowData, getUid } from '../../services/firestore';
import {
  getWatchUserByDisplayName,
  searchUserFollow,
} from '../../Modules/user';
import { getPosts } from '../../Modules/posts';

const ProfileContainer = () => {
  // -->
  const dispatch = useDispatch();
  const { displayName } = useSelector(state => state.user.currentUser);
  const { data: userData } = useSelector(state => state.user.searchUser);
  const [noUser, setNoUser] = useState(false);
  const { params } = useRouteMatch();
  const { displayName: watchName } = params;

  /**
   * FIXME: 두 변수에 대한 렌더링 처리문제 해결 필요
   * NOTE 두 변수가 모두 필요한지, 둘 중 하나만 필요한지
   * @param noUser
   * @param userData
   */
  useEffect(async () => {
    document.title = `@${watchName} • Instagram 사진 및 동영상`;
    if (displayName !== watchName) {
      console.log('다른 유저의 페이지로 이동');
      // NOTE get watchName user's profile data
      dispatch(getWatchUserByDisplayName(watchName));
      const uid = await getUid(watchName);
      // NOTE get watchName user's follow data
      const searchUserFollowData = await getFollowData(uid);
      if (searchUserFollowData === 'no-user') {
        setNoUser(true);
      } else {
        setNoUser(false);
        dispatch(searchUserFollow(searchUserFollowData));
        // NOTE search된 유저를 기준으로 myPosts 업데이트
        // NOTE main page 또는 admin(current User) page로 올 경우에도 dispatch
        dispatch(getPosts(uid));
      }
    }
  }, []);
  console.log('look at userData!!! ==>', userData);
  console.log('look at noUser!!! ==>', noUser);
  if (userData === []) return null;
  if (noUser) return <NotFound />;
  // -->
  return (
    <Profile watchName={displayName !== watchName ? watchName : displayName} />
  );
};

export default ProfileContainer;
