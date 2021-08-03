import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostNavigation from '../../Component/Main/PostNavigation';
import useToast from '../../Hooks/useToast';
import { openPopup } from '../../Modules/popup';
import { updateMainPosts, updateProfilePosts } from '../../Modules/posts';
import {
  addBookmarkData,
  addHeartData,
  observeMainPost,
  observeProfilePost,
  removeBookmarkData,
  removeHeartData,
} from '../../services/firestore';

const PostNavigationContainer = ({ post, inputRef }) => {
  const dispatch = useDispatch();
  const { postModal: postModalState } = useSelector(state => state.popup);
  const { currentUser } = useSelector(state => state.user);
  const { uid: currentUid } = currentUser;
  const [toast] = useToast();
  const isLiked = () => post?.hearts.includes(currentUid);
  const isSaved = () => post?.bookmarks.includes(currentUid);

  const onClickHeart = async () => {
    if (!isLiked()) {
      console.log('Liked!');
      const result = await addHeartData(post?.id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    } else {
      console.log('Unliked!');
      const result = await removeHeartData(post?.id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    }
    observeMainPost(dispatch, updateMainPosts, post?.id);
    observeProfilePost(dispatch, updateProfilePosts, post?.id);
  };

  const onClickBookmark = async () => {
    if (!isSaved()) {
      console.log('Saved!');
      const result = await addBookmarkData(post?.uid, post?.id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    } else {
      console.log('Deleted!');
      const result = await removeBookmarkData(post?.uid, post?.id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      }
    }
    observeMainPost(dispatch, updateMainPosts, post?.id);
    observeProfilePost(dispatch, updateProfilePosts, post?.id);
  };

  const onClickCommentInput = () => {
    inputRef.current.focus();
  };

  const onClickShare = () => {
    dispatch(openPopup('postSharePopup'));
  };

  return (
    <PostNavigation
      postModalState={postModalState}
      onClickBookmark={onClickBookmark}
      onClickHeart={onClickHeart}
      onClickPostModal={onClickCommentInput}
      onClickShare={onClickShare}
      isSaved={isSaved()}
      isLiked={isLiked()}
    />
  );
};

export default PostNavigationContainer;
