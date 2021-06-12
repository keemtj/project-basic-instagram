import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Global/Loading';
import Posts from '../../Component/Profile/Posts';
import { activeIndex, activePostsData, openPopup } from '../../Modules/popup';

const PostsContainer = ({ watchName }) => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(state => state.user.currentUser);
  const {
    data: myPosts,
    loading: myPostsLoading,
    error: myPostsError,
  } = useSelector(state => state.posts.myPosts);

  const {
    data: searchUserPosts,
    loading: searchUserPostsLoading,
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

  const onClickPostModal = (posts, post, id, index) => {
    console.log(posts, post, id, index);
    dispatch(openPopup('postModal'));
    dispatch(activePostsData(posts));
    dispatch(activeIndex(index));
  };

  useEffect(() => {
    document.body.style.overflow = postModalState ? 'hidden' : 'auto';
  }, [postModalState]);

  if (myPostsLoading || searchUserPostsLoading)
    return <Loading isLoading={myPostsLoading || searchUserPostsLoading} />;
  if (myPostsError || searchUserPostsError)
    return <div>Posts Container 에러발생</div>;
  return (
    <Posts
      posts={
        currentUserData?.displayName === watchName
          ? sortedPosts()
          : sortedSearchUserPosts()
      }
      onClickPostModal={onClickPostModal}
    />
  );
};

export default PostsContainer;
