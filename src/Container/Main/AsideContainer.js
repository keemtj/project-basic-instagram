import React from 'react';
import Aside from '../../Component/Main/Aside';
import { useHistory } from 'react-router';
import { signOut } from '../../services/firebaseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { loginState } from '../../Modules/login';
import { followedMe } from '../../Modules/user';
import { firebaseAuth } from '../../services/firebase';

const AsideContainer = () => {
  const { displayName, photoURL } = useSelector(
    state => state.user.currentUser,
  );
  const { followers } = useSelector(state => state.user.follow);
  const { data: followed } = useSelector(state => state.user.followed);
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

  const onFollow = e => {
    if (!followers.includes(e.target.previousSibling.innerText)) {
      console.log('아직 내가 팔로우 안한 유저');
      // e.target.innerText = '팔로잉';
    }
  };

  React.useEffect(async () => {
    const { uid } = firebaseAuth.currentUser;
    dispatch(followedMe(uid));
  }, []);

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
