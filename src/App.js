import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Home from './Component/Home';
import Login from './Component/Login/Login';
import { firebaseAuth } from './services/firebase';
import ResetStyle from './Style/ResetStyle';

function App() {
  const history = useHistory();
  const [isSignin, setSignin] = useState(false);

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        history.push('/');
      } else {
        history.push('/login');
      }
    });
  });

  return (
    <>
      <ResetStyle />
      {isSignin ? (
        <Home setSignin={setSignin} />
      ) : (
        <Login setSignin={setSignin} />
      )}
    </>
  );
}

export default App;
