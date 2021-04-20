import React, { useEffect } from 'react';
import MainRouter from './Router/mainRouter';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import {
  firebaseAuth,
  // firestore
} from './services/firebase';
import { loginState } from './Modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './Modules/user';
import { getCurrentUserData } from './services/firestore';
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
        dispatch(currentUser(userData));
        dispatch(getAllPostsByCurrentUid(uid));
        dispatch(loginState(true));

        // // test
        // firestore
        //   .collection('users')
        //   .get()
        //   .then(querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //       // doc.data() is never undefined for query doc snapshots
        //       console.log(' => ', doc.data());
        //     });
        //   });
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
