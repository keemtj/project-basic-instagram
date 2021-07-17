import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostNavigation from '../../Component/Main/PostNavigation';
import useToast from '../../Hooks/useToast';
import { getHearts } from '../../Modules/heart';
import { activePostIdData, openPopup } from '../../Modules/popup';
import { clearNewPost, updateMainPosts } from '../../Modules/posts';
import { getBookmarks } from '../../Modules/saved';
import {
  addBookmarkData,
  addHeartData,
  observeBookmark,
  observeHeart,
  removeBookmarkData,
  removeHeartData,
  updatePostsData,
} from '../../services/firestore';

const PostNavigationContainer = ({ post, user, isBookmark, isHeart }) => {
  console.log(user);
  const { uid } = user;
  const { id } = post;
  const dispatch = useDispatch();
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const newPost = useSelector(state => state.posts.newPost);
  const [toast] = useToast();

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
    await updatePostsData(dispatch, updateMainPosts);
    observeHeart(dispatch, getHearts);
    if (newPost.length !== 0) dispatch(clearNewPost());
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
    await updatePostsData(dispatch, updateMainPosts);
    observeBookmark(dispatch, getBookmarks); // 좋아요 게시물 업데이트
    if (newPost.length !== 0) dispatch(clearNewPost());
  };

  const onClickShare = () => {
    console.log('onClickShare!', id);
    dispatch(openPopup('postSharePopup'));
    dispatch(activePostIdData(id));
  };

  return (
    <PostNavigation
      onClickBookmark={onClickBookmark}
      onClickHeart={onClickHeart}
      onClickShare={onClickShare}
      isBookmark={isBookmark}
      isHeart={isHeart}
    />
  );
};

export default PostNavigationContainer;
