import React from 'react';
import ProfileNavigation from '../../Component/Profile/ProfileNavigation';
import { Grid } from '@styled-icons/feather/Grid';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { Bookmark } from '@styled-icons/feather/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfileBookmarkPosts,
  getProfileHeartPosts,
  getProfilePosts,
} from '../../Modules/posts';

const ProfileNavigationContainer = ({ watchName }) => {
  const dispatch = useDispatch();
  const { displayName } = useSelector(state => state.user.currentUser);
  const { data: profileUserData } = useSelector(
    state => state.user.profileUserData,
  );
  const { data: profilePosts } = useSelector(state => state.posts.profilePosts);
  const { data: profileBookmarkPosts } = useSelector(
    state => state.posts.profileBookmarkPosts,
  );
  const { data: profileHeartPosts } = useSelector(
    state => state.posts.profileHeartPosts,
  );

  const onMoveProfilePage = () => {
    if (!profilePosts) {
      dispatch(getProfilePosts(profileUserData?.uid));
    }
  };

  const onMoveBookmarkPage = () => {
    if (!profileBookmarkPosts) {
      dispatch(getProfileBookmarkPosts(profileUserData?.uid));
    }
  };

  const onMoveHeartPage = () => {
    if (!profileHeartPosts) {
      dispatch(getProfileHeartPosts(profileUserData?.uid));
    }
  };

  const subnav = [
    {
      name: '',
      text: '게시물',
      icon: <Grid />,
      isShow: true,
      onClick: onMoveProfilePage,
    },
    {
      name: 'saved',
      text: '저장됨',
      icon: <Bookmark />,
      isShow: displayName === watchName,
      onClick: onMoveBookmarkPage,
    },
    {
      name: 'heart',
      text: '좋아요',
      icon: <Heart />,
      isShow: displayName === watchName,
      onClick: onMoveHeartPage,
    },
  ];

  return <ProfileNavigation watchName={watchName} subnav={subnav} />;
};

export default ProfileNavigationContainer;
