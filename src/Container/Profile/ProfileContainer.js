import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Profile from '../../Component/Profile/Profile';
import { getUid } from '../../services/firestore';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getSearchUserPosts } from '../../Modules/posts';

const ProfileContainer = () => {
  const { params } = useRouteMatch();
  const dispatch = useDispatch();
  const { data: searchUserData, loading: searchUserDataLoading } = useSelector(
    state => state.search.searchUser,
  );
  const watchName = params.displayName;

  useEffect(() => {
    document.title = `@${watchName} • Instagram 사진 및 동영상`;
  }, []);

  useEffect(async () => {
    if (!searchUserData && !searchUserDataLoading) {
      console.log('새로고침했는데 데이터 없어서 새로가져옴');
      const uid = await getUid(watchName);
      dispatch(getSearchUserData(uid));
      dispatch(getSearchUserFollowData(uid));
      dispatch(getSearchUserPosts(uid));
    }
  }, [watchName]);

  // NotFound page뜨도록 설정하기
  return <Profile watchName={watchName} />;
};

export default ProfileContainer;
