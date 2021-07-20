import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useToast from '../../Hooks/useToast';
import Post from '../../Component/Main/Post';
import {
  getSearchUserData,
  getSearchUserFollowData,
} from '../../Modules/search';
import { getSearchUserPosts } from '../../Modules/posts';
import {
  addHeartData,
  removeHeartData,
  addBookmarkData,
  removeBookmarkData,
  observeHeart,
  observeBookmark,
  getCommentsByPost,
} from '../../services/firestore';
import { getHearts, getUsersWhoClickHeart } from '../../Modules/heart';
import { getBookmarks } from '../../Modules/saved';
import {
  activePostData,
  activePostIdData,
  activePostUserData,
  openPopup,
} from '../../Modules/popup';
import { calcTimeElapsed } from '../../lib/calcTime';

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
    isPossibleToComment,
    date,
    location,
    uid,
    id,
    hearts,
  } = post || {
    imagesArray: [],
    text: '',
    isPossibleToComment: false,
    date: '',
    location: '',
    uid: '',
    id: '',
    hearts: [],
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const [toast] = useToast();
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const [comments, setComments] = useState([]);
  const [more, setMore] = useState(true);

  const onClickMore = () => {
    setMore(!more);
  };

  const onClickHeart = async () => {
    if (isHeart) {
      console.log('Unliked!');
      const result = await removeHeartData(currentUid, uid, id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    } else {
      console.log('Liked!');
      const result = await addHeartData(currentUid, uid, id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    }
    observeHeart(dispatch, getHearts);
  };

  const onClickBookmark = async () => {
    if (isBookmark) {
      console.log('Deleted!');
      const result = await removeBookmarkData(currentUid, uid, id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    } else {
      console.log('Saved!');
      const result = await addBookmarkData(currentUid, uid, id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    }
    observeBookmark(dispatch, getBookmarks); // 좋아요 게시물 업데이트
  };

  const onClickShare = () => {
    console.log('onClickShare!', id);
    dispatch(openPopup('postSharePopup'));
    dispatch(activePostIdData(id));
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
    console.log('open post modal', id);
    dispatch(openPopup('postModal'));
    dispatch(activePostData({ ...post }));
    dispatch(activePostIdData(id));
    dispatch(activePostUserData({ displayName, photoURL, uid }));
  };

  useEffect(async () => {
    const datas = await getCommentsByPost(id);
    setComments(datas);
  }, []);

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
      isPossibleToComment={isPossibleToComment}
      comments={comments}
      timeElapsed={calcTimeElapsed(date)}
      onMoveProfilePage={onMoveProfilePage}
      onClickHeart={onClickHeart}
      onClickBookmark={onClickBookmark}
      onClickShare={onClickShare}
      isBookmark={isBookmark}
      isHeart={isHeart}
      onClickSetting={onClickSetting}
      onClickHeartCount={onClickHeartCount}
      onClickPostModal={onClickPostModal}
    />
  );
};

export default PostContainer;
