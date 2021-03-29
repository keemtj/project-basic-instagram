import React from 'react';
import styled from 'styled-components';
import { Google2 } from '@styled-icons/icomoon/Google2';
import Input from '../Global/Input';
import {
  firebaseAuth,
  firestore,
  googleProvider,
} from '../../services/firebase';
import { useHistory } from 'react-router';

const SignUpBox = () => {
  const history = useHistory();
  const { useState } = React;
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignup = async () => {
    try {
      const createUser = await firebaseAuth.signInWithPopup(googleProvider);
      await firestore.collection('users').add({
        uid: createUser.user.uid,
        email: createUser.user.email,
        fullname: '',
        username: '',
        followers: [],
        following: [],
        profileSrc: '',
        dateCreated: Date.now(),
      });
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    const usernameQuery = await firestore
      .collection('users')
      .where('username', '==', username)
      .get();
    console.log('query', usernameQuery);
    const usernameExists = usernameQuery.docs.map(
      user => user.data().length > 0,
    );
    console.log('exists', usernameExists);
    if (usernameExists) {
      try {
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await createUser.user.updateProfile({ displayName: username });
        console.log(createUser);
        await firestore.collection('users').add({
          uid: createUser.user.uid,
          username,
          fullname,
          email,
          followers: [],
          following: [],
          profileSrc: '',
          dateCreated: Date.now(),
        });
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        history.push('/');
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  React.useEffect(() => {
    document.title = 'Signup - instagram';
  }, []);

  return (
    <StSignUpBox>
      <StLogo
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        alt="instagram"
      />
      <StNotice>친구들의 사진과 동영상을 보려면 가입하세요.</StNotice>
      <StGoogleLogin onClick={handleGoogleSignup}>
        <StGoogleIcon />
        <span>Google로 로그인</span>
      </StGoogleLogin>
      <StContour>
        <StLine></StLine>
        <StOr>또는</StOr>
        <StLine></StLine>
      </StContour>
      <StSignUpForm onSubmit={handleSignup}>
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="성명"
          value={fullname}
          onChange={e => setFullname(e.target.value)}
        />
        <Input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <StButton type="submit">가입</StButton>
      </StSignUpForm>
      {/* {emailError && (
        <p style={{ height: '2rem', width: '27rem' }}>{emailError}</p>
      )}
      {passwordError && (
        <p style={{ height: '2rem', width: '27rem' }}>{passwordError}</p>
      )}
      {user && <p style={{ height: '2rem', width: '27rem' }}>{user}</p>} */}
      <StNotice2>
        가입하면 Instagram의 약관, 데이터 정책 및 쿠기 정책에 동의하게 됩니다.
      </StNotice2>
    </StSignUpBox>
  );
};

const StSignUpBox = styled.div`
  padding: 3rem 0rem;
  background: white;
  width: 35rem;
  height: fit-content;
  border: 1px solid rgba(219, 219, 219, 1);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-center;
`;

const StLogo = styled.img`
  width: 17rem;
  margin: 0 autos;
`;

const StNotice = styled.div`
  margin-top: 1.5rem;
  width: 27rem;
  color: #828282;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
`;

const StGoogleLogin = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: #0095f6;
  border-radius: 3px;
  margin-top: 1.5rem;
  width: 27rem;
  height: 3rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
`;

const StGoogleIcon = styled(Google2)`
  margin-right: 0.5rem;
  width: 1.8rem;
  color: white;
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

const StSignUpForm = styled.form`
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

const StNotice2 = styled.div`
  margin-top: 1.5rem;
  width: 27rem;
  font-size: 1.2rem;
  text-align: center;
  color: #828282;
`;

export default SignUpBox;