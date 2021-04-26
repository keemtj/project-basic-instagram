import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import {
  getAllPostsByCurrentUid,
  getMyFollowingPosts,
} from '../../Modules/main';
import { firebaseAuth } from '../../services/firebase';
import { getAllPostsByFollowing } from '../../services/firestore';

const MainContainer = () => {
  // ! redux
  const dispatch = useDispatch();
  const { data: posts } = useSelector(state => state.main.myPosts);
  const following = useSelector(state => state.user.follow.following);
  const followingPosts = useSelector(state => state.main.myFollowingPosts);

  const all = () => {
    if (posts && followingPosts) {
      return [...posts, ...followingPosts].sort((a, b) => b.date - a.date);
    }
  };

  useEffect(() => {
    document.title = 'Instagram';
    // get posts by me and following
    const { uid } = firebaseAuth.currentUser;
    dispatch(getAllPostsByCurrentUid(uid));
    const arr = following.map(async uid => {
      const response = await getAllPostsByFollowing(uid);
      return response;
    });
    Promise.all(arr).then(value => {
      const datas = value.flatMap(v => v);
      dispatch(getMyFollowingPosts(datas));
    });
  }, []);
  return <Main posts={all()} />;
};

export default MainContainer;
