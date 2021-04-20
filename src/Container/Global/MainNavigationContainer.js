import React from 'react';
import { useSelector } from 'react-redux';
import MainNavigation from '../../Component/Global/MainNavigation';

const MainNavigationContainer = ({ openModal }) => {
  // ! redux
  const userData = useSelector(state => state.user);
  const { photoURL, displayName } = userData;

  return (
    <MainNavigation
      openModal={openModal}
      photoURL={photoURL}
      displayName={displayName}
    />
  );
};

export default MainNavigationContainer;
