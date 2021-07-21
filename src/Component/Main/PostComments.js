import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { calcTimeElapsed } from '../../lib/calcTime';

const PostComments = ({
  displayNames,
  comments,
  onClickPostModal,
  newComments,
}) => {
  return (
    <>
      {comments?.length > 0 && (
        <StCommentsBox>
          {comments?.length > 2 && (
            <StMoreComments onClick={onClickPostModal}>
              댓글 {comments.length}개 모두 보기
            </StMoreComments>
          )}
          <StCommentsUl comments={comments}>
            {comments?.slice(-2, comments?.length).map((comment, index) => {
              const dns = displayNames.slice(-2, displayNames.length);
              return (
                <StComment key={index}>
                  <StLink to={`/${displayNames[index]}`}>
                    <StDisplayName>{dns[index]}</StDisplayName>{' '}
                  </StLink>
                  <StText>{comment.text}</StText>
                  <StTimeStamp>{calcTimeElapsed(comment.date)}</StTimeStamp>
                  <div />
                </StComment>
              );
            })}
          </StCommentsUl>
        </StCommentsBox>
      )}
      {newComments.length > 0 && (
        <StCommentsBox>
          <StNewCommentsUl newComments={newComments}>
            {newComments.map((comment, index) => {
              return (
                <StComment key={index}>
                  <StLink to={`/${comment.displayName}`}>
                    <StDisplayName>{comment.displayName}</StDisplayName>{' '}
                  </StLink>
                  <StText>{comment.text}</StText>
                  <StTimeStamp>{calcTimeElapsed(comment.date)}</StTimeStamp>
                  <div />
                </StComment>
              );
            })}
          </StNewCommentsUl>
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
  width: 100%;
  color: ${({ theme }) => theme.darkGray};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const StCommentsUl = styled.ul`
  margin-top: ${({ comments }) => comments?.length > 2 && '1rem'};
  height: fit-content;
`;

const StNewCommentsUl = styled.ul`
  margin-top: ${({ newComments }) => newComments?.length > 0 && '1rem'};
  height: fit-content;
`;

const StComment = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + & {
    margin-top: 1rem;
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
`;

const StTimeStamp = styled.span`
  align-self: flex-start;
  margin-top: 0.2rem;
  min-width: 5rem;
  color: ${({ theme }) => theme.darkGray};
  text-align: right;
  font-size: 1rem;
  line-height: 1.1;
`;

export default PostComments;
