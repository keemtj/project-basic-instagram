import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import User from '../../Component/Profile/User';

const UserContainer = ({ watchName }) => {
  console.log('user containr => ', watchName);
  // NOTE 현재 로그인 중인 유저의 데이터
  const { data: myPosts } = useSelector(state => state.posts.myPosts);
  const currentUser = useSelector(state => state.user.currentUser);

  // NOTE 서칭한 유저의 데이터
  const { data: searchUserPosts } = useSelector(
    state => state.posts.searchUserPosts,
  );
  const searchUser = useSelector(state => state.user.searchUser.data?.[0]);
  const searchUserFollow = useSelector(state => state.user.searchUserFollow);
  // NOTE 공통된 부분
  const { following, followers } = useSelector(state => state.user.follow);
  const isFollowing = following.includes(searchUser?.uid);

  const [settings, setSettings] = useState(false);

  const onToggleFollow = () => {
    if (isFollowing) {
      console.log('팔로우 취소 요청 dispatch!!');
    } else {
      console.log('팔로우 요청 dispatch!!');
    }
  };

  const onEditProfile = () => {
    console.log('프로필 편집 트리거!!');
  };

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
      presentation={
        currentUser.displayName === watchName
          ? currentUser?.presentation
          : searchUser?.displayName
      }
      postsCount={
        currentUser.displayName === watchName
          ? myPosts?.length
          : searchUserPosts?.length
      }
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
      onEditProfile={onEditProfile}
      onToggleFollow={onToggleFollow}
      onClickSettings={onClickSettings}
      settings={settings}
    />
  );
};

export default UserContainer;
