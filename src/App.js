import React, { useState } from 'react';
import Home from './Component/Home';
import Login from './Component/Login/Login';
import ResetStyle from './Style/ResetStyle';

function App() {
  const [isSignin, setSignin] = useState(true);
  return (
    <>
      <ResetStyle />
      {isSignin ? <Home /> : <Login setSignin={setSignin} />}
    </>
  );
}

export default App;
