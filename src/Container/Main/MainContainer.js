import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { combinePosts } from '../../Modules/posts';
import Main from '../../Component/Main/Main';

const MainContainer = () => {
  const dispatch = useDispatch();
  const { data: myPosts } = useSelector(state => state.posts.myPosts);
  const { data: myFollowingPosts } = useSelector(
    state => state.posts.myFollowingPosts,
  );
  const posts = useSelector(state => state.posts.combinePosts) || [];
  const bookmarks = useSelector(state => state.saved.bookmarks);
  const hearts = useSelector(state => state.heart.hearts);

  useEffect(() => {
    if (myPosts === null) return;
    if (myFollowingPosts === null) return;
    if (myPosts !== null && myFollowingPosts !== null) {
      dispatch(combinePosts());
    }
  }, [myPosts, myFollowingPosts]);
  return <Main posts={posts} bookmarks={bookmarks} hearts={hearts} />;
};

export default MainContainer;
