import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import { EmptySaved } from '../Global/Empty';

const Saved = ({
  posts,
  onClickPostModal,
  isLoading,
  lastDoc,
  intersectionObserver,
}) => {
  return (
    <>
      <StOnlyYou>저장한 내용은 회원님만 볼 수 있습니다</StOnlyYou>
      {posts?.length === 0 ? (
        <EmptySaved />
      ) : (
        <>
          <StSavedWrapper>
            {posts?.map((post, index) => {
              return (
                <PostItemContainer
                  post={post}
                  key={index}
                  onClickPostModal={() => onClickPostModal(post.id, index)}
                />
              );
            })}
          </StSavedWrapper>
          {!isLoading && lastDoc && <StObserve {...intersectionObserver} />}
        </>
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

const StObserve = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 1rem;
`;

export default Saved;
