import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import Aside from './Aside';
import AsideFooter from './AsideFooter';
import { firebaseAuth, firestore } from '../../services/firebase';

const Main = ({ setSignin }) => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const { uid } = firebaseAuth.currentUser;
    const getPostData = async () => {
      let datas = [];
      try {
        const postDocs = await firestore
          .collection('posts')
          .doc(uid)
          .collection('my-posts')
          .orderBy('date', 'desc')
          .get();
        postDocs.forEach(doc => {
          if (doc.exists) {
            datas.push({ id: doc.id, data: doc.data() });
          } else {
            console.log('게시물 없음');
          }
        });
      } catch (e) {
        console.log(e);
      }
      setPosts(datas);
    };
    getPostData();
  }, []);

  return (
    <StMainWrapper>
      <StMain>
        <StSection>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </StSection>
        <StAsideWrapper>
          <Aside setSignin={setSignin} />
          <AsideFooter />
        </StAsideWrapper>
      </StMain>
    </StMainWrapper>
  );
};

const StMainWrapper = styled.div`
  background-color: #fafafa;
  flex-grow: 1;
  margin-top: 5.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StMain = styled.main`
  width: 95rem;
  padding-top: 3rem;
  display: flex;
  flex-flow: row nowrap;
`;

const StSection = styled.section`
  width: 65rem;
`;

const StAsideWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  padding-top: 3rem;
  top: 5.5rem;
  position: fixed;
  right: calc((100% - 95rem) / 2);
`;

export default Main;
