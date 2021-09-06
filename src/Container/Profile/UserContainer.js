import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import User from '../../Component/Profile/User';
import { openPopup } from '../../Modules/popup';
import { followUser, unFollowUser } from '../../Modules/search';
import { getProfileUserFollowData } from '../../Modules/user';
import {
  follow,
  unfollow,
  observeUsersFollowData,
} from '../../services/firestore';

const UserContainer = ({ watchName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { profileEditModal: profileEditModalState } = useSelector(
    state => state.popup,
  );
  const currentUserData = useSelector(state => state.user.currentUser);
  const { data: profileUserData, loading } = useSelector(
    state => state.user.profileUserData,
  );
  const { data: followData } = useSelector(
    state => state.user.profileUserFollowData,
  );
  const size = useSelector(state => state.posts.profilePostsSize);
  const { following, followers } = followData || {
    following: [],
    followers: [],
  };

  const isFollowing = followers?.includes(currentUserData.uid);

  const onToggleFollow = () => {
    if (isFollowing) {
      unfollow(currentUserData.uid, profileUserData?.uid);
      dispatch(unFollowUser(currentUserData.uid));
    } else {
      follow(currentUserData.uid, profileUserData?.uid);
      dispatch(followUser(currentUserData.uid));
    }
    observeUsersFollowData(dispatch, getProfileUserFollowData);
  };

  const onEditProfile = () => {
    history.push('/edit');
  };

  const onClickProfileEditModal = () => {
    dispatch(openPopup('profileEditModal'));
  };

  useEffect(() => {
    observeUsersFollowData(dispatch, getProfileUserFollowData);
  }, []);

  useEffect(() => {
    document.body.style.overflow = profileEditModalState ? 'hidden' : 'auto';
  }, [profileEditModalState]);

  return (
    <User
      loading={loading}
      isFollowing={isFollowing}
      currentDisplayName={currentUserData.displayName}
      photoURL={
        (currentUserData.displayName === watchName
          ? currentUserData?.photoURL
          : profileUserData?.photoURL) || '/images/default_profile.png'
      }
      username={
        currentUserData.displayName === watchName
          ? currentUserData?.username
          : profileUserData?.username
      }
      displayName={
        currentUserData.displayName === watchName
          ? currentUserData?.displayName
          : profileUserData?.displayName
      }
      presentation={
        currentUserData.displayName === watchName
          ? currentUserData?.presentation
          : profileUserData?.presentation
      }
      postsCount={size}
      followersCount={
        currentUserData.displayName === watchName
          ? followers?.length
          : followers?.length
      }
      followingCount={
        currentUserData.displayName === watchName
          ? following?.length
          : following?.length
      }
      onEditProfile={onEditProfile}
      onToggleFollow={onToggleFollow}
      onClickProfileEditModal={onClickProfileEditModal}
      profileEditModalState={profileEditModalState}
    />
  );
};

export default UserContainer;
