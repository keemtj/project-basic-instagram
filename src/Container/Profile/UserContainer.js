import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import User from '../../Component/Profile/User';

const UserContainer = () => {
  const { photoURL, username, displayName, followers, following } = useSelector(
    state => state.user,
  );
  const [settings, setSettings] = useState(false);
  // ! redux
  const postsCount = 0;
  const presentation = '자기소개문구';

  const onClickSettings = () => {
    setSettings(!settings);
  };

  const follower = 'admin2';
  return (
    <User
      photoURL={photoURL}
      username={username}
      displayName={displayName}
      presentation={presentation}
      postsCount={postsCount}
      followersCount={followers.length}
      followingCount={following.length}
      onClickSettings={onClickSettings}
      settings={settings}
      follower={follower}
    />
  );
};

export default UserContainer;
