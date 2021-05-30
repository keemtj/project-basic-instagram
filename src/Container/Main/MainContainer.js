import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import { getFollowingPosts } from '../../Modules/posts';

const MainContainer = () => {
  const dispatch = useDispatch();
  const { data: follow } = useSelector(
    state => state.user.currentUserFollowData,
  );
  const { data: myPosts } = useSelector(state => state.posts.myPosts);
  const { data: myFollowingPosts } = useSelector(
    state => state.posts.myFollowingPosts,
  );

  const posts = () => {
    if (myPosts !== null && myFollowingPosts === null) {
      return myPosts;
    } else if (myPosts === null && myFollowingPosts !== null) {
      return myFollowingPosts;
    } else if (myPosts !== null && myFollowingPosts !== null) {
      return [...myPosts, ...myFollowingPosts].sort((a, b) => b.date - a.date);
    }
  };

  useEffect(() => {
    dispatch(getFollowingPosts(follow?.following));
  }, [follow]);
  return <Main posts={posts()} />;
};

export default MainContainer;
