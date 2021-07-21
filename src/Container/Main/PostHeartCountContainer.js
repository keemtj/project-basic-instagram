import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostHeartCount from '../../Component/Main/PostHeartCount';
import useToast from '../../Hooks/useToast';
import { getUsersWhoClickHeart } from '../../Modules/heart';
import { openPopup } from '../../Modules/popup';
import { updateMainPosts } from '../../Modules/posts';
import {
  addHeartData,
  observeMainPost,
  removeHeartData,
} from '../../services/firestore';

const PostHeartCountContainer = ({ post, heartCount }) => {
  const { id, hearts: heartsInPost } = post;
  const dispatch = useDispatch();
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const hearts = useSelector(state => state.heart.hearts);
  const isLiked = () => hearts.includes(currentUid);
  const [toast] = useToast();

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

  const onClickHeartCount = () => {
    console.log('click heartCount & open heart count modal');
    dispatch(openPopup('postHeartCountModal'));
    dispatch(getUsersWhoClickHeart(heartsInPost));
  };

  return (
    <PostHeartCount
      heartCount={heartCount}
      onClickHeart={onClickHeart}
      onClickHeartCount={onClickHeartCount}
    />
  );
};

export default PostHeartCountContainer;
