import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useToast from '../../Hooks/useToast';
import MainPost from '../../Component/Main/MainPost';
import {
  activeIdOfPost,
  activeIndexOfPost,
  getProfilePosts,
  updateMainPosts,
} from '../../Modules/posts';
import {
  addHeartData,
  removeHeartData,
  addBookmarkData,
  removeBookmarkData,
  observeMainPost,
  getCommentsByPost,
} from '../../services/firestore';
import { getUsersWhoClickHeart } from '../../Modules/heart';
import { calcTimeElapsed } from '../../lib/calcTime';
import { getProfileUserData } from '../../Modules/user';
import { openPopup } from '../../Modules/popup';

const MainPostContainer = ({ post, index, displayName, photoURL }) => {
  const {
    imagesArray,
    text,
    isPossibleToComment,
    date,
    location,
    uid,
    id,
    hearts,
    bookmarks,
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
  const [newComments, setNewComments] = useState([]);
  const [more, setMore] = useState(true);

  const onMoveProfilePage = () => {
    console.log(uid);
    dispatch(getProfileUserData(uid));
    dispatch(getProfilePosts(uid));
    history.push(`/${displayName}`);
  };

  const onClickSetting = () => {
    console.log('MainPost Setting Modal Trigger');
    dispatch(openPopup('postSettingModal'));
    // dispatch(activePostData({ uid, id, imagesArray }));
  };

  const isLiked = () => hearts.includes(currentUid);
  const isSaved = () => bookmarks.includes(currentUid);

  const onClickHeart = async () => {
    if (!isLiked()) {
      console.log('Liked!');
      const result = await addHeartData(id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    } else {
      console.log('Unliked!');
      const result = await removeHeartData(id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    }
    observeMainPost(dispatch, updateMainPosts, id);
  };

  const onClickBookmark = async () => {
    if (!isSaved()) {
      console.log('Saved!');
      const result = await addBookmarkData(id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      } else {
        toast('게시물이 저장되었습니다.');
      }
    } else {
      console.log('Deleted!');
      const result = await removeBookmarkData(id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      } else {
        toast('게시물 저장이 취소되었습니다.');
      }
    }
    observeMainPost(dispatch, updateMainPosts, id);
  };

  const onClickShare = () => {
    console.log('onClickShare!', id);
    dispatch(openPopup('postSharePopup'));
    dispatch(activeIdOfPost(id));
  };

  const onClickHeartCount = () => {
    console.log('heartCount');
    dispatch(openPopup('postHeartCountModal'));
    dispatch(getUsersWhoClickHeart(hearts));
  };

  const onClickPostModal = () => {
    console.log('open post modal', id);
    dispatch(openPopup('postModal'));
    dispatch(getProfileUserData(uid));
    dispatch(activeIdOfPost(id));
    dispatch(activeIndexOfPost(index));
  };

  const onClickMore = () => {
    setMore(!more);
  };

  useEffect(async () => {
    const datas = await getCommentsByPost(id);
    setComments(datas);
  }, []);

  return (
    <MainPost
      id={id}
      displayName={displayName}
      photoURL={photoURL}
      location={location}
      imagesArray={imagesArray}
      heartCount={hearts.length}
      more={more}
      text={text}
      isPossibleToComment={isPossibleToComment}
      comments={comments}
      newComments={newComments}
      setNewComments={setNewComments}
      timeElapsed={calcTimeElapsed(date)}
      onMoveProfilePage={onMoveProfilePage}
      onClickSetting={onClickSetting}
      onClickHeart={onClickHeart}
      isLiked={isLiked()}
      onClickBookmark={onClickBookmark}
      isSaved={isSaved()}
      onClickShare={onClickShare}
      onClickHeartCount={onClickHeartCount}
      onClickPostModal={onClickPostModal}
      onClickMore={onClickMore}
    />
  );
};

export default MainPostContainer;
