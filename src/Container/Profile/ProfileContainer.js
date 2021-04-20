import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Profile from '../../Component/Profile/Profile';

const ProfileContainer = () => {
  // ! redux
  const { displayName } = useSelector(state => state.user);

  useEffect(() => {
    document.title = `@${displayName} • Instagram 사진 및 동영상`;
  }, []);
  return <Profile displayName={displayName} />;
};

export default ProfileContainer;
