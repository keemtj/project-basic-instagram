import React from 'react';
import MainRouter from './Router/mainRouter';
// import LoginRouter from './Router/loginRouter';
import ResetStyle from './Style/ResetStyle';
import PageWrapper from './Component/Global/PageWrapper';
import { firebaseAuth } from './services/firebase';

const App = () => {
  const [isSignin, setSignin] = React.useState(false);

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setSignin(true);
        console.log('user is sign in');
      } else {
        setSignin(false);
        console.log('No user is sign in');
      }
    });
  }, []);

  return (
    <>
      <ResetStyle />
      <PageWrapper>
        <MainRouter isSignin={isSignin} />
      </PageWrapper>
    </>
  );
};

export default App;
