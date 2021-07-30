import React from 'react';
import styled, { css } from 'styled-components';

const PostTextBox = ({
  displayName,
  text,
  more,
  onClickMore,
  postModalState,
  onMoveProfilePage,
}) => {
  return (
    <>
      {text && (
        <StTextBox>
          <StText more={more} postModalState={postModalState}>
            <StUsername onClick={onMoveProfilePage}>{displayName}</StUsername>{' '}
            <span>{text}</span>
          </StText>
          {!postModalState && text?.length > 70 && (
            <StMoreToggle onClick={onClickMore} more={more}>
              {more ? '더 보기' : '숨기기'}
            </StMoreToggle>
          )}
        </StTextBox>
      )}
    </>
  );
};

const StTextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1rem 0rem;
  padding: ${({ postModalState }) =>
    postModalState ? '1rem 1.5rem' : '0rem 1.5rem'};
  font-size: 1.4rem;
  word-break: break-all;
`;

const StText = styled.div`
  flex-grow: 1;
  width: ${({ more }) => (more ? '90%' : '100%')};
  line-height: 1.4;
  ${({ more }) =>
    more &&
    css`
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
  ${({ postModalState }) =>
    postModalState &&
    css`
      font-size: 1.5rem;
    `}
`;

const StUsername = styled.span`
  font-weight: 600;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StMoreToggle = styled.span`
  margin-left: ${({ more }) => (more ? '0.5rem' : '0')};
  color: ${({ theme }) => theme.darkGray};
  line-height: 1.3;
  cursor: pointer;
`;

export default PostTextBox;
