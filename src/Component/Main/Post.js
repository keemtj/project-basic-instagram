import React from 'react';
import styled from 'styled-components';
import ProfileCarousel from '../Global/ProfileCarousel';
import PostTimeElapsed from '../Main/PostTimeElapsed';
import { calcTimeElapsed } from '../../lib/calcTime';
import PostHeaderContainer from '../../Container/Main/PostHeaderContainer';
import PostChatInputContainer from '../../Container/Profile/PostChatInputContainer';
import PostTextBoxContainer from '../../Container/Main/PostTextBoxContainer';

const Post = ({
  post,
  //comments,
  newComments,
  setNewComments,
  inputRef,
}) => {
  return (
    <StPostBoxBlockInner>
      <StImageBox>
        <StImagesSection>
          <ProfileCarousel imagesArray={post?.imagesArray} pagination pos />
        </StImagesSection>
      </StImageBox>
      <StPostDataBox>
        <PostHeaderContainer post={post} />
        <PostTextBoxContainer post={post} />
        {/* <PostTextBoxContainer post={post} /> */}
        {/* <PostCommentsContainer comments={comments} newComments={newComments} /> */}
        {/* <PostNavigationContainer post={post} inputRef={inputRef} /> */}
        {/* <PostHeartCountContainer post={post} /> */}
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
