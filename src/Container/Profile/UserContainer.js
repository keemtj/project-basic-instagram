import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import User from '../../Component/Profile/User';
import { openPopup } from '../../Modules/popup';
import { followUser, unFollowUser } from '../../Modules/search';
import { currentUserFollowData } from '../../Modules/user';
import {
  follow,
  observeUsersFollowData,
  unfollow,
} from '../../services/firestore';

const UserContainer = ({ watchName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { profileEditModal: profileEditModalState } = useSelector(
    state => state.popup,
  );

  // NOTE 현재 로그인 중인 유저의 데이터
  const currentUserData = useSelector(state => state.user.currentUser);
  const followData = useSelector(state => state.user.currentUserFollowData);
  const { data: myPosts } = useSelector(state => state.posts.myPosts);
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

  const isFollowing = searchUserFollowData?.followers?.includes(
    currentUserData.uid,
  );

  const { data: searchUserPosts } = useSelector(
    state => state.posts.searchUserPosts,
  );

  const onToggleFollow = () => {
    if (isFollowing) {
      unfollow(currentUserData.uid, searchUserData?.uid);
      dispatch(unFollowUser(currentUserData.uid));
    } else {
      follow(currentUserData.uid, searchUserData?.uid);
      dispatch(followUser(currentUserData.uid));
    }
    observeUsersFollowData(dispatch, currentUserFollowData);
  };

  const onEditProfile = () => {
    console.log('프로필 편집 페이지로 이동');
    history.push('/edit');
  };

  const onClickProfileEditModal = () => {
    console.log('profile edit modal trigger');
    dispatch(openPopup('profileEditModal'));
  };

  useEffect(() => {
    observeUsersFollowData(dispatch, currentUserFollowData);
  }, []);

  useEffect(() => {
    document.body.style.overflow = profileEditModalState ? 'hidden' : 'auto';
  }, [profileEditModalState]);

  return (
    <User
      isFollowing={isFollowing}
      currentDisplayName={currentUserData.displayName}
      photoURL={
        (currentUserData.displayName === watchName
          ? currentUserData?.photoURL
          : searchUserData?.photoURL) || '/images/default_profile.png'
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
      onClickProfileEditModal={onClickProfileEditModal}
      profileEditModalState={profileEditModalState}
    />
  );
};

export default UserContainer;
