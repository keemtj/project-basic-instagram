import React from 'react';
import Info from './Component/Info';
import Login from './Component/Login';
import ResetStyle from './Style/ResetStyle';
import {
  // uiConfig,
  firebaseAuth,
  googleProvider,
} from './services/firebase';

function App() {
  const [isSignIn, setIsSignIn] = React.useState(false);
  const onClickLogin = () => {
    firebaseAuth
      .signInWithPopup(googleProvider)
      .then(result => {
        const credential = result.credential;
        const token = credential.accessToken;
        const user = result.user;
        const uid = result.user.uid;
        console.log(credential, token, user, uid);
      })
      .then(() => setIsSignIn(true));
  };
  return (
    <>
      <ResetStyle />
      {isSignIn ? <Info /> : <Login onClickLogin={onClickLogin} />}
    </>
  );
}

export default App;
