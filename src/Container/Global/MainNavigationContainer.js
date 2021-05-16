import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import MainNavigation from '../../Component/Global/MainNavigation';
import { modalEntryPath, openPopup } from '../../Modules/popup';

const MainNavigationContainer = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const popupState = useSelector(state => state.popup.profilePopup);
  const { photoURL, displayName } = useSelector(
    state => state.user.currentUser,
  );

  const onPopup = () => {
    dispatch(openPopup('profilePopup'));
  };

  const openModal = () => {
    console.log('open new post!');
    dispatch(modalEntryPath(pathname));
    dispatch(openPopup('newPostModal'));
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
