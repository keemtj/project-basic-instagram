import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Profile from '../../Component/Profile/Profile';
import { getWatchUserByDisplayName } from '../../Modules/user';

const ProfileContainer = () => {
  const { displayName } = useSelector(state => state.user.currentUser);
  const { data } = useSelector(state => state.user.searchUser);
  console.log('후우꾸꾸우후', data);

  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { displayName: watchName } = params;

  console.log('watch =>', watchName);
  useEffect(() => {
    document.title = `@${watchName} • Instagram 사진 및 동영상`;
    console.log(displayName, watchName);
    if (displayName !== watchName) {
      console.log('다른 유저의 페이지로 이동');
      dispatch(getWatchUserByDisplayName(watchName));
    }
  }, []);
  if (data === []) return null;
  return (
    <Profile watchName={displayName !== watchName ? watchName : displayName} />
  );
};

export default ProfileContainer;
