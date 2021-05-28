import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import { getPosts, getFollowingPosts } from '../../Modules/posts';
import { followedMe } from '../../Modules/user';

const MainContainer = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.user);
  const following = useSelector(state => state.user.follow.following);

  // NOTE my posts data
  const { data: posts } = useSelector(state => state.posts.myPosts);

  // NOTE 팔로잉한 유저의 posts data
  const { data: followingPosts } = useSelector(
    state => state.posts.myFollowingPosts,
  );

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  console.log(posts, followingPosts);
  useEffect(() => {
    dispatch(followedMe(uid));
    dispatch(getPosts(uid));
    dispatch(getFollowingPosts(following));
  }, [uid, dispatch, following]);

  // if (loading) return <div>main container 로딩중</div>;
  // if (error) return <div>main container 에러발생</div>
  return <Main posts={posts} />;
};

export default MainContainer;
