import React from 'react';
import styled from 'styled-components';
import Loading from '../Global/Loading';
import ProfileCarousel from '../Global/ProfileCarousel';
import HeartPostHeaderContainer from '../../Container/Profile/HeartPostHeaderContainer';
import HeartPostTextBoxContainer from '../../Container/Profile/HeartPostTextBoxContainer';
import HeartPostCommentsContainer from '../../Container/Profile/HeartPostCommentsContainer';
import HeartPostNavigationContainer from '../../Container/Profile/HeartPostNavigationContainer';
import HeartPostHeartCountContainer from '../../Container/Profile/HeartPostHeartCountContainer';
import PostTimeElapsed from '../Main/PostTimeElapsed';
import { calcTimeElapsed } from '../../lib/calcTime';
import PostChatInputContainer from '../../Container/Profile/PostChatInputContainer';

const HeartPost = ({
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
        <HeartPostHeaderContainer post={post} user={user} />
        <HeartPostTextBoxContainer post={post} user={user} />
        <HeartPostCommentsContainer
          comments={comments}
          modalLoading={modalLoading}
          newComments={newComments}
        />
        <HeartPostNavigationContainer post={post} inputRef={inputRef} />
        <HeartPostHeartCountContainer post={post} />
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

export default HeartPost;
