import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import { getAllPostsByCurrentUid } from '../../Modules/main';
import { firebaseAuth } from '../../services/firebase';

const MainContainer = () => {
  // ! redux
  const dispatch = useDispatch();
  const { data: posts } = useSelector(state => state.main.myPosts);
  const following = useSelector(state => state.user.follow.following);

  useEffect(() => {
    document.title = 'Instagram';
    // get posts by me and following
    const { uid } = firebaseAuth.currentUser;
    dispatch(getAllPostsByCurrentUid(uid));
  }, [following]);
  return <Main posts={posts} />;
};

export default MainContainer;
