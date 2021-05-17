import React from 'react';
import { useSelector } from 'react-redux';
import Posts from '../../Component/Profile/Posts';
import EmptyPosts from '../../Component/Profile/EmptyPosts';

const PostsContainer = ({ watchName }) => {
  const currentUser = useSelector(state => state.user.user);
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

  if (myPostsLoading || searchUserPostsloading)
    return <div>Posts Container 로딩중</div>;
  if (myPostsError || searchUserPostsError)
    return <div>Posts Container 에러발생</div>;
  if (myPosts?.length === 0) return <EmptyPosts />;
  if (searchUserPosts?.length === 0) return <EmptyPosts />;
  return (
    <Posts
      posts={
        currentUser.displayName === watchName
          ? sortedPosts()
          : sortedSearchUserPosts()
      }
    />
  );
};

export default PostsContainer;
