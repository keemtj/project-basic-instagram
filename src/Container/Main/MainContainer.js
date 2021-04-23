import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import {
  getAllPostsByCurrentUid,
  getMyFollowingPosts,
} from '../../Modules/main';
import { firebaseAuth } from '../../services/firebase';

const MainContainer = () => {
  // ! redux
  const { data, loading, error } = useSelector(state => state.main.myPosts);
  console.log(loading, error);
  // const {
  //   data: followingPosts,
  //   loading: followingLoading,
  //   error: followingError,
  // } = useSelector(state => state.main.myFollowingPosts);
  // console.log(
  //   'followingPosts:',
  //   followingPosts,
  //   followingLoading,
  //   followingError,
  // );
  const { data: followed } = useSelector(state => state.user.followed);
  const dispatch = useDispatch();

  useEffect(async () => {
    document.title = 'Instagram';
    // get posts by me and following
    const { uid } = firebaseAuth.currentUser;
    dispatch(getAllPostsByCurrentUid(uid));
    followed?.forEach(async ({ uid }) => {
      dispatch(getMyFollowingPosts(uid));
    });
  }, [followed]);
  return <Main posts={data} />;
};

export default MainContainer;
