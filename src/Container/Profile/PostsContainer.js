import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../../Component/Profile/Posts';
import { openPopup } from '../../Modules/popup';

const PostsContainer = ({ watchName }) => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(state => state.user.user);
  const { data: searchUserData } = useSelector(
    state => state.search.searchUser,
  );
  const {
    data: myPosts,
    loading: myPostsLoading,
    error: myPostsError,
  } = useSelector(state => state.posts.myPosts);
  const {
    data: searchUserPosts,
    loading: searchUserPostsloading,
    error: searchUserPostsError,
  } = useSelector(state => state.posts.searchUserPosts);
  const { postModal: postModalState } = useSelector(state => state.popup);

  const sortedPosts = () => {
    if (myPosts) {
      return [...myPosts].sort((a, b) => b.date - a.date);
    }
  };
  const sortedSearchUserPosts = () => {
    if (searchUserPosts) {
      return [...searchUserPosts].sort((a, b) => b.date - a.date);
    }
  };

  const [postId, setPostId] = React.useState('');
  const [postUid, setPostUid] = React.useState('');
  const onClickPostModal = (uid, id) => {
    setPostId(id);
    setPostUid(uid);
    dispatch(openPopup('postModal'));
  };

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  if (myPostsLoading || searchUserPostsloading)
    return <div>Posts Container 로딩중</div>;
  if (myPostsError || searchUserPostsError)
    return <div>Posts Container 에러발생</div>;
  return (
    <Posts
      posts={
        currentUserData.displayName === watchName
          ? sortedPosts()
          : sortedSearchUserPosts()
      }
      postModalState={postModalState}
      onClickPostModal={onClickPostModal}
      postId={postId}
      postUid={postUid}
      displayName={
        currentUserData.displayName === watchName
          ? currentUserData?.displayName
          : searchUserData?.displayName
      }
      photoURL={
        (currentUserData.displayName === watchName
          ? currentUserData?.photoURL
          : searchUserData?.photoURL) || '/images/default_profile2.jpg'
      }
    />
  );
};

export default PostsContainer;
