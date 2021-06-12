import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import EmptyPosts from '../Profile/EmptyPosts';

const Posts = ({ posts, onClickPostModal }) => {
  // isFollowing이 false면 게시물 비공개 처리하기
  return (
    <>
      {posts?.length === 0 ? (
        <EmptyPosts />
      ) : (
        <StPostsWrapper>
          {posts?.map((post, index, arr) => {
            return (
              <PostItemContainer
                post={post}
                key={index}
                onClickPostModal={() =>
                  onClickPostModal(arr, post, post.id, index)
                }
              />
            );
          })}
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
