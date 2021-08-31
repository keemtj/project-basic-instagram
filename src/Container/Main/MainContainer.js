/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Main from '../../Component/Main/Main';
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import {
  nextMainPosts as nextPosts,
  updateLastMainDocs as updateLastDocs,
} from '../../Modules/posts';
import {
  getNextMainPosts as fetchNextPosts,
  getUserDataByPost,
} from '../../services/firestore';

const MainContainer = () => {
  const [userDatas, setUserDatas] = useState([]);
  const currentUser = useSelector(state => state.user.currentUser);
  const followData = useSelector(state => state.user.currentUserFollowData);
  const uids = [currentUser.uid, ...followData.following];
  const { data: mainPosts, loading } = useSelector(
    state => state.posts.mainPosts,
  );
  const lastDocs = useSelector(state => state.posts.lastMainDocs);
  const {
    postSettingModal: postSettingModalState,
    postHeartCountModal: postHeartCountModalState,
    postSharePopup: postSharePopupState,
    postModal: postModalState,
  } = useSelector(state => state.popup);

  const intersectionObserver = useInfiniteScroll({
    threshold: 0.9,
    fetchNextPosts,
    lastDocs,
    nextPosts,
    updateLastDocs,
    uids,
  });

  useEffect(async () => {
    if (mainPosts === null || !mainPosts.length) return;
    const arr = await mainPosts.map(async post => {
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
      isLoading={loading}
      mainPosts={mainPosts}
      userDatas={userDatas}
      intersectionObserver={intersectionObserver}
      lastDocs={lastDocs}
    />
  );
};

export default MainContainer;
