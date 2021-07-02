import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { calcTimeElapsed } from '../../lib/calcTime';

const PostComments = ({ displayNames, comments, onClickPostModal }) => {
  return (
    <>
      {comments?.length > 0 && (
        <StCommentsBox>
          {comments?.length > 2 && (
            <StMoreComments onClick={onClickPostModal}>
              댓글 {comments.length}개 모두 보기
            </StMoreComments>
          )}
          <StCommentsUl>
            {comments?.slice(-2, comments?.length).map((comment, index) => {
              const dns = displayNames.slice(-2, displayNames.length);
              return (
                <StComment key={index}>
                  <StLink to={`/${displayNames[index]}`}>
                    <StDisplayName>{dns[index]}</StDisplayName>{' '}
                  </StLink>
                  <StText>{comment.comment}</StText>
                  <StTimeStamp>{calcTimeElapsed(comment.date)}</StTimeStamp>
                  <div />
                </StComment>
              );
            })}
          </StCommentsUl>
        </StCommentsBox>
      )}
    </>
  );
};

const StCommentsBox = styled.section`
  padding: 0rem 1.5rem;
  width: 100%;
  font-size: 1.4rem;
`;

const StMoreComments = styled.div`
  margin-top: 1rem;
  width: 100%;
  color: ${({ theme }) => theme.darkGray};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const StCommentsUl = styled.ul`
  margin-top: 1rem;
  height: fit-content;
`;

const StComment = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + & {
    margin-top: 1.2rem;
  }
`;

const StLink = styled(Link)`
  align-self: flex-start;
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StDisplayName = styled.span`
  font-weight: 600;
`;

const StText = styled.span`
  align-self: flex-start;
  flex-grow: 1;
  margin-left: 0.5rem;
  word-break: break-all;
`;

const StTimeStamp = styled.span`
  align-self: flex-start;
  margin-top: 0.2rem;
  min-width: 6rem;
  color: ${({ theme }) => theme.darkGray};
  text-align: right;
  font-size: 1rem;
  line-height: 1.1;
`;

export default PostComments;
