import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import { EmptySaved } from '../Global/Empty';

const Saved = ({ posts, onClickPostModal }) => {
  return (
    <>
      <StOnlyYou>저장한 내용은 회원님만 볼 수 있습니다</StOnlyYou>
      {posts?.length === 0 ? (
        <EmptySaved />
      ) : (
        <StSavedWrapper>
          {posts?.map((post, index, arr) => {
            return (
              <PostItemContainer
                post={post}
                key={index}
                onClickPostModal={() => onClickPostModal(arr, post.id, index)}
              />
            );
          })}
        </StSavedWrapper>
      )}
    </>
  );
};

const StSavedWrapper = styled.article`
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

export default Saved;
