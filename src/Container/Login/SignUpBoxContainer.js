import React, { useEffect } from 'react';
import SignUpBox from '../../Component/Login/SignUpBox';
import {
  firebaseAuth,
  firestore,
  googleProvider,
} from '../../services/firebase';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, signUpError, signUpForm } from '../../Modules/signup';

const SignUpBoxContainer = () => {
  // ! redux
  const { form, error } = useSelector(rootState => rootState.signup);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, username, displayName, password } = form;

  // ! event
  const onChangeInput = ({ target }) => {
    dispatch(signUpForm({ name: target.name, value: target.value }));
  };

  const handleGoogleSignup = async () => {
    try {
      const createUser = await firebaseAuth.signInWithPopup(googleProvider);
      await firestore
        .collection('users')
        .doc(firebaseAuth.currentUser.uid)
        .set({
          uid: createUser.user.uid,
          email: createUser.user.email,
          username: '',
          displayName: '',
          photoURL: '/images/default_profile.png',
        });
      await firebaseAuth.signOut();
      dispatch(resetForm());
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      history.push('/login');
    } catch (e) {
      const { code, message } = e;
      dispatch(
        signUpError({
          code,
          message,
        }),
      );
    }
  };

  const handleSignUp = async e => {
    e.preventDefault();
    try {
      if (email.length && password.length >= 6) {
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await firestore
          .collection('users')
          .doc(firebaseAuth.currentUser.uid)
          .set({
            uid: createUser.user.uid,
            email,
            username,
            displayName,
            photoURL: '/images/default_profile.png',
          });
        await firestore
          .collection('follow')
          .doc(firebaseAuth.currentUser.uid)
          .set({
            following: [],
            followers: [],
            uid: firebaseAuth.currentUser.uid,
            displayName,
          });
        history.push('/');
        dispatch(resetForm());
        console.log(`🎉 ${displayName}님의 회원가입을 축하합니다! 🎉`);
      } else {
        dispatch(
          signUpError({
            code: 'signup/NothingEmailAndPassword',
            message: '빈 칸을 형식에 맞게 모두 입력하세요.',
          }),
        );
      }
    } catch (e) {
      const { code, message } = e;
      dispatch(
        signUpError({
          code,
          message,
        }),
      );
    }
  };

  useEffect(() => {
    document.title = 'SignUp - instagram';
    dispatch(resetForm());
  }, [resetForm]);

  return (
    <SignUpBox
      onChangeInput={onChangeInput}
      handleGoogleSignup={handleGoogleSignup}
      handleSignUp={handleSignUp}
      email={email}
      username={username}
      displayName={displayName}
      password={password}
      error={error}
    />
  );
};

export default SignUpBoxContainer;
