import React from 'react';
import styled from 'styled-components';
import SinglePostHeaderContainer from './SinglePostHeaderContainer';
import SinglePostTextBoxContainer from './SinglePostTextBoxContainer';
import SinglePostCommentsContainer from './SinglePostCommentsContainer';
import SinglePostNavigationContainer from './SinglePostNavigationContainer';
import SinglePostHeartCountContainer from './SinglePostHeartCountContainer';
import PostChatInputContainer from '../../Container/Profile/PostChatInputContainer';
import PostItemContainer from '../../Container/Profile/PostItemContainer';
import { calcTimeElapsed } from '../../lib/calcTime';
import ProfileCarousel from '../Global/ProfileCarousel';
import PostTimeElapsed from '../Main/PostTimeElapsed';

const SinglePost = ({
  post,
  postId,
  profilePosts,
  displayName,
  comments,
  newComments,
  setNewComments,
  inputRef,
  onMoveProfilePage,
}) => {
  return (
    <StSinglePostWrapper>
      <StSinglePostSection>
        <StSinglePostBoxBlockInner>
          <StImageBox>
            <StImagesSection>
              <ProfileCarousel imagesArray={post?.imagesArray} pagination pos />
            </StImagesSection>
          </StImageBox>
          <StSinglePostDataBox>
            <SinglePostHeaderContainer post={post} />
            <SinglePostTextBoxContainer post={post} />
            <SinglePostCommentsContainer
              comments={comments}
              newComments={newComments}
            />
            <SinglePostNavigationContainer post={post} inputRef={inputRef} />
            <SinglePostHeartCountContainer post={post} />
            <PostTimeElapsed timeElapsed={calcTimeElapsed(post?.date)} />
            {post?.isPossibleToComment && (
              <PostChatInputContainer
                post={post}
                newComments={newComments}
                setNewComments={setNewComments}
                inputRef={inputRef}
              />
            )}
          </StSinglePostDataBox>
        </StSinglePostBoxBlockInner>
      </StSinglePostSection>
      {profilePosts?.length > 1 && (
        <StMoreSinglePostSection>
          <StMorePosts>
            <StDisplayName onClick={onMoveProfilePage}>
              {displayName}
            </StDisplayName>
            님의 게시물 더보기
          </StMorePosts>
          <StPostsWrapper>
            {profilePosts
              .filter(post => post.id !== postId)
              .slice(0, 6)
              .map((post, index) => {
                return (
                  <PostItemContainer
                    post={post}
                    key={index}
                    onClickPostModal={() => console.log('single post 보여주기')}
                  />
                );
              })}
          </StPostsWrapper>
        </StMoreSinglePostSection>
      )}
    </StSinglePostWrapper>
  );
};

const StSinglePostWrapper = styled.main`
  background-color: ${({ theme }) => theme.background};
  flex-grow: 1;
  margin-top: 5.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`;

const StSinglePostSection = styled.section`
  width: 95rem;
  padding: 3rem 0rem;
`;

const StSinglePostBoxBlockInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.gray};
  min-width: 100%;
  height: auto;
  max-height: 59.9rem;
`;

const StImageBox = styled.div`
  width: 60rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${({ theme }) => theme.gray8};
`;

const StImagesSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StSinglePostDataBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 35rem;
`;

const StMoreSinglePostSection = styled.section`
  padding-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.gray};
  width: 95rem;
`;

const StMorePosts = styled.div`
  padding: 2rem 0rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.2rem;
  font-weight: 600;
`;

const StDisplayName = styled.span`
  color: ${({ theme }) => theme.black};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StPostsWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 2.5rem;
  margin-bottom: 3rem;
`;
export default SinglePost;
