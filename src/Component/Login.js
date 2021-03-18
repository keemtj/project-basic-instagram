import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

const Login = ({ onClickLogin }) => {
  return (
    <StLoginWrappr>
      <StLogin>
        <StLoginBox>
          <StLogo
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
            alt="instagram"
          />
          <StLoginForm>
            <StInput type="email" placeholder="이메일" />
            <StInput type="password" placeholder="비밀번호" />
            <StButton type="submit">로그인</StButton>
          </StLoginForm>
          <StContour>
            <StLine></StLine>
            <StOr>또는</StOr>
            <StLine></StLine>
          </StContour>
          <button onClick={onClickLogin}>Google로 로그인</button>
        </StLoginBox>
        <StSignUpBox>계정이 없으신가요? 가입하기</StSignUpBox>
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
  background: white;
  width: 35rem;
  height: 36rem;
  border: 1px solid rgba(219, 219, 219, 1);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-center;
`;

const StLoginForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StInput = styled.input`
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 3px;
  background-color: #fafafa;
  width: 27rem;
  height: 3.8rem;
  padding: 0.5rem 1rem;
  & + & {
    margin-top: 0.7rem;
  }
`;

const StButton = styled.button`
  /* input에 채워져있을 때 */
  /* background: #0095f6; */
  background: rgba(0, 149, 246, 0.3);
  width: 27rem;
  height: 3rem;
  border-radius: 3px;
  margin-top: 1.5rem;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
`;

const StContour = styled.div`
  width: 27rem;
  display: flex;
  flex-flow: row nowrap;
`;

const StLine = styled.div`
  border-top: 1px solid rgba(219, 219, 219, 1);
  flex-grow: 1;
  transform: translate(0%, 50%);
`;

const StOr = styled.div`
  width: 5rem;
  margin: 2rem 0rem;
  color: #828282;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
`;

const StLogo = styled.img`
  width: 17rem;
  margin: 4rem auto;
`;

const StSignUpBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  width: 35rem;
  height: 6.5rem;
  border: 1px solid rgba(219, 219, 219, 1);
  background-color: white;
`;

export default Login;
