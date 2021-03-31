import React from 'react';
import MainRouter from './Router/mainRouter';
import LoginRouter from './Router/loginRouter';
import ResetStyle from './Style/ResetStyle';
import { firebaseAuth } from './services/firebase';
import PageWrapper from './Component/Global/PageWrapper';

const App = () => {
  const [isSignin, setSignin] = React.useState(false);

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setSignin(true);
      } else {
        setSignin(false);
      }
    });
  });

  return (
    <>
      <ResetStyle />
      {isSignin ? (
        <PageWrapper>
          <MainRouter />
        </PageWrapper>
      ) : (
        <PageWrapper>
          <LoginRouter />
        </PageWrapper>
      )}
    </>
  );
};

export default App;
