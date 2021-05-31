import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Post from '../../Component/Main/Post';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getSearchUserPosts } from '../../Modules/posts';
import { addBookmark, getUserDataByPost } from '../../services/firestore';

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

const PostContainer = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const [state, setState] = useState({
    displayName: '',
    photoURL: '/images/default_profile.png',
  });
  const [more, setMore] = useState(true);
  const { displayName, photoURL } = state;
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
    console.log('heart');
  };

  const onClickBookmark = () => {
    // id: postId
    // uid: current user's uid
    // isBookmarking ? arrayRemove : arrayUnion
    console.log('bookmark', 'postId:', id, currentUid);
    addBookmark(currentUid, id);
  };

  const onMoveProfilePage = () => {
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getSearchUserPosts(uid));
    history.push(`/${state.displayName}`);
  };

  useEffect(async () => {
    const result = await getUserDataByPost(uid);
    const { displayName, photoURL } = result;
    setState({ displayName, photoURL });
    return () =>
      setState({ displayName: '', photoURL: '/images/default_profile.png' });
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
    />
  );
};

export default PostContainer;
