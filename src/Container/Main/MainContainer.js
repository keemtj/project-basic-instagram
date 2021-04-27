import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import {
  getAllPostsByCurrentUid,
  getMyFollowingPosts,
} from '../../Modules/main';
import { followedMe } from '../../Modules/user';
import { firebaseAuth } from '../../services/firebase';

const MainContainer = () => {
  // ! redux
  const dispatch = useDispatch();
  const { data: posts } = useSelector(state => state.main.myPosts);
  const following = useSelector(state => state.user.follow.following);
  const { data: followingPosts } = useSelector(
    state => state.main.myFollowingPosts,
  );

  const all = () => {
    if (posts && followingPosts) {
      return [...posts, ...followingPosts].sort((a, b) => b.date - a.date);
    }
  };

  useEffect(() => {
    document.title = 'Instagram';
    const { uid } = firebaseAuth.currentUser;
    // get my followers
    dispatch(followedMe(uid));
    // get posts by me and following
    // my posts
    dispatch(getAllPostsByCurrentUid(uid));
    // my following posts
    dispatch(getMyFollowingPosts(following));
  }, [following]);
  return <Main posts={all()} />;
};

export default MainContainer;
