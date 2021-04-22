import React from 'react';
import MainRouter from './Router/MainRouter';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import { firebaseAuth } from './services/firebase';
import { loginState } from './Modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './Modules/user';
import { getCurrentUserData } from './services/firestore';

const App = () => {
  // ! redux
  const isSignIn = useSelector(state => state.login.isSignIn);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // ! auth state check
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userData = await getCurrentUserData(uid);
        dispatch(currentUser(userData));
        dispatch(loginState(true));
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
