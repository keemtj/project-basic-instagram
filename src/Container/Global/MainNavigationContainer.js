import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MainNavigation from '../../Component/Global/MainNavigation';

const MainNavigationContainer = ({ openModal }) => {
  // ! redux
  const { photoURL, displayName } = useSelector(
    state => state.user.currentUser,
  );

  const [popup, setPopup] = useState(false);
  const onPopup = () => {
    setPopup(true);
  };

  return (
    <MainNavigation
      openModal={openModal}
      photoURL={photoURL || '/images/default_profile2.jpg'}
      displayName={displayName}
      popup={popup}
      setPopup={setPopup}
      onPopup={onPopup}
    />
  );
};

export default MainNavigationContainer;
