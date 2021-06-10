import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Post from '../../Component/Main/Post';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import {
  getSearchUserPosts,
  updateFollowingPost,
  updatePost,
} from '../../Modules/posts';
import {
  addHeartData,
  removeHeartData,
  addBookmarkData,
  removeBookmarkData,
  decreaseHeartCount,
  increaseHeartCount,
  observeHeart,
  observeBookmark,
  observeHeartCount,
} from '../../services/firestore';
import { getHearts } from '../../Modules/heart';
import { getBookmarks } from '../../Modules/saved';
import { activePostData, openPopup } from '../../Modules/popup';

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

const PostContainer = ({
  post,
  displayName,
  photoURL,
  isBookmark,
  isHeart,
}) => {
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
  const history = useHistory();
  const dispatch = useDispatch();
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const [more, setMore] = useState(true);

  const onClickMore = () => {
    setMore(!more);
  };

  const onClickHeart = () => {
    if (isHeart) {
      console.log('Unliked!');
      removeHeartData(currentUid, uid, id);
      decreaseHeartCount(uid, id);
    } else {
      console.log('Liked!');
      addHeartData(currentUid, uid, id);
      increaseHeartCount(uid, id);
    }
    observeHeart(dispatch, getHearts);
    observeHeartCount(
      dispatch,
      currentUid === uid ? updatePost : updateFollowingPost,
      currentUid === uid ? currentUid : uid,
      id,
    );
  };

  const onClickBookmark = () => {
    if (isBookmark) {
      console.log('Deleted!');
      removeBookmarkData(currentUid, uid, id);
    } else {
      console.log('Saved!');
      addBookmarkData(currentUid, uid, id);
    }
    observeBookmark(dispatch, getBookmarks);
  };

  const onMoveProfilePage = () => {
    dispatch(getSearchUserData(uid));
    dispatch(getSearchUserFollowData(uid));
    dispatch(getSearchUserPosts(uid));
    history.push(`/${displayName}`);
  };

  const onClickSetting = () => {
    console.log('Post Setting Modal Trigger');
    dispatch(openPopup('postSettingModal'));
    dispatch(activePostData({ uid, id, imagesArray }));
  };

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
      isBookmark={isBookmark}
      isHeart={isHeart}
      onClickSetting={onClickSetting}
    />
  );
};

export default PostContainer;
