import React, { useEffect } from 'react';
import ResetStyle from './Style/ResetStyle';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { firebaseAuth } from './services/firebase';
import {
  getCurrentUserData,
  getCurrentUserFollowData,
} from './services/firestore';
import { loginState } from './Modules/login';
import { currentUserData, currentUserFollowData } from './Modules/user';
import { getMainPosts, updateLastMainDocs } from './Modules/posts';
import PageWrapper from './Component/Global/PageWrapper';
import HeaderContainer from './Container/Global/HeaderContainer';
import MainRouter from './Router/MainRouter';
// import ProgressBar from './Component/Global/ProgressBar';
import NewPost from './Component/New/NewPost';
import PostSettingModal from './Component/Main/PostSettingModal';
import ToastPopup from './Component/Global/ToastPopup';
import MainPostModal from './Component/Main/MainPostModal';
import HeartCountModal from './Component/Main/HeartCountModal';
import PostShareModal from './Component/Main/PostShareModal';
import ProfileEditModal from './Container/Profile/ProfileEditModal';
import PostsModal from './Component/Profile/PostsModal';
import BookmarksModal from './Component/Profile/BookmarksModal';
import HeartsModal from './Component/Profile/HeartsModal';
import { getRooms } from './Modules/direct';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [progress, setProgress] = React.useState(0);
  const isSignIn = useSelector(state => state.login.isSignIn);
  const {
    newPostModal: newPostModalState,
    postModal: postModalState,
    postSettingModal: postSettingModalState,
    postHeartCountModal: postHeartCountModalState,
    profileEditModal: profileEditModalState,
    postSharePopup: postSharePopupState,
    postsModal: postsModalState,
    bookmarksModal: bookmarksModalState,
    heartsModal: heartsModalState,
  } = useSelector(state => state.popup);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userData = await getCurrentUserData(uid);
        const followData = await getCurrentUserFollowData(uid);
        const uids = [uid, ...followData.following];
        dispatch(loginState(true)); // ????????? ?????? true
        dispatch(currentUserData(userData)); // ?????? ????????? ?????? ?????????
        dispatch(currentUserFollowData(followData)); // ?????? ????????? ????????? ????????? ?????????
        dispatch(getMainPosts({ uids, dispatch, updateLastMainDocs })); // ?????? ????????? ????????? ????????? ????????? ?????? ????????? ?????????
        dispatch(getRooms(uid));
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
        {/* {progress !== 0 && <ProgressBar progress={progress} />} */}
        {newPostModalState && <NewPost />}
        {postSettingModalState && <PostSettingModal />}
        {postModalState && <MainPostModal />}
        {postHeartCountModalState && <HeartCountModal />}
        {postSharePopupState && <PostShareModal />}
        {profileEditModalState && <ProfileEditModal />}
        {postsModalState && <PostsModal />}
        {bookmarksModalState && <BookmarksModal />}
        {heartsModalState && <HeartsModal />}
        <ToastPopup />
      </PageWrapper>
    </>
  );
};

export default App;
