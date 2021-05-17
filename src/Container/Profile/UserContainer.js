import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import User from '../../Component/Profile/User';

const UserContainer = ({ watchName }) => {
  const history = useHistory();
  const [settings, setSettings] = useState(false);
  // NOTE 현재 로그인 중인 유저의 데이터
  const currentUserData = useSelector(state => state.user.user);
  const { data: myPosts } = useSelector(state => state.posts.myPosts);
  const { following, followers } = useSelector(state => state.user.follow);

  // NOTE 서칭한 유저의 데이터
  const { data: searchUserData } = useSelector(
    state => state.search.searchUser,
  );
  const { data: searchUserFollowData } = useSelector(
    state => state.search.searchUserFollow,
  );
  const isFollowing = searchUserFollowData?.followers.includes(
    currentUserData.uid,
  );
  const { data: searchUserPosts } = useSelector(
    state => state.posts.searchUserPosts,
  );

  const onToggleFollow = () => {
    if (isFollowing) {
      console.log('팔로우 취소 요청 dispatch!!');
    } else {
      console.log('팔로우 요청 dispatch!!');
    }
  };

  const onEditProfile = () => {
    history.push('/edit');
    console.log('프로필 편집 페이지로 이동');
  };

  const onClickSettings = () => {
    setSettings(!settings);
  };

  return (
    <User
      isFollowing={isFollowing}
      currentDisplayName={currentUserData.displayName}
      photoURL={
        (currentUserData.displayName === watchName
          ? currentUserData?.photoURL
          : searchUserData?.photoURL) || '/images/default_profile2.jpg'
      }
      username={
        currentUserData.displayName === watchName
          ? currentUserData?.username
          : searchUserData?.username
      }
      displayName={
        currentUserData.displayName === watchName
          ? currentUserData?.displayName
          : searchUserData?.displayName
      }
      presentation={
        currentUserData.displayName === watchName
          ? currentUserData?.presentation
          : searchUserData?.displayName
      }
      postsCount={
        currentUserData.displayName === watchName
          ? myPosts?.length
          : searchUserPosts?.length
      }
      followersCount={
        currentUserData.displayName === watchName
          ? followers?.length
          : searchUserFollowData?.followers?.length
      }
      followingCount={
        currentUserData.displayName === watchName
          ? following?.length
          : searchUserFollowData?.following?.length
      }
      onEditProfile={onEditProfile}
      onToggleFollow={onToggleFollow}
      onClickSettings={onClickSettings}
      settings={settings}
    />
  );
};

export default UserContainer;
