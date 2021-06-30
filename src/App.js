import React, { useState, useEffect } from 'react';
import ResetStyle from './Style/ResetStyle';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { firebaseAuth } from './services/firebase';
import {
  getBookmarksData,
  getCurrentUserData,
  getCurrentUserFollowData,
  getHeartsData,
} from './services/firestore';
import { loginState } from './Modules/login';
import { currentUserData, currentUserFollowData } from './Modules/user';
import { getMainPosts } from './Modules/posts';
import { getBookmarks } from './Modules/saved';
import { getHearts } from './Modules/heart';
import PageWrapper from './Component/Global/PageWrapper';
import HeaderContainer from './Container/Global/HeaderContainer';
import MainRouter from './Router/MainRouter';
import ProgressBar from './Component/Global/ProgressBar';
import NewPost from './Component/New/NewPost';
import PostSettingModal from './Component/Main/PostSettingModal';
import ToastPopup from './Component/Global/ToastPopup';
import PostModal from './Component/Profile/PostModal';
import HeartCountModal from './Component/Main/HeartCountModal';
import ProfileEditModal from './Container/Profile/ProfileEditModal';
import PostShareModal from './Component/Main/PostShareModal';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [progress, setProgress] = useState(0);
  const isSignIn = useSelector(state => state.login.isSignIn);
  const {
    newPostModal: newPostModalState,
    postModal: postModalState,
    postSettingModal: postSettingModalState,
    postHeartCountModal: postHeartCountModalState,
    profileEditModal: profileEditModalState,
    postSharePopup: postSharePopupState,
    activePostsData,
    activePostId,
    activeIndexValue,
  } = useSelector(state => state.popup);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userData = await getCurrentUserData(uid);
        const bookmarksData = await getBookmarksData(uid);
        const heartsData = await getHeartsData(uid);
        const followData = await getCurrentUserFollowData(uid);
        dispatch(loginState(true)); // 로그인 상태 true
        dispatch(currentUserData(userData)); // 현재 로그인 유저 데이터
        dispatch(getMainPosts(uid)); // 현재 로그인 유저와 팔로잉 유저의 전체 포스트 데이터
        dispatch(getBookmarks(bookmarksData.bookmarks)); // 현재 로그인 유저의 북마크 데이터
        dispatch(getHearts(heartsData.hearts)); // 현재 로그인 유저의 좋아요 데이터
        dispatch(currentUserFollowData(followData)); // 현재 로그인 유저의 팔로우 데이터
      } else {
        history.push('/login');
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
        {postSettingModalState && <PostSettingModal />}
        {postModalState && (
          <PostModal
            posts={activePostsData}
            id={activePostId}
            index={activeIndexValue}
          />
        )}
        {postHeartCountModalState && <HeartCountModal />}
        {postSharePopupState && <PostShareModal />}
        {profileEditModalState && <ProfileEditModal />}
        <ToastPopup />
      </PageWrapper>
    </>
  );
};

export default App;
