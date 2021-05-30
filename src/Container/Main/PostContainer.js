import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Post from '../../Component/Main/Post';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getSearchUserPosts } from '../../Modules/posts';
import { getUserDataByPost } from '../../services/firestore';

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

  const [state, setState] = useState({});
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

  const onClickHeart = () => {
    console.log('heart');
  };
  const onClickBookmark = () => {
    console.log('bookmark');
  };

  const onMoveProfilePage = () => {
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getSearchUserPosts(uid));
    history.push(`/${state.displayName}`);
  };

  React.useEffect(async () => {
    const result = await getUserDataByPost(uid);
    const { displayName, photoURL } = result;
    setState({ displayName, photoURL });
    console.log(displayName);
    return () => setState({});
  }, []);

  return (
    <Post
      displayName={state.displayName}
      photoURL={state.photoURL}
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
