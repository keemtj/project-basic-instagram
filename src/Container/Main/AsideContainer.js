import React from 'react';
import Aside from '../../Component/Main/Aside';
import { useHistory } from 'react-router';
import { signOut } from '../../services/firebaseAuth';
import { useSelector } from 'react-redux';

const AsideContainer = () => {
  const { displayName, photoURL, following } = useSelector(
    state => state.user.currentUser,
  );
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOut();
      history.push('/login');
      console.log('sign out');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Aside
      handleSignOut={handleSignOut}
      displayName={displayName}
      photoURL={photoURL}
      following={following}
    />
  );
};

export default AsideContainer;
