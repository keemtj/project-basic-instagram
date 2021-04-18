import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginBox from '../../Component/Login/LoginBox';
import { addEmail, addError, addPassword } from '../../Modules/login';
import { firebaseAuth, googleProvider } from '../../services/firebase';

const LoginBoxContainer = () => {
  const { email, password, error } = useSelector(rootState => rootState.login);
  const dispatch = useDispatch();

  const onLogin = ({ target }) => {
    if (target.name === 'email') {
      dispatch(addEmail(target.value));
    }
    if (target.name === 'password') {
      dispatch(addPassword(target.value));
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      if (email.length && password.length >= 6) {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
        dispatch(addEmail(''));
        dispatch(addPassword(''));
        dispatch(addError({ code: '', message: '' }));
      } else {
        dispatch(
          addError({
            code: 'auth/NothingEmailAndPassword',
            message: '이메일 혹은 비밀번호를 입력하세요.',
          }),
        );
      }
    } catch (e) {
      const { code, message } = e;
      dispatch(addError({ code, message }));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await firebaseAuth.signInWithPopup(googleProvider);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <LoginBox
      onLogin={onLogin}
      handleLogin={handleLogin}
      handleGoogleLogin={handleGoogleLogin}
      email={email}
      password={password}
      error={error}
    />
  );
};

export default LoginBoxContainer;
