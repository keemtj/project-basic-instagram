import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Aside from '../../Component/Main/Aside';
import { signOut } from '../../services/firebaseAuth';
import { loginState } from '../../Modules/login';
import { resetFollow } from '../../Modules/user';

const AsideContainer = () => {
  const { displayName, photoURL } = useSelector(
    state => state.user.currentUser,
  );
  const { followers } = useSelector(state => state.user.follow);
  const { data: followed } = useSelector(state => state.user.followed);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    signOut();
    dispatch(loginState(false));
    dispatch(resetFollow());
    history.push('/login');
    console.log('sign out');
  };

  const onFollow = e => {
    if (!followers.includes(e.target.previousSibling.innerText)) {
      console.log('아직 내가 팔로우 안한 유저');
      // e.target.innerText = '팔로잉';
    }
  };

  return (
    <Aside
      handleSignOut={handleSignOut}
      displayName={displayName}
      photoURL={photoURL}
      followed={followed}
      onFollow={onFollow}
    />
  );
};

export default AsideContainer;
