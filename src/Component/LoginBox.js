import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Google2 } from '@styled-icons/icomoon/Google2';
import Input from './Global/Input';
import { firebaseAuth } from '../services/firebase';

const LoginBox = ({ setSignin }) => {
  const { useState } = React;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      setSignin(true);
      console.log('login 성공');
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - instagram';
  }, []);

  return (
    <StLoginBox>
      <StLogo
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        alt="instagram"
      />
      <StLoginForm onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <StButton type="submit">로그인</StButton>
      </StLoginForm>
      <StContour>
        <StLine></StLine>
        <StOr>또는</StOr>
        <StLine></StLine>
      </StContour>
      <StGoogleLogin>
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
  align-items: center;
  justify-content: center;
`;

const StLine = styled.div`
  border-top: 1px solid rgba(219, 219, 219, 1);
  flex-grow: 1;
`;

const StOr = styled.div`
  width: 5rem;
  margin: 2rem 0rem;
  color: #828282;
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
  color: #385185;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
`;

const StGoogleIcon = styled(Google2)`
  margin-right: 0.5rem;
  width: 1.8rem;
  color: #385185;
`;

const StForget = styled.button`
  margin-top: 2rem;
  width: 27rem;
  color: #385185;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const StLogo = styled.img`
  width: 17rem;
  margin: 4rem auto;
`;

export default LoginBox;
