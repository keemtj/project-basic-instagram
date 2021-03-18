import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import MainRouter from '../Router/mainRouter';
import { firestore } from '../services/firebase';

const Main = () => {
  const [data, setData] = useState(null);
  console.log('data', data);

  const fetchData = useCallback(async () => {
    let datas = [];
    try {
      // firestore에서 컬렉션 가져오기
      const docs = await firestore.collection('users').get();
      docs.forEach(doc => {
        console.log(doc.data());
        return datas.push(doc.data());
      });

      setData(datas);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <StMainWrapper>
      <Header />
      <MainRouter />
      <Footer />
    </StMainWrapper>
  );
};

const StMainWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default Main;
