import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainNavigation from '../../Component/Global/MainNavigation';
import { openPopup } from '../../Modules/popup';

const MainNavigationContainer = ({ openModal }) => {
  const dispatch = useDispatch();
  const { photoURL, displayName } = useSelector(
    state => state.user.currentUser,
  );
  const popupState = useSelector(state => state.popup.profilePopup);

  const onPopup = () => {
    dispatch(openPopup('profilePopup'));
  };

  return (
    <MainNavigation
      openModal={openModal}
      photoURL={photoURL || '/images/default_profile2.jpg'}
      displayName={displayName}
      onPopup={onPopup}
      popupState={popupState}
    />
  );
};

export default MainNavigationContainer;
