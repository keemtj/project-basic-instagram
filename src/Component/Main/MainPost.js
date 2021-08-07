import React from 'react';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostImages from './PostImages';
import PostNavigation from './PostNavigation';
import PostHeartCount from './PostHeartCount';
import PostTextBox from './PostTextBox';
import PostCommentsContainer from '../../Container/Main/PostCommentsContainer';
import PostTimeElapsed from './PostTimeElapsed';
import PostChatInputContainer from '../../Container/Main/PostChatInputContainer';

const MainPost = ({
  id,
  displayName,
  photoURL,
  location,
  imagesArray,
  heartCount,
  more,
  text,
  onClickMore,
  isPossibleToComment,
  comments,
  newComments,
  setNewComments,
  timeElapsed,
  onMoveProfilePage,
  onClickHeart,
  onClickBookmark,
  onClickShare,
  isSaved,
  isLiked,
  onClickSetting,
  onClickHeartCount,
  onClickPostModal,
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
      <PostImages imagesArray={imagesArray} pagination pos />
      <PostNavigation
        onClickBookmark={onClickBookmark}
        onClickHeart={onClickHeart}
        onClickShare={onClickShare}
        onClickPostModal={onClickPostModal}
        isSaved={isSaved}
        isLiked={isLiked}
      />
      <PostHeartCount
        heartCount={heartCount}
        onClickHeartCount={onClickHeartCount}
        onClickHeart={onClickHeart}
      />
      <PostTextBox
        displayName={displayName}
        more={more}
        onClickMore={onClickMore}
        text={text}
        onMoveProfilePage={onMoveProfilePage}
      />
      <PostCommentsContainer
        comments={comments}
        onClickPostModal={onClickPostModal}
        newComments={newComments}
      />
      <PostTimeElapsed
        timeElapsed={timeElapsed}
        comments={comments}
        newComments={newComments}
      />
      {isPossibleToComment && (
        <PostChatInputContainer
          id={id}
          newComments={newComments}
          setNewComments={setNewComments}
        />
      )}
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
  position: relative; /* Emoji */
`;

export default MainPost;
