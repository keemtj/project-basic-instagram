import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostHeartCount from '../../Component/Main/PostHeartCount';
import useToast from '../../Hooks/useToast';
import { getHearts, getUsersWhoClickHeart } from '../../Modules/heart';
import { openPopup } from '../../Modules/popup';
import { clearNewPost, updateMainPosts } from '../../Modules/posts';
import {
  addHeartData,
  observeHeart,
  removeHeartData,
  updatePostsData,
} from '../../services/firestore';

const PostHeartCountContainer = ({ post, user, heartCount, setHeartCount }) => {
  const { uid: currentUid } = user;
  const { uid, id, hearts: heartsInPost } = post;
  const dispatch = useDispatch();
  const newPost = useSelector(state => state.posts.newPost);
  const hearts = useSelector(state => state.heart.hearts);
  const isHeart = hearts.find(heart => heart.id === post.id);
  const [toast] = useToast();

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
