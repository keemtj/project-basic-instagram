import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import { firebaseAuth } from '../../services/firebase';
import { getPosts, getFollowingPosts } from '../../Modules/posts';
import { followedMe } from '../../Modules/user';

const MainContainer = () => {
  const dispatch = useDispatch();
  const following = useSelector(state => state.user.follow.following);
  const { data: posts, loading, error } = useSelector(
    state => state.posts.myPosts,
  );

  // NOTE 팔로잉한 유저의 posts data
  const { data: followingPosts } = useSelector(
    state => state.posts.myFollowingPosts,
  );

  const all = () => {
    if (posts && followingPosts) {
      return [...posts, ...followingPosts].sort((a, b) => b.date - a.date);
    }
  };

  useEffect(() => {
    document.title = 'Instagram';
    const { uid } = firebaseAuth.currentUser;
    dispatch(followedMe(uid));
    dispatch(getPosts(uid));
    dispatch(getFollowingPosts(following));
  }, [dispatch, following]);

  if (loading) return <div>main container 로딩중</div>;
  if (error) return <div>main container 에러발생</div>;
  return <Main posts={all()} />;
};

export default MainContainer;
