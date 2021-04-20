import React, { useEffect } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import Main from '../../Component/Main/Main';

const MainContainer = () => {
  // ! redux
  const { data, loading, error } = useSelector(state => state.main);
  console.log(data, loading, error);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const { uid } = firebaseAuth.currentUser;
  //   const getPostData = async () => {
  //     let datas = [];
  //     try {
  //       const postDocs = await firestore
  //         .collection('posts')
  //         .doc(uid)
  //         .collection('my-posts')
  //         .orderBy('date', 'desc')
  //         .get();
  //       postDocs.forEach(doc => {
  //         if (doc.exists) {
  //           datas.push({ id: doc.id, data: doc.data() });
  //         } else {
  //           console.log('게시물 없음');
  //         }
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setPosts(datas);
  //   };
  //   getPostData();
  // }, []);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);
  return <Main posts={data} />;
};

export default MainContainer;
