import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { combinePosts } from '../../Modules/posts';
import Main from '../../Component/Main/Main';
import { getUserDataByPost } from '../../services/firestore';

const MainContainer = () => {
  const dispatch = useDispatch();
  const { data: myPosts } = useSelector(state => state.posts.myPosts);
  const { data: myFollowingPosts } = useSelector(
    state => state.posts.myFollowingPosts,
  );
  const posts = useSelector(state => state.posts.combinePosts) || [];
  const bookmarks = useSelector(state => state.saved.bookmarks);
  const hearts = useSelector(state => state.heart.hearts);

  const [userDatas, setUserDatas] = useState([]);

  useEffect(() => {
    if (myPosts === null) return;
    if (myFollowingPosts === null) return;
    if (myPosts !== null && myFollowingPosts !== null) {
      dispatch(combinePosts());
    }
  }, [myPosts, myFollowingPosts]);

  useEffect(async () => {
    if (posts === null) return;
    const arr = posts.map(async post => {
      const { uid } = post;
      const response = await getUserDataByPost(uid);
      const { displayName, photoURL } = response;
      return { displayName, photoURL, uid };
    });
    const result = await Promise.all(arr);
    setUserDatas(result);
  }, [posts]);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <Main
      posts={posts}
      userDatas={userDatas}
      bookmarks={bookmarks}
      hearts={hearts}
    />
  );
};

export default MainContainer;
