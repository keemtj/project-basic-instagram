import React from 'react';
// import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Global/Header';
import Footer from './Global/Footer';
import MainRouter from '../Router/mainRouter';
// import { firebaseAuth, firestore } from '../services/firebase';
import { useLocation } from 'react-router';

const Home = ({ setSignin }) => {
  const location = useLocation();
  // const [userData, setUserData] = useState(null);
  // const [postData, setPostData] = useState(null);
  // console.log('userData', userData);
  // console.log('postData', postData);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     let userData = [];
  //     let postData = [];
  //     try {
  //       // 현재 접속중인 유저의 uid 가져오기
  //       const { uid } = firebaseAuth.currentUser;
  //       console.log('uid', uid);
  //       // firestore에서 uid에 맞는 users 컬렉션 가져오기
  //       const usersDocs = await firestore
  //         .collection('users')
  //         .where('uid', '==', uid)
  //         .get();
  //       usersDocs.forEach(doc => {
  //         return userData.push(doc.data());
  //       });
  //       // firestore에서 uid에 맞는 posts 컬렉션 가져오기
  //       const postsDocs = await firestore
  //         .collection('posts')
  //         // .where('uid', '==', uid)
  //         .get();
  //       postsDocs.forEach(doc => {
  //         console.log('doc', doc.id);
  //         if (doc.id === uid) {
  //           console.log('uid에맞는 필드 가져오기');
  //           return postData.push(doc.data());
  //         }
  //       });
  //       setUserData(userData);
  //       setPostData(postData);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getUserData();
  // }, []);

  return (
    <StMainWrapper>
      <Header />
      <MainRouter setSignin={setSignin} />
      {!(location.pathname === '/' || location.pathname === '/direct') && (
        <Footer />
      )}
    </StMainWrapper>
  );
};

const StMainWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default Home;
