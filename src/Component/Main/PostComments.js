import React from 'react';
import styled from 'styled-components';

const PostComments = ({ isPossibleComment, comments }) => {
  return (
    <>
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
    </>
  );
};

const StUsername = styled.span`
  font-weight: 600;
`;

const StCommentsBox = styled.section`
  width: 100%;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  & > div {
    margin-top: 0.5rem;
  }
`;

const StMoreComments = styled.div`
  color: ${({ theme }) => theme.darkGray};
`;

export default PostComments;
