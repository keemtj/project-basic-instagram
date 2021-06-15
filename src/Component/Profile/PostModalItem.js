import React from 'react';
import styled from 'styled-components';
import PostImages from '../Main/PostImages';
import PostHeader from '../Main/PostHeader';
import PostTextBox from '../Main/PostTextBox';
import PostComments from '../Main/PostComments';
import PostNavigation from '../Main/PostNavigation';
import PostTimeElapsed from '../Main/PostTimeElapsed';
import PostChatInput from '../Main/PostChatInput';

const PostModalItem = ({ post }) => {
  const { imagesArray } = post;
  return (
    <StPostBoxBlockInner>
      <StImageBox>
        <PostImages imagesArray={imagesArray} pagenation pos />
      </StImageBox>
      <StPostDataBox>
        <PostHeader />
        <PostTextBox />
        <PostComments />
        <PostNavigation />
        <PostTimeElapsed />
        <PostChatInput />
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

const StPostDataBox = styled.div`
  width: 35rem;
`;

export default PostModalItem;
