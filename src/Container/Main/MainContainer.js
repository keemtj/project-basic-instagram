/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import { getUserDataByPost } from '../../services/firestore';

const MainContainer = () => {
  const [userDatas, setUserDatas] = useState([]);
  const { displayName, photoURL } = useSelector(
    state => state.user.currentUser,
  );
  const newPost = useSelector(state => state.posts.newPost);
  const { data: mainPosts, loading } = useSelector(
    state => state.posts.mainPosts,
  );
  const {
    postSettingModal: postSettingModalState,
    postHeartCountModal: postHeartCountModalState,
    postSharePopup: postSharePopupState,
    postModal: postModalState,
  } = useSelector(state => state.popup);
  const bookmarks = useSelector(state => state.saved.bookmarks);
  const hearts = useSelector(state => state.heart.hearts);

  useEffect(async () => {
    if (mainPosts === null || !mainPosts.length) return;
    const arr = mainPosts.map(async post => {
      const { uid } = post;
      const response = await getUserDataByPost(uid);
      const { displayName, photoURL } = response;
      return { displayName, photoURL, uid };
    });
    const result = await Promise.all(arr);
    setUserDatas(result);
  }, [mainPosts]);

  useEffect(() => {
    document.body.style.overflow = postHeartCountModalState ? 'hidden' : 'auto';
  }, [postHeartCountModalState]);

  useEffect(() => {
    document.body.style.overflow = postSettingModalState ? 'hidden' : 'auto';
  }, [postSettingModalState]);

  useEffect(() => {
    document.body.style.overflow = postSharePopupState ? 'hidden' : 'auto';
  }, [postSharePopupState]);

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <Main
      newPost={newPost}
      newPostUserData={{ displayName, photoURL }}
      isLoading={loading}
      mainPosts={mainPosts}
      userDatas={userDatas}
      bookmarks={bookmarks}
      hearts={hearts}
    />
  );
};

export default MainContainer;
