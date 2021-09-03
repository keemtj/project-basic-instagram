import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import { EmptyPost } from '../Global/Empty';
import EmptyPosts from '../Profile/EmptyPosts';

const Posts = ({
  posts,
  onClickPostModal,
  isMypage,
  isLoading,
  lastDoc,
  intersectionObserver,
}) => {
  // isFollowing이 false면 게시물 비공개 처리하기
  return (
    <>
      {posts?.length === 0 ? (
        <>{isMypage ? <EmptyPosts /> : <EmptyPost />}</>
      ) : (
        <>
          <StPostsWrapper>
            {posts?.map((post, index) => {
              return (
                <PostItemContainer
                  post={post}
                  key={index}
                  onClickPostModal={() => onClickPostModal(post.id, index)}
                />
              );
            })}
          </StPostsWrapper>
          {!isLoading && lastDoc && <StObserve {...intersectionObserver} />}
        </>
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

const StObserve = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 1rem;
`;

export default Posts;
