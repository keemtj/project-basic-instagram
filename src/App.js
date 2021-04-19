import React, { useEffect } from 'react';
import MainRouter from './Router/mainRouter';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import { firebaseAuth } from './services/firebase';
import { loginState } from './Modules/login';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  // ! redux
  const isSignIn = useSelector(state => state.login.isSignIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // ! auth state check
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(loginState(true));
      } else {
        dispatch(loginState(false));
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
