import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

const Login = ({ onClickLogin }) => {
  return (
    <StLoginWrappr>
      <StLogin>
        <StLoginBox>
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <button>로그인</button>
          <button onClick={onClickLogin}>구글로그인</button>
        </StLoginBox>
      </StLogin>
      <Footer />
    </StLoginWrappr>
  );
};

const StLoginWrappr = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
`;

const StLogin = styled.main`
  flex-grow: 1;
  background-color: #fafafa;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const StLoginBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

export default Login;
