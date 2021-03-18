import React from 'react';
import Main from './Component/Main';
import Login from './Component/Login';
import ResetStyle from './Style/ResetStyle';
import { firebaseAuth, googleProvider } from './services/firebase';

function App() {
  const [isSignIn, setIsSignIn] = React.useState(false);

  const onClickLogin = () => {
    firebaseAuth
      .signInWithPopup(googleProvider)
      .then(result => {
        const credential = result.credential;
        const token = credential.accessToken;
        // const { displayName, email } = token;
        // const user = result.user;
        const uid = result.user.uid;
        console.log('credential', credential, token, uid);
        const resultData = [uid, token];
        return resultData;
      })
      .then(r => console.log(r))
      .then(() => setIsSignIn(true));
  };
  return (
    <>
      <ResetStyle />
      {isSignIn ? <Main /> : <Login onClickLogin={onClickLogin} />}
    </>
  );
}

export default App;
