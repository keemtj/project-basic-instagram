import React from 'react';
import Login from '../../Component/Login/Login';

const LoginContainer = () => {
  React.useEffect(() => {
    document.title = '로그인 • Instagram';
  }, []);
  return <Login />;
};

export default LoginContainer;
