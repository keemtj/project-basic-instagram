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
import { getHearts, getUsersWhoClickHeart } from '../../Modules/heart';
import { getBookmarks } from '../../Modules/saved';
import { activePostData, openPopup } from '../../Modules/popup';
import { calcTimeElapsed } from '../../lib/calcTimeElapsed';

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
    hearts,
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

  const onClickHeartCount = () => {
    console.log('heartCount');
    console.log(hearts);
    dispatch(openPopup('postHeartCountModal'));
    dispatch(getUsersWhoClickHeart(hearts));
  };

  const onClickPostModal = () => {
    console.log('댓글 더 보기 클릭해서 open post modal');
  };

  return (
    <Post
      uid={uid}
      id={id}
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
      onClickHeartCount={onClickHeartCount}
      onClickPostModal={onClickPostModal}
    />
  );
};

export default PostContainer;
