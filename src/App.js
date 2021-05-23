import React, { useState, useEffect } from 'react';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import HeaderContainer from './Container/Global/HeaderContainer';
import MainRouter from './Router/MainRouter';
import ProgressBar from './Component/Global/ProgressBar';
import NewPost from './Component/New/NewPost';
import { firebaseAuth } from './services/firebase';
import { loginState } from './Modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, currentUserFollow } from './Modules/user';
import { getCurrentUserData, getFollowData } from './services/firestore';
import { getPosts } from './Modules/posts';

const App = () => {
  const dispatch = useDispatch();
  const isSignIn = useSelector(state => state.login.isSignIn);
  const {
    newPostModal: newPostModalState,
    postModal: postModalState,
  } = useSelector(state => state.popup);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const currentUserData = await getCurrentUserData(uid);
        const currentUserFollowData = await getFollowData(uid);
        dispatch(loginState(true));
        dispatch(currentUser(currentUserData));
        dispatch(currentUserFollow(currentUserFollowData));
        dispatch(getPosts(uid));
      }
    });
  }, [dispatch]);

  return (
    <>
      <ResetStyle />
      <PageWrapper>
        <HeaderContainer />
        <MainRouter isSignIn={isSignIn} />
        {progress !== 0 && <ProgressBar progress={progress} />}
        {newPostModalState && <NewPost setProgress={setProgress} />}
        {postModalState && <div>post modal~</div>}
      </PageWrapper>
    </>
  );
};

export default App;

/**
 * NOTE App -> dispatch
 * @param loginState 로그인 상태 유지
 * @param currentUser 현재 로그인 유저의 데이터
 * @param followData 현재 로그인 유저의 팔로우 데이터
 * @param getPosts 현재 로그인 유저의 모든 포스트 데이터
 */

/**
 * TODO: 필요한 작업
 * NOTE Tagged, saved, IGTV(릴스) 페이지
 * 1. 데이터 없을 때 보여주는 default 컴포넌트
 *
 * NOTE 팔로우, 팔로잉 기능
 * 1. 팔로잉 -> 바로 적용
 * 2. 언팔로잉 -> 모달로 취소 여부 확인(option)
 *
 * NOTE 프로필 편집 페이지
 * 1. 프로필 이미지
 *    -> 사진 업로드
 *    -> 현재 프로필 이미지 삭제 -> default profile image보여주기
 *    -> 취소
 * 2. 이름(username)
 * 3. 사용자 이름(displayName)
 * 4. 소개(presentation)
 *
 * NOTE main page에서 북마크한 포스트 렌더링하기
 *
 * NOTE carousel hover ui
 * 1. mousehover시 haertCount || 0, commment.length || 0 넣기
 */
