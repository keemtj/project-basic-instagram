import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from './services/firebase';
import {
  getBookmarksData,
  getCurrentUserData,
  getCurrentUserFollowData,
  getHeartsData,
} from './services/firestore';
import { loginState } from './Modules/login';
import { currentUserData, currentUserFollowData } from './Modules/user';
import { getFollowingPosts, getPosts } from './Modules/posts';
import { getBookmarks } from './Modules/saved';
import { getHearts } from './Modules/heart';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import HeaderContainer from './Container/Global/HeaderContainer';
import MainRouter from './Router/MainRouter';
import ProgressBar from './Component/Global/ProgressBar';
import NewPost from './Component/New/NewPost';

const App = () => {
  const dispatch = useDispatch();
  const isSignIn = useSelector(state => state.login.isSignIn);
  const { newPostModal: newPostModalState } = useSelector(state => state.popup);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userData = await getCurrentUserData(uid);
        const followData = await getCurrentUserFollowData(uid);
        const bookmarksData = await getBookmarksData(uid);
        const heartsData = await getHeartsData(uid);
        dispatch(loginState(true)); // 로그인 상태 true
        dispatch(currentUserData(userData)); // 현재 로그인 유저 데이터
        dispatch(currentUserFollowData(followData)); // 현재 로그인 유저의 팔로우 데이터
        dispatch(getPosts(uid)); // 현재 로그인 유저의 포스트
        dispatch(getFollowingPosts(followData.following)); // 현재 로그인 유저의 팔로우 포스트 데이터
        dispatch(getBookmarks(bookmarksData.bookmarks)); // 현재 로그인 유저의 북마크 데이터
        dispatch(getHearts(heartsData.hearts)); // 현재 로그인 유저의 좋아요 데이터
      }
    });
  }, []);

  return (
    <>
      <ResetStyle />
      <PageWrapper>
        {isSignIn && <HeaderContainer />}
        <MainRouter isSignIn={isSignIn} />
        {progress !== 0 && <ProgressBar progress={progress} />}
        {newPostModalState && <NewPost setProgress={setProgress} />}
      </PageWrapper>
    </>
  );
};

export default App;
