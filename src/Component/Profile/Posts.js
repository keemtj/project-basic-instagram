import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import EmptyPosts from '../Profile/EmptyPosts';

const Posts = ({ posts }) => {
  // isFollowing이 false면 게시물 비공개 처리하기
  return (
    <>
      {posts?.length === 0 ? (
        <EmptyPosts />
      ) : (
        <StPostsWrapper>
          {posts?.map((post, index) => (
            <PostItemContainer post={post} key={index} />
          ))}
        </StPostsWrapper>
      )}
    </>
  );
};

const StPostsWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 2.5rem;
  margin-bottom: 3rem;
`;

export default Posts;
