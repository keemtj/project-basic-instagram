import React from 'react';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostImages from './PostImages';
import PostNavigation from './PostNavigation';
import PostHeartCount from './PostHeartCount';
import PostTextBox from './PostTextBox';
import PostComments from './PostComments';
import PostTimeElapsed from './PostTimeElapsed';
import PostChatInput from './PostChatInput';

const Post = ({
  photoURL,
  displayName,
  location,
  imagesArray,
  heartCount,
  more,
  text,
  onClickMore,
  isPossibleComment,
  comments,
  timeElapsed,
  onMoveProfilePage,
  onClickHeart,
  onClickBookmark,
  isBookmark,
  isHeart,
  onClickSetting,
}) => {
  return (
    <StArticle>
      <PostHeader
        photoURL={photoURL}
        displayName={displayName}
        location={location}
        onMoveProfilePage={onMoveProfilePage}
        onClickSetting={onClickSetting}
      />
      <PostImages imagesArray={imagesArray} pagenation pos />
      <PostNavigation
        onClickBookmark={onClickBookmark}
        onClickHeart={onClickHeart}
        isBookmark={isBookmark}
        isHeart={isHeart}
      />
      <PostHeartCount heartCount={heartCount} onClickHeart={onClickHeart} />
      <PostTextBox
        displayName={displayName}
        more={more}
        onClickMore={onClickMore}
        text={text}
      />
      <PostComments isPossibleComment={isPossibleComment} comments={comments} />
      <PostTimeElapsed timeElapsed={timeElapsed} />
      <PostChatInput isPossibleComment={isPossibleComment} />
    </StArticle>
  );
};

const StArticle = styled.article`
  border: 1px solid ${({ theme }) => theme.gray};
  background: ${({ theme }) => theme.white};
  border-radius: 3px;
  margin-bottom: 6rem;
  width: 60rem;
  height: fit-content;
  display: flex;
  flex-flow: column nowrap;
`;

export default Post;
