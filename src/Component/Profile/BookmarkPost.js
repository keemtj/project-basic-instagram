import React from 'react';
import styled from 'styled-components';
import Loading from '../Global/Loading';
import ProfileCarousel from '../Global/ProfileCarousel';
import BookmarkPostHeaderContainer from '../../Container/Profile/BookmarkPostHeaderContainer';
import BookmarkPostTextBoxContainer from '../../Container/Profile/BookmarkPostTextBoxContainer';
import BookmarkPostCommentsContainer from '../../Container/Profile/BookmarkPostCommentsContainer';
import BookmarkPostNavigationContainer from '../../Container/Profile/BookmarkPostNavigationContainer';
import BookmarkPostHeartCountContainer from '../../Container/Profile/BookmarkPostHeartCountContainer';
import PostTimeElapsed from '../Main/PostTimeElapsed';
import { calcTimeElapsed } from '../../lib/calcTime';
import PostChatInputContainer from '../../Container/Profile/PostChatInputContainer';

const BookmarkPost = ({
  modalLoading,
  post,
  user,
  comments,
  newComments,
  setNewComments,
  inputRef,
}) => {
  return (
    <StPostBoxBlockInner>
      <StImageBox>
        <StImagesSection>
          {modalLoading ? (
            <Loading isLoading={modalLoading} />
          ) : (
            <ProfileCarousel imagesArray={post?.imagesArray} pagination pos />
          )}
        </StImagesSection>
      </StImageBox>
      <StPostDataBox>
        <BookmarkPostHeaderContainer post={post} user={user} />
        <BookmarkPostTextBoxContainer post={post} user={user} />
        <BookmarkPostCommentsContainer
          comments={comments}
          modalLoading={modalLoading}
          newComments={newComments}
        />
        <BookmarkPostNavigationContainer post={post} inputRef={inputRef} />
        <BookmarkPostHeartCountContainer post={post} />
        <PostTimeElapsed timeElapsed={calcTimeElapsed(post?.date)} />
        {post?.isPossibleToComment && (
          <PostChatInputContainer
            post={post}
            newComments={newComments}
            setNewComments={setNewComments}
            inputRef={inputRef}
          />
        )}
      </StPostDataBox>
    </StPostBoxBlockInner>
  );
};

const StPostBoxBlockInner = styled.div`
  min-width: 100%;
  display: flex;
  flex-flow: row nowrap;
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
`;

const StPostDataBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 35rem;
`;

export default BookmarkPost;
