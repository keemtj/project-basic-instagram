import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Post from '../../Component/Main/Post';
import { getCurrentUserData } from '../../services/firestore';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getSearchUserPosts } from '../../Modules/posts';

const PostContainer = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    imagesArray,
    heartCount,
    text,
    isPossibleComment,
    comments,
    date,
    location,
    uid,
  } = post;
  const [userDataByPost, setUserDataByPost] = useState({
    displayName: '',
    photoURL: '',
  });
  const { displayName, photoURL } = userDataByPost;

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

  // NOTE 게시글 더보기, 숨기기 함수
  const [more, setMore] = useState(true);
  const onClickMore = () => {
    setMore(!more);
  };

  const onMoveProfilePage = () => {
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getSearchUserPosts(uid));
    history.push(`/${displayName}`);
  };

  useEffect(async () => {
    const result = await getCurrentUserData(uid);
    const { displayName, photoURL } = await Promise.resolve(result);
    setUserDataByPost({ displayName, photoURL });
  }, [uid, getCurrentUserData, setUserDataByPost]);

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
    />
  );
};

export default PostContainer;
