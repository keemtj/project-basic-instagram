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

const Post = ({
  uid,
  id,
  displayName,
  photoURL,
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
  onClickShare,
  isBookmark,
  isHeart,
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
      <PostImages imagesArray={imagesArray} pagenation pos />
      <PostNavigation
        onClickBookmark={onClickBookmark}
        onClickHeart={onClickHeart}
        onClickShare={onClickShare}
        isBookmark={isBookmark}
        isHeart={isHeart}
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
      />
      <PostCommentsContainer
        isPossibleComment={isPossibleComment}
        comments={comments}
        onClickPostModal={onClickPostModal}
      />
      <PostTimeElapsed timeElapsed={timeElapsed} />
      <PostChatInputContainer
        isPossibleComment={isPossibleComment}
        uid={uid}
        id={id}
      />
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

export default Post;
