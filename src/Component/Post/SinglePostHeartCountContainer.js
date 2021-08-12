import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostHeartCount from '../../Component/Main/PostHeartCount';
import useToast from '../../Hooks/useToast';
import { getUsersWhoClickHeart } from '../../Modules/heart';
import { openPopup } from '../../Modules/popup';
import { updateProfilePosts } from '../../Modules/posts';
import {
  addHeartData,
  observeProfilePost,
  removeHeartData,
} from '../../services/firestore';

const SinglePostHeartCountContainer = ({ post }) => {
  const dispatch = useDispatch();
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const isLiked = () => post?.hearts.includes(currentUid);
  const [toast] = useToast();

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
    observeProfilePost(dispatch, updateProfilePosts, post?.id);
  };

  const onClickHeartCount = () => {
    console.log('click heartCount & open heart count modal');
    dispatch(openPopup('postHeartCountModal'));
    dispatch(getUsersWhoClickHeart(post?.hearts));
  };

  return (
    <PostHeartCount
      heartCount={post?.hearts.length}
      onClickHeart={onClickHeart}
      onClickHeartCount={onClickHeartCount}
    />
  );
};

export default SinglePostHeartCountContainer;
