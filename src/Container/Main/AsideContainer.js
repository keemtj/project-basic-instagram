import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Aside from '../../Component/Main/Aside';
import { signOut } from '../../services/firebaseAuth';
import { loginState } from '../../Modules/login';
import { postDataClear } from '../../Modules/posts';
import { userDataClear } from '../../Modules/user';
import { searchDataClear } from '../../Modules/search';

const AsideContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { displayName, photoURL } = useSelector(
    state => state.user.currentUser,
  );

  const handleSignOut = () => {
    /**
     * TODO: 1. 로그아웃시 localStorage의 'recent' key 기록 삭제
     * TODO: 2. 재 로그인시 검색기록을 가져오기 위해 파이어베이스에 저장하는 코드 추가
     */
    dispatch(postDataClear()); // post data clear
    dispatch(userDataClear()); // user data clear
    dispatch(searchDataClear()); // search data clear
    dispatch(loginState(false)); // route loggin state false
    signOut(); // firebase auth sign out
    history.push('/login'); // or window.location.href('/login');
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
      displayName={displayName}
      photoURL={photoURL}
      // followed={followed}
      // onFollow={onFollow}
    />
  );
};

export default AsideContainer;
