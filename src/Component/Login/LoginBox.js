import React from 'react';
import styled from 'styled-components';
import { Google2 } from '@styled-icons/icomoon/Google2';
import Input from '../Global/Input';

const LoginBox = ({
  onLogin,
  handleLogin,
  handleGoogleLogin,
  email,
  password,
  error,
}) => {
  const { message } = error;
  return (
    <StLoginBox>
      <StLogo
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        alt="instagram"
      />
      <StLoginForm onSubmit={handleLogin}>
        <Input
          name="email"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onLogin}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onLogin}
        />
        <StButton type="submit" valid={password.length}>
          로그인
        </StButton>
        {message && <StErrorBox>{message}</StErrorBox>}
      </StLoginForm>
      <StContour>
        <StLine></StLine>
        <StOr>또는</StOr>
        <StLine></StLine>
      </StContour>
      <StGoogleLogin onClick={handleGoogleLogin}>
        <StGoogleIcon />
        <span>Google로 로그인</span>
      </StGoogleLogin>
      <StForget>비밀번호를 잊으셨나요?</StForget>
    </StLoginBox>
  );
};

const StLoginBox = styled.div`
  padding: 1.5rem 0rem;
  background: white;
  width: 35rem;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.gray};
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

const StButton = styled.button`
  background: ${({ valid, theme }) =>
    valid >= 6 ? theme.activeBlue : theme.inactiveBlue};
  width: 27rem;
  height: 3rem;
  border-radius: 3px;
  margin-top: 1.5rem;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: ${({ valid }) => (valid >= 6 ? 'pointer' : 'default')};
`;

const StErrorBox = styled.div`
  width: 27rem;
  height: auto;
  margin-top: 1.5rem;
  color: red;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.3;
  word-break: keep-all;
`;

const StContour = styled.div`
  width: 27rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const StLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.gray};
  flex-grow: 1;
`;

const StOr = styled.div`
  width: 5rem;
  margin: 2rem 0rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
`;

const StGoogleLogin = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 27rem;
  color: ${({ theme }) => theme.google};
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
`;

const StGoogleIcon = styled(Google2)`
  margin-right: 0.5rem;
  width: 1.8rem;
  color: ${({ theme }) => theme.google};
`;

const StForget = styled.button`
  margin-top: 2rem;
  width: 27rem;
  color: ${({ theme }) => theme.google};
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const StLogo = styled.img`
  width: 17rem;
  margin: 4rem auto;
`;

export default LoginBox;
