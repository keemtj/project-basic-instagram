import React from 'react';
import styled from 'styled-components';
import Loading from '../Global/Loading';
import ProfileCarousel from '../Global/ProfileCarousel';
import PostHeaderContainer from '../../Container/Profile/PostHeaderContainer';
import PostTextBoxContainer from '../../Container/Profile/PostTextBoxContainer';
import PostCommentsContainer from '../../Container/Profile/PostCommentsContainer';
import PostNavigationContainer from '../../Container/Profile/PostNavigationContainer';
import PostHeartCountContainer from '../../Container/Profile/PostHeartCountContainer';
import PostTimeElapsed from '../Main/PostTimeElapsed';
import { calcTimeElapsed } from '../../lib/calcTime';
import PostChatInputContainer from '../../Container/Profile/PostChatInputContainer';

const Post = ({
  modalLoading,
  post,
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
        <PostHeaderContainer post={post} />
        <PostTextBoxContainer post={post} />
        <PostCommentsContainer
          comments={comments}
          modalLoading={modalLoading}
          newComments={newComments}
        />
        <PostNavigationContainer post={post} inputRef={inputRef} />
        <PostHeartCountContainer post={post} />
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

export default Post;
