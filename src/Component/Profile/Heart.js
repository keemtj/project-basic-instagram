import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import EmptyPosts from '../Profile/EmptyPosts';
import PostModal from './PostModal';

const Heart = ({
  posts,
  postModalState,
  onClickPostModal,
  postUid,
  postId,
  displayName,
  photoURL,
}) => {
  // isFollowing이 false면 게시물 비공개 처리하기
  return (
    <>
      <StOnlyYou>좋아한 게시물은 회원님만 볼 수 있습니다</StOnlyYou>
      {posts?.length === 0 ? (
        <EmptyPosts />
      ) : (
        <>
          <StPostsWrapper>
            {posts?.map((post, index) => {
              return (
                <PostItemContainer
                  post={post}
                  key={index}
                  onClickPostModal={onClickPostModal}
                />
              );
            })}
            {postModalState && (
              <PostModal
                postUid={postUid}
                postId={postId}
                displayName={displayName}
                photoURL={photoURL}
              />
            )}
          </StPostsWrapper>
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

const StOnlyYou = styled.div`
  padding: 2rem 0rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.2rem;
`;

export default Heart;
