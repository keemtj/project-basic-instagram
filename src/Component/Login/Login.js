import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LoginRouter from '../../Router/loginRouter';
import Footer from '../Global/Footer';

const Login = ({ setSignin }) => {
  const location = useLocation();

  return (
    <StLoginWrappr>
      <StLogin>
        <LoginRouter setSignin={setSignin} />
        <StQuestionBox>
          {location.pathname === '/login' || location.pathname === '/' ? (
            <>
              <StText>계정이 없으신가요?</StText>
              <Link to="/signup">
                <StSignUp>가입하기</StSignUp>
              </Link>
            </>
          ) : (
            <>
              <StText>계정이 있으신가요?</StText>
              <Link to="/login">
                <StSignUp>로그인</StSignUp>
              </Link>
            </>
          )}
        </StQuestionBox>
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

const StQuestionBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  width: 35rem;
  height: 6.5rem;
  border: 1px solid rgba(219, 219, 219, 1);
  background-color: white;
  font-size: 1.4rem;
`;

const StText = styled.span`
  display: inline-block;
  height: 1.6rem;
`;

const StSignUp = styled.button`
  margin-left: 0.5rem;
  color: #0095f6;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

export default Login;
