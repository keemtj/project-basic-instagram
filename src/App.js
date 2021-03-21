import React, { useState } from 'react';
import Home from './Component/Home';
import Login from './Component/Login';
import ResetStyle from './Style/ResetStyle';

function App() {
  const [isSignin, setSignin] = useState(false);
  return (
    <>
      <ResetStyle />
      {isSignin ? (
        <Home />
      ) : (
        <Login isSignin={isSignin} setSignin={setSignin} />
      )}
    </>
  );
}

export default App;
