import React, { useEffect } from 'react';
import { firebaseAuth } from '../services/firebase';

const Main = () => {
  useEffect(() => {
    document.title = 'Instagram';
    const user = firebaseAuth.currentUser;
    console.log(user.uid);
  });
  return <div style={{ marginTop: '5.5rem' }}>메인</div>;
};

export default Main;
