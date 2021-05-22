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
import NotFound from '../../Component/Global/NotFound';

const ProfileContainer = () => {
  const { params } = useRouteMatch();
  const dispatch = useDispatch();
  const watchName = params.displayName;

  // NOTE 현재 로그인 중인 유저의 데이터
  const currentUserData = useSelector(state => state.user.user);

  // NOTE 서칭한 유저의 데이터
  const { data: searchUserData, loading: searchUserDataLoading } = useSelector(
    state => state.search.searchUser,
  );
  const { data: searchUserFollowData } = useSelector(
    state => state.search.searchUserFollow,
  );
  const isFollowing =
    searchUserFollowData?.followers?.includes(currentUserData.uid) || null;

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

  // TODO: NotFound page뜨도록 설정하기
  return (
    <>
      {isFollowing === null && watchName !== currentUserData.displayName ? (
        <NotFound />
      ) : (
        <Profile watchName={watchName} />
      )}
    </>
  );
};

export default ProfileContainer;
