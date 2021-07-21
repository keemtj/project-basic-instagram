import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useToast from '../../Hooks/useToast';
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
  observeMainPost,
  getCommentsByPost,
} from '../../services/firestore';
import { getUsersWhoClickHeart } from '../../Modules/heart';
import {
  activePostData,
  activePostIdData,
  activePostUserData,
  openPopup,
} from '../../Modules/popup';
import { calcTimeElapsed } from '../../lib/calcTime';

const PostContainer = ({ post, displayName, photoURL }) => {
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
  const isLiked = () => hearts.includes(currentUid);
  const isSaved = () => bookmarks.includes(currentUid);
  const onClickMore = () => {
    setMore(!more);
  };

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
      }
    } else {
      console.log('Deleted!');
      const result = await removeBookmarkData(id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    }
    observeMainPost(dispatch, updateMainPosts, id);
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
      newComments={newComments}
      setNewComments={setNewComments}
      timeElapsed={calcTimeElapsed(date)}
      onMoveProfilePage={onMoveProfilePage}
      onClickHeart={onClickHeart}
      onClickBookmark={onClickBookmark}
      onClickShare={onClickShare}
      isSaved={isSaved()}
      isLiked={isLiked()}
      onClickSetting={onClickSetting}
      onClickHeartCount={onClickHeartCount}
      onClickPostModal={onClickPostModal}
    />
  );
};

export default PostContainer;
