import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../Component/Global/Header';

const HeaderContainer = () => {
  const newPostModalState = useSelector(state => state.popup.newPostModal);

  useEffect(() => {
    document.body.style.overflow = newPostModalState ? 'hidden' : 'auto';
  }, [newPostModalState]);

  return <Header />;
};

export default HeaderContainer;
