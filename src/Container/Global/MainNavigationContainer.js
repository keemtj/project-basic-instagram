import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import MainNavigation from '../../Component/Global/MainNavigation';
import { openPopup } from '../../Modules/popup';

const MainNavigationContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const { displayName, photoURL } = useSelector(
    state => state.user.currentUser,
  );
  const { profilePopup, newPostModal } = useSelector(state => state.popup);

  const onPopup = () => {
    dispatch(openPopup('profilePopup'));
  };

  const openModal = () => {
    console.log('open new post!');
    dispatch(openPopup('newPostModal'));
  };

  return (
    <MainNavigation
      photoURL={photoURL || '/images/default_image.png'}
      displayName={displayName || 'displayName'}
      onPopup={onPopup}
      openModal={openModal}
      profilePopup={profilePopup}
      newPostModal={newPostModal}
      path={path}
    />
  );
};

export default MainNavigationContainer;

/**
 * NOTE active === true
 * 1. home
 * profilePopup === false
 * && newPostModal === false
 * && match.path === '/'
 *
 * 2. direct
 * profilePopup === false
 * && newPostModal === false
 * && match.path === '/direct'
 *
 * 3. new post
 * newPostModal === true
 *
 * 4. profile popup
 * profilePopup === true
 * || path === '/:displayName'
 */
