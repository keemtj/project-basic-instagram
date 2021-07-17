import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostNavigation from '../../Component/Main/PostNavigation';
import useToast from '../../Hooks/useToast';
import { getHearts } from '../../Modules/heart';
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

const PostNavigationContainer = ({ post, user, heartCount, setHeartCount }) => {
  const dispatch = useDispatch();
  const { uid: currentUid } = user;
  const { uid, id } = post;
  const { postModal: postModalState } = useSelector(state => state.popup);
  const newPost = useSelector(state => state.posts.newPost);
  const bookmarks = useSelector(state => state.saved.bookmarks);
  const hearts = useSelector(state => state.heart.hearts);
  const [toast] = useToast();
  const isBookmark = bookmarks.find(bookmark => bookmark.id === post.id);
  const isHeart = hearts.find(heart => heart.id === post.id);

  const onClickHeart = async () => {
    if (isHeart) {
      console.log('Unliked!');
      setHeartCount(heartCount - 1);
      const result = await removeHeartData(currentUid, uid, id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    } else {
      console.log('Liked!');
      setHeartCount(heartCount + 1);
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

  return (
    <PostNavigation
      postModalState={postModalState}
      onClickBookmark={onClickBookmark}
      onClickHeart={onClickHeart}
      isBookmark={isBookmark}
      isHeart={isHeart}
    />
  );
};

export default PostNavigationContainer;
