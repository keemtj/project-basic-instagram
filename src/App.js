import React, { useState, useEffect } from 'react';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import HeaderContainer from './Container/Global/HeaderContainer';
import MainRouter from './Router/MainRouter';
import ProgressBar from './Component/Global/ProgressBar';
import NewPost from './Component/New/NewPost';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from './services/firebase';
import { loginState } from './Modules/login';
import { getCurrentUserData, getCurrentUserFollowData } from './Modules/user';
import { getPosts } from './Modules/posts';

const App = () => {
  const dispatch = useDispatch();
  const isSignIn = useSelector(state => state.login.isSignIn);
  const { newPostModal: newPostModalState } = useSelector(state => state.popup);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        dispatch(loginState(true));
        dispatch(getCurrentUserData(uid));
        dispatch(getPosts(uid));
        dispatch(getCurrentUserFollowData(uid));
      }
    });
  }, [dispatch]);

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
