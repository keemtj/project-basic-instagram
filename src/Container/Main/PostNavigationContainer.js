import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostNavigation from '../../Component/Main/PostNavigation';
import useToast from '../../Hooks/useToast';
import { updateMainPosts } from '../../Modules/posts';
import {
  addBookmarkData,
  addHeartData,
  observeMainPost,
  removeBookmarkData,
  removeHeartData,
} from '../../services/firestore';

const PostNavigationContainer = ({ post, user }) => {
  const dispatch = useDispatch();
  const { uid: currentUid } = user;
  const { uid, id } = post;
  const { postModal: postModalState } = useSelector(state => state.popup);
  const bookmarks = useSelector(state => state.saved.bookmarks);
  const hearts = useSelector(state => state.heart.hearts);
  const [toast] = useToast();
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
      const result = await addBookmarkData(uid, id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    } else {
      console.log('Deleted!');
      const result = await removeBookmarkData(uid, id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    }
    observeMainPost(dispatch, updateMainPosts, id);
  };

  return (
    <PostNavigation
      postModalState={postModalState}
      onClickBookmark={onClickBookmark}
      onClickHeart={onClickHeart}
      isBookmark={isLiked()}
      isHeart={isSaved()}
    />
  );
};

export default PostNavigationContainer;
