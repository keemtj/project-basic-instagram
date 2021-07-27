import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Profile from '../../Component/Profile/Profile';
import { getUid } from '../../services/firestore';
import { getSearchUserFollowData } from '../../Modules/search';
import { getProfilePosts } from '../../Modules/posts';
import { getProfileUserData } from '../../Modules/user';

const ProfileContainer = () => {
  const { params } = useRouteMatch();
  const dispatch = useDispatch();
  const watchName = params.displayName;

  const { data: profileUserData } = useSelector(
    state => state.user.profileUserData,
  );

  useEffect(async () => {
    if (!profileUserData) {
      console.log('새로고침했는데 데이터 없어서 새로가져옴');
      const uid = await getUid(watchName);
      dispatch(getSearchUserFollowData(uid));
      dispatch(getProfilePosts(uid));
      dispatch(getProfileUserData(uid));
    }
  }, [watchName]);

  useEffect(() => {
    document.title = `@${watchName} • Instagram 사진 및 동영상`;
  }, []);

  return <Profile watchName={watchName} />;
};

export default ProfileContainer;
