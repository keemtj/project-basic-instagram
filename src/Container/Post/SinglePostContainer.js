import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import SinglePost from '../../Component/Post/SinglePost';
import ProgressBar from '../../Component/Global/ProgressBar';
import { getProfilePosts } from '../../Modules/posts';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';
import { getCommentsByPost, getUidByPostId } from '../../services/firestore';

const SinglePostContainer = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const postId = match.params.postId;
  const { data: profilePosts } = useSelector(state => state.posts.profilePosts);
  const { data: profileUserData } = useSelector(
    state => state.user.profileUserData,
  );
  const { activePostIndex } = useSelector(state => state.posts);
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const [progress, setProgress] = useState(0);
  const post = () => profilePosts?.find(post => post.id === postId);

  const onMoveProfilePage = async () => {
    const uid = profileUserData?.uid;
    dispatch(getProfileUserData(uid));
    dispatch(getProfileUserFollowData(uid));
    dispatch(getProfilePosts(uid));
    history.push(`/${profileUserData?.displayName}`);
  };

  const onClickSinglePost = id => {
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
      history.push(`/p/${id}`);
    }, 1000);
  };

  useEffect(async () => {
    if (!profilePosts) {
      const uid = await getUidByPostId(postId);
      dispatch(getProfileUserData(uid));
      dispatch(getProfileUserFollowData(uid));
      dispatch(getProfilePosts(uid));
    }
  }, []);

  useEffect(async () => {
    const datas = await getCommentsByPost(postId);
    setComments(datas);
    setNewComments([]);
  }, [postId]);

  useEffect(() => {
    document.title = `Instagram의 ${profileUserData?.presentation} | ${
      post()?.text
    }`;
  }, []);

  return (
    <>
      {progress !== 0 && <ProgressBar progress={progress} />}
      <SinglePost
        post={post()}
        profilePosts={profilePosts}
        postId={postId}
        displayName={profileUserData?.displayName}
        activePostIndex={activePostIndex}
        comments={comments}
        newComments={newComments}
        setNewComments={setNewComments}
        inputRef={inputRef}
        onMoveProfilePage={onMoveProfilePage}
        onClickSinglePost={onClickSinglePost}
      />
    </>
  );
};

export default SinglePostContainer;
