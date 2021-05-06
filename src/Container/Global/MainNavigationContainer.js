import React from 'react';
import { useSelector } from 'react-redux';
import MainNavigation from '../../Component/Global/MainNavigation';

const MainNavigationContainer = ({ openModal }) => {
  // ! redux
  const { photoURL, displayName } = useSelector(
    state => state.user.currentUser,
  );

  return (
    <MainNavigation
      openModal={openModal}
      photoURL={photoURL || '/images/default_profile2.jpg'}
      displayName={displayName}
    />
  );
};

export default MainNavigationContainer;
