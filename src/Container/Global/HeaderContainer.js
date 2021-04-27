import React, { useState, useEffect } from 'react';
import Header from '../../Component/Global/Header';

const HeaderContainer = () => {
  const [modalState, setModalState] = useState(false);
  const [progress, setProgress] = useState(0);

  const openModal = () => {
    console.log('open new post!');
    setModalState(!modalState);
  };

  const closeModal = () => {
    console.log('close new post!');
    setModalState(!modalState);
  };

  useEffect(() => {
    document.body.style.overflow = modalState ? 'hidden' : 'auto';
  }, [modalState]);
  return (
    <Header
      modalState={modalState}
      progress={progress}
      setProgress={setProgress}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default HeaderContainer;
