import React, {
  useState,
  // useEffect
} from 'react';
import { useSelector } from 'react-redux';
import User from '../../Component/Profile/User';

const UserContainer = ({ watchName }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const searchUser = useSelector(state => state.user.searchUser.data?.[0]);
  const { following, followers } = useSelector(state => state.user.follow);
  const searchUserFollow = useSelector(state => state.user.searchUserFollow);
  const isFollowing = following.includes(searchUser?.uid);
  const [settings, setSettings] = useState(false);

  const posts = useSelector(state => state.main.myPosts.data);
  const postsCount = posts?.length;

  const onClickSettings = () => {
    setSettings(!settings);
  };
  return (
    <User
      isFollowing={isFollowing}
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
      presentation={currentUser.presentation}
      postsCount={postsCount}
      followersCount={
        currentUser.displayName === watchName
          ? followers?.length
          : searchUserFollow?.followers?.length
      }
      followingCount={
        currentUser.displayName === watchName
          ? following?.length
          : searchUserFollow?.following?.length
      }
      onClickSettings={onClickSettings}
      settings={settings}
    />
  );
};

export default UserContainer;
