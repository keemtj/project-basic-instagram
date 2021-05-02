import React, { useEffect } from 'react';
import MainRouter from './Router/MainRouter';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import { firebaseAuth } from './services/firebase';
import { loginState } from './Modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, followData } from './Modules/user';
import { getCurrentUserData, getFollowData } from './services/firestore';

/**
 * NOTE App -> dispatch
 * @param loginState 로그인 상태 유지
 * @param currentUser 현재 로그인 유저의 데이터
 * @param followData 현재 로그인 유저의 팔로우 데이터
 * @param getPosts 현재 로그인 유저의 모든 포스트 데이터
 *
 * NOTE
 * 전체 포스트 이미지 가져오기
 */

const App = () => {
  const isSignIn = useSelector(state => state.login.isSignIn);
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userData = await getCurrentUserData(uid);
        const userFollowData = await getFollowData(uid);
        dispatch(loginState(true));
        dispatch(currentUser(userData));
        dispatch(followData(userFollowData));
      }
    });
  }, []);

  return (
    <>
      <ResetStyle />
      <PageWrapper>
        <MainRouter isSignIn={isSignIn} />
      </PageWrapper>
    </>
  );
};

export default App;
