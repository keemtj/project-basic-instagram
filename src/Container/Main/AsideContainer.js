import React from 'react';
import Aside from '../../Component/Main/Aside';
import { useHistory } from 'react-router';
import { signOut } from '../../services/firebaseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { loginState } from '../../Modules/login';

const AsideContainer = () => {
  const { displayName, photoURL, following } = useSelector(
    state => state.user.currentUser,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(loginState(false));
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
