import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Aside from '../../Component/Main/Aside';
import { signOut } from '../../services/firebaseAuth';
import { loginState } from '../../Modules/login';
import { dataClear } from '../../Modules/posts';

const AsideContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data } = useSelector(state => state.user.currentUser);

  const handleSignOut = () => {
    dispatch(dataClear());
    dispatch(loginState(false));
    signOut();
    history.push('/login');
    console.log('sign out');
  };

  // const onFollow = e => {
  //   if (!followers.includes(e.target.previousSibling.innerText)) {
  //     console.log('아직 내가 팔로우 안한 유저');
  //     // e.target.innerText = '팔로잉';
  //   }
  // };

  return (
    <Aside
      handleSignOut={handleSignOut}
      displayName={data?.displayName || 'displayName'}
      photoURL={data?.photoURL || '/images/default_profile.png'}
      // followed={followed}
      // onFollow={onFollow}
    />
  );
};

export default AsideContainer;
