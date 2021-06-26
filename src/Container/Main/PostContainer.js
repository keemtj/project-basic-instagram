import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Post from '../../Component/Main/Post';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getSearchUserPosts, updateMainPosts } from '../../Modules/posts';
import {
  addHeartData,
  removeHeartData,
  addBookmarkData,
  removeBookmarkData,
  observeHeart,
  observeBookmark,
  updatePostsData,
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

  const onClickHeart = async () => {
    if (isHeart) {
      console.log('Unliked!');
      await removeHeartData(currentUid, uid, id);
    } else {
      console.log('Liked!');
      const a = await addHeartData(currentUid, uid, id);
      console.log(a);
    }
    await updatePostsData(dispatch, updateMainPosts);
    observeHeart(dispatch, getHearts); // 내가 hearts를 누르면서 하트 게시물 업데이트
  };

  const onClickBookmark = async () => {
    if (isBookmark) {
      console.log('Deleted!');
      await removeBookmarkData(currentUid, uid, id);
    } else {
      console.log('Saved!');
      await addBookmarkData(currentUid, uid, id);
    }
    observeBookmark(dispatch, getBookmarks); // 좋아요 게시물 업데이트
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
      heartCount={hearts.length}
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
