import React from 'react';
import styled from 'styled-components';

const PostComments = ({ isPossibleComment, comments, onClickPostModal }) => {
  return (
    <>
      {!isPossibleComment && (
        <StCommentsBox>
          {comments?.length > 2 && (
            <StMoreComments onClick={onClickPostModal}>
              댓글 {comments.length}개 모두 보기
            </StMoreComments>
          )}
          {comments?.slice(0, 2).map((comment, index) => (
            <div key={index}>
              <StDisplayName>{comment.displayName}</StDisplayName>{' '}
              <span>{comment.comment}</span>
            </div>
          ))}
        </StCommentsBox>
      )}
    </>
  );
};

const StCommentsBox = styled.section`
  width: 100%;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  & > div {
    margin-top: 1rem;
  }
`;

const StDisplayName = styled.span`
  font-weight: 600;
`;

const StMoreComments = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.darkGray};
  cursor: pointer;
`;

export default PostComments;
