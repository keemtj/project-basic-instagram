import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import { EmptyHeart } from '../Global/Empty';

const Heart = ({ posts, onClickPostModal }) => {
  return (
    <>
      <StOnlyYou>좋아요한 콘텐츠는 회원님만 볼 수 있습니다</StOnlyYou>
      {posts?.length === 0 ? (
        <EmptyHeart />
      ) : (
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
