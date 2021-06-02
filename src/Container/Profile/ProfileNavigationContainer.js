import React from 'react';
import ProfileNavigation from '../../Component/Profile/ProfileNavigation';
import { Grid } from '@styled-icons/feather/Grid';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { Bookmark } from '@styled-icons/feather/Bookmark';
import { useSelector } from 'react-redux';

const ProfileNavigationContainer = ({ watchName }) => {
  const { displayName } = useSelector(state => state.user.currentUser);
  const subnav = [
    {
      name: '',
      text: '게시물',
      icon: <Grid />,
      isShow: true,
    },
    {
      name: 'saved',
      text: '저장됨',
      icon: <Bookmark />,
      isShow: displayName === watchName,
    },
    {
      name: 'heart',
      text: '좋아요',
      icon: <Heart />,
      isShow: displayName === watchName,
    },
  ];

  return <ProfileNavigation watchName={watchName} subnav={subnav} />;
};

export default ProfileNavigationContainer;
