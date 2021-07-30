/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import { getUserDataByPost } from '../../services/firestore';

const MainContainer = () => {
  const [userDatas, setUserDatas] = useState([]);
  const { data: mainPosts, loading } = useSelector(
    state => state.posts.mainPosts,
  );
  const {
    postSettingModal: postSettingModalState,
    postHeartCountModal: postHeartCountModalState,
    postSharePopup: postSharePopupState,
    postModal: postModalState,
  } = useSelector(state => state.popup);

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
    <Main isLoading={loading} mainPosts={mainPosts} userDatas={userDatas} />
  );
};

export default MainContainer;
