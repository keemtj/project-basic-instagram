import React from 'react';
import styled from 'styled-components';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Chat } from '@styled-icons/bootstrap/Chat';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { BookmarkFill } from '@styled-icons/bootstrap/BookmarkFill';

const PostNavigation = ({
  onClickBookmark,
  onClickHeart,
  onClickShare,
  onClickPostModal,
  isBookmark,
  isHeart,
}) => {
  return (
    <StSectionNav>
      <div onClick={onClickHeart}>{isHeart ? <StHeartFill /> : <Heart />}</div>
      <div>
        <Chat onClick={onClickPostModal} />
      </div>
      <div>
        <PaperPlane onClick={onClickShare} />
      </div>
      <div onClick={onClickBookmark}>
        {isBookmark ? <StBookmarkFill /> : <Bookmark />}
      </div>
    </StSectionNav>
  );
};

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

export default PostNavigation;
