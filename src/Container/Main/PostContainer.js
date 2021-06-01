import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Post from '../../Component/Main/Post';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getSearchUserPosts } from '../../Modules/posts';
import {
  getUserDataByPost,
  addHeartData,
  removeHeartData,
  addBookmarkData,
  removeBookmarkData,
} from '../../services/firestore';

// NOTE 경과 시간 계산 함수
const calcTimeElapsed = date => {
  const start = new Date(date);
  const end = Date.now();
  const sec = Math.floor((end - start) / 1000); // 경과시간, 초
  const min = Math.floor((end - start) / 1000 / 60); // 경과시간, 분
  const hour = Math.floor((end - start) / 1000 / 60 / 60); // 경과시간, 시간
  const day = Math.floor((end - start) / 1000 / 60 / 60 / 24); // 경과시간, 일
  const elapsed =
    sec >= 60
      ? min >= 60
        ? hour >= 24
          ? day + '일전'
          : hour + '시간 전'
        : min + '분 전'
      : '방금 전';
  return elapsed;
};

const PostContainer = ({ post, bookmarkState, heartState }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const [isBookmarking, setIsBookmarking] = useState(bookmarkState);
  const [isCheckingHeart, setIsCheckingHeart] = useState(heartState);
  const [more, setMore] = useState(true);
  const [userState, setUserState] = useState({
    displayName: '',
    photoURL: '/images/default_profile.png',
  });
  const { displayName, photoURL } = userState;
  const {
    imagesArray,
    heartCount,
    text,
    isPossibleComment,
    comments,
    date,
    location,
    uid,
    id,
  } = post;

  const onClickMore = () => {
    setMore(!more);
  };

  const onClickHeart = () => {
    if (isCheckingHeart) {
      console.log('uncheck heart');
      removeHeartData(currentUid, uid, id);
      setIsCheckingHeart(false);
    } else {
      console.log('check heart');
      addHeartData(currentUid, uid, id); // post 요청
      setIsCheckingHeart(true);
    }
  };

  const onClickBookmark = () => {
    if (isBookmarking) {
      console.log('remove bookmark');
      removeBookmarkData(currentUid, uid, id); // post 요청
      setIsBookmarking(false); // UI
    } else {
      console.log('add bookmark');
      addBookmarkData(currentUid, uid, id); // post 요청
      setIsBookmarking(true);
    }
  };

  const onMoveProfilePage = () => {
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getSearchUserPosts(uid));
    history.push(`/${userState.displayName}`);
  };

  useEffect(async () => {
    const result = await getUserDataByPost(uid);
    const { displayName, photoURL } = result;
    setUserState({ displayName, photoURL });
    return () =>
      setUserState({
        displayName: '',
        photoURL: '/images/default_profile.png',
      });
  }, []);
  return (
    <Post
      displayName={displayName}
      photoURL={photoURL}
      location={location}
      imagesArray={imagesArray}
      heartCount={heartCount}
      more={more}
      text={text}
      onClickMore={onClickMore}
      isPossibleComment={isPossibleComment}
      comments={comments}
      timeElapsed={calcTimeElapsed(date)}
      onMoveProfilePage={onMoveProfilePage}
      onClickHeart={onClickHeart}
      onClickBookmark={onClickBookmark}
      isBookmarking={isBookmarking}
      isCheckingHeart={isCheckingHeart}
    />
  );
};

export default PostContainer;
