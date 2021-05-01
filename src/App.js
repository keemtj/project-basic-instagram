import React, { useEffect } from 'react';
import MainRouter from './Router/MainRouter';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import { firebaseAuth } from './services/firebase';
import { loginState } from './Modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, followData } from './Modules/user';
import { getCurrentUserData, getFollowData } from './services/firestore';
import { getAllPostsByCurrentUid } from './Modules/main';

const App = () => {
  // ! redux
  const isSignIn = useSelector(state => state.login.isSignIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // ! auth state check
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userData = await getCurrentUserData(uid);
        const userFollowData = await getFollowData(uid);
        dispatch(loginState(true));
        dispatch(currentUser(userData));
        dispatch(followData(userFollowData));
        dispatch(getAllPostsByCurrentUid(uid));
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
