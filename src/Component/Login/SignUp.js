import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignUpBoxContainer from '../../Container/Login/SignUpBoxContainer';

const SignUp = () => {
  return (
    <StLoginWrappr>
      <StLogin>
        <SignUpBoxContainer />
        <StQuestionBox>
          <StText>계정이 있으신가요?</StText>
          <Link to="/login">
            <StSignUp>로그인</StSignUp>
          </Link>
        </StQuestionBox>
      </StLogin>
    </StLoginWrappr>
  );
};

const StLoginWrappr = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
`;

const StLogin = styled.main`
  flex-grow: 1;
  background: ${({ theme }) => theme.background};
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
  border: 1px solid ${({ theme }) => theme.gray};
  background: ${({ theme }) => theme.white};
  font-size: 1.4rem;
`;

const StText = styled.span`
  display: inline-block;
  height: 1.6rem;
`;

const StSignUp = styled.button`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.activeBlue};
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;

export default SignUp;
