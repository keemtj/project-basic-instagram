import React from 'react';
import styled, { css } from 'styled-components';
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Chat } from '@styled-icons/bootstrap/Chat';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { BookmarkFill } from '@styled-icons/bootstrap/BookmarkFill';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';
import Carousel from '../Global/Carousel';
import ProfileImage from '../Global/ProfileImage';

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
}) => {
  return (
    <StArticle>
      <StHeader>
        <ProfileImage
          src={photoURL}
          alt={displayName}
          width={3}
          height={3}
          onClick={onMoveProfilePage}
        >
          <div>
            <StDisplayName onClick={onMoveProfilePage}>
              {displayName}
            </StDisplayName>
            {location && <StLocation>{location}</StLocation>}
          </div>
        </ProfileImage>
        <button style={{ width: '2rem' }}>
          <ThreeDots />
        </button>
      </StHeader>
      <StImagesSection>
        <Carousel imagesArray={imagesArray} pagenation />
      </StImagesSection>
      <StSectionNav>
        <div onClick={onClickHeart}>
          {isHeart ? <StHeartFill /> : <Heart />}
        </div>
        <div>
          <Chat />
        </div>
        <div>
          <PaperPlane />
        </div>
        <div onClick={onClickBookmark}>
          {isBookmark ? <StBookmarkFill /> : <Bookmark />}
        </div>
      </StSectionNav>
      {/* {heartCount > 0 && <StHeartCount>좋아요 {heartCount}개</StHeartCount>} */}
      <StHeartCountWrapper>
        {heartCount > 0 ? (
          <>
            좋아요 <StHeartCount>{heartCount}</StHeartCount>개
          </>
        ) : (
          <span>
            가장 먼저{' '}
            <StHeartCount heartCount={heartCount} onClick={onClickHeart}>
              좋아요
            </StHeartCount>
            를 눌러주세요
          </span>
        )}
      </StHeartCountWrapper>
      <StTextBox>
        <StText more={more}>
          <StUsername>{displayName}</StUsername> {text}{' '}
        </StText>
        {text?.length > 70 && (
          <StMoreToggle onClick={onClickMore} more={more}>
            {more ? '더 보기' : '숨기기'}
          </StMoreToggle>
        )}
      </StTextBox>
      {!isPossibleComment && (
        <StCommentsBox>
          {comments?.length > 2 && (
            <StMoreComments>댓글 {comments.length}개 모두 보기</StMoreComments>
          )}
          {comments?.map((comment, index) => (
            <div key={index}>
              <StUsername>{comment.id}</StUsername>{' '}
              <span>{comment.comment}</span>
            </div>
          ))}
        </StCommentsBox>
      )}
      <StDate>{timeElapsed}</StDate>
      {!isPossibleComment && (
        <StChatCommentLabel>
          <button>
            <StEmojiSmile />
          </button>
          <StCommentInput type="text" placeholder="댓글 달기..." />
          <StCommentButton type="submit">게시</StCommentButton>
        </StChatCommentLabel>
      )}
    </StArticle>
  );
};

const StArticle = styled.article`
  border: 1px solid ${({ theme }) => theme.gray};
  background: ${({ theme }) => theme.white};
  border-radius: 3px;
  margin-bottom: 6rem;
  width: 62rem;
  height: fit-content;
  display: flex;
  flex-flow: column nowrap;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  padding: 0rem 1.5rem;
  width: 100%;
  height: 5.5rem;
  & > div {
    display: flex;
    align-items: center;
    & > div {
      margin-left: 1.5rem;
    }
  }
  font-size: 1.4rem;
  font-weight: 600;
`;

const StDisplayName = styled.h2`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StLocation = styled.div`
  margin-top: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
`;

const StImagesSection = styled.section`
  width: 100%;
`;

const StSectionNav = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0rem 1.5rem;
  & > div {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
  & > div + div {
    margin-left: 1.5rem;
  }
  & > :last-child {
    margin-left: auto;
  }
`;

const StHeartFill = styled(HeartFill)`
  color: ${({ theme }) => theme.heart};
`;

const StBookmarkFill = styled(BookmarkFill)`
  color: ${({ theme }) => theme.heart};
`;

const StHeartCountWrapper = styled.div`
  font-size: 1.4rem;
  padding: 0rem 1.5rem;
  font-weight: 500;
`;

const StHeartCount = styled.span`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: ${({ heartCount }) => (heartCount === 0 ? 'pointer' : 'default')};
`;

const StTextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.5rem;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  word-break: break-all;
`;

const StText = styled.div`
  width: ${({ more }) => (more ? '90%' : '100%')};
  line-height: 1.3;
  ${({ more }) =>
    more &&
    css`
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

const StUsername = styled.span`
  font-weight: 600;
`;

const StMoreToggle = styled.span`
  margin-left: ${({ more }) => (more ? '0.5rem' : '0')};
  color: ${({ theme }) => theme.darkGray};
  line-height: 1.3;
  cursor: pointer;
`;

const StCommentsBox = styled.section`
  width: 100%;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  & > div {
    margin-top: 0.5rem;
  }
`;

const StDate = styled.div`
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

const StMoreComments = styled.div`
  color: ${({ theme }) => theme.darkGray};
`;

const StChatCommentLabel = styled.label`
  border-top: 1px solid ${({ theme }) => theme.gray};
  padding: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StEmojiSmile = styled(EmojiSmile)`
  width: 3rem;
`;

const StCommentInput = styled.input`
  border: none;
  background: ${({ theme }) => theme.white};
  margin-left: 1.5rem;
  width: 100%;
  outline: none;
`;

const StCommentButton = styled.button`
  width: 4rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.activeBlue};
`;

export default Post;
