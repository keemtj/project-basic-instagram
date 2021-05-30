import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import User from '../../Component/Profile/User';
import { followUser, unFollowUser } from '../../Modules/search';
import { follow, unfollow } from '../../services/firestore';

const UserContainer = ({ watchName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [settings, setSettings] = useState(false);

  // NOTE 현재 로그인 중인 유저의 데이터
  const currentUserData = useSelector(state => state.user.currentUser);
  const { data: myPosts } = useSelector(state => state.posts.myPosts);
  const { data: followData } = useSelector(
    state => state.user.currentUserFollowData,
  );
  const { following, followers } = followData || {
    following: [],
    followers: [],
  };

  // NOTE 서칭한 유저의 데이터
  const { data: searchUserData } = useSelector(
    state => state.search.searchUser,
  );
  const { data: searchUserFollowData } = useSelector(
    state => state.search.searchUserFollow,
  );

  const isFollowing =
    searchUserFollowData?.followers.includes(currentUserData.uid) || null;

  const { data: searchUserPosts } = useSelector(
    state => state.posts.searchUserPosts,
  );

  const onToggleFollow = () => {
    if (isFollowing) {
      console.log(
        '언팔로우 dispatch: 서치 유저의 팔로우 데이터에서 내 uid를 제거',
      );
      unfollow(currentUserData.uid, searchUserData?.uid);
      dispatch(unFollowUser(currentUserData.uid));
    } else {
      follow(currentUserData.uid, searchUserData?.uid);
      console.log(
        '팔로우 dispatch: 서치 유저의 팔로우 데이터에서 내 uid를 추가',
      );
      dispatch(followUser(currentUserData.uid));
    }
  };

  const onEditProfile = () => {
    console.log('프로필 편집 페이지로 이동');
    history.push('/edit');
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
          : searchUserData?.presentation
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
