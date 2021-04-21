import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Profile from '../../Component/Profile/Profile';
import { getWatchUserByDisplayName } from '../../Modules/user';

const ProfileContainer = () => {
  const { displayName } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { displayName: watchName } = params;

  console.log('watch =>', watchName);
  useEffect(() => {
    document.title = `@${watchName} • Instagram 사진 및 동영상`;
    if (displayName !== watchName) {
      console.log('다른 유저의 페이지로 이동');
      dispatch(getWatchUserByDisplayName(watchName));
    }
  }, []);
  return (
    <Profile watchName={displayName !== watchName ? watchName : displayName} />
  );
};

export default ProfileContainer;
