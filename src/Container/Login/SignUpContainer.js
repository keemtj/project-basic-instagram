import React, { useEffect } from 'react';
import SignUp from '../../Component/Login/SignUp';

const SignUpContainer = () => {
  useEffect(() => {
    document.title = '회원 가입 • Instagram';
  }, []);
  return <SignUp />;
};

export default SignUpContainer;
