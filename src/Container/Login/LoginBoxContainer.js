import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginBox from '../../Component/Login/LoginBox';
import { addForm, addError, resetForm } from '../../Modules/login';
import { firebaseAuth, googleProvider } from '../../services/firebase';

const LoginBoxContainer = () => {
  // ! redux
  const { form, error } = useSelector(rootState => rootState.login);
  const dispatch = useDispatch();
  const { email, password } = form;

  // ! event
  const onChangeInput = ({ target }) => {
    dispatch(addForm({ name: target.name, value: target.value }));
  };

  const handleLoginForm = async e => {
    e.preventDefault();
    try {
      if (email.length && password.length >= 6) {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
        dispatch(addError({ code: '', message: '' }));
        dispatch(resetForm());
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
      onChangeInput={onChangeInput}
      handleLoginForm={handleLoginForm}
      handleGoogleLogin={handleGoogleLogin}
      email={email}
      password={password}
      error={error}
    />
  );
};

export default LoginBoxContainer;
