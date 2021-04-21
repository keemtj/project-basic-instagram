import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import User from '../../Component/Profile/User';

const UserContainer = ({ watchName }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const searchUser = useSelector(state => state.user.searchUser.data?.[0]);
  const [settings, setSettings] = useState(false);

  const postsCount = 0;
  const presentation = '자기소개문구';

  const onClickSettings = () => {
    setSettings(!settings);
  };
  const follower = 'admin';
  return (
    <User
      currentDisplayName={currentUser.displayName}
      photoURL={
        currentUser.displayName === watchName
          ? currentUser?.photoURL
          : searchUser?.photoURL
      }
      username={
        currentUser.displayName === watchName
          ? currentUser?.username
          : searchUser?.username
      }
      displayName={
        currentUser.displayName === watchName
          ? currentUser?.displayName
          : searchUser?.displayName
      }
      presentation={presentation}
      postsCount={postsCount}
      followersCount={
        currentUser.displayName === watchName
          ? currentUser?.followers?.length
          : searchUser?.followers?.length
      }
      followingCount={
        currentUser.displayName === watchName
          ? currentUser?.following?.length
          : searchUser?.following?.length
      }
      onClickSettings={onClickSettings}
      settings={settings}
      follower={follower}
    />
  );
};

export default UserContainer;
