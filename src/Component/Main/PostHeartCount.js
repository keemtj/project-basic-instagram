import React from 'react';
import styled from 'styled-components';

const PostHeartCount = ({ heartCount, onClickHeartCount, onClickHeart }) => {
  return (
    <StHeartCountWrapper>
      {heartCount > 0 ? (
        <StHeartCountBox onClick={onClickHeartCount}>
          좋아요 <StHeartCount>{heartCount}</StHeartCount>개
        </StHeartCountBox>
      ) : (
        <div>
          가장 먼저 <StHeartCount onClick={onClickHeart}>좋아요</StHeartCount>를
          눌러주세요
        </div>
      )}
    </StHeartCountWrapper>
  );
};

const StHeartCountWrapper = styled.div`
  padding: 0rem 1.5rem;
  width: fit-content;
  font-size: 1.4rem;
  font-weight: 500;
`;

const StHeartCountBox = styled.div`
  cursor: pointer;
`;

const StHeartCount = styled.span`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
`;

export default PostHeartCount;
