import React from 'react';
import { useSelector } from 'react-redux';
import User from '../../Component/Profile/User';

const UserContainer = () => {
  // ! redux
  const { photoURL, username, displayName, followers, following } = useSelector(
    state => state.user,
  );
  const followersCount = followers.length;
  const followingCount = following.length;
  const postsCount = 0;
  const presentation = '자기소개문구';
  const [settings, setSettings] = React.useState(false);

  const onClickSettings = () => {
    setSettings(!settings);
  };
  return (
    <User
      photoURL={photoURL}
      username={username}
      displayName={displayName}
      presentation={presentation}
      followersCount={followersCount}
      followingCount={followingCount}
      postsCount={postsCount}
      onClickSettings={onClickSettings}
      settings={settings}
    />
  );
};

export default UserContainer;
