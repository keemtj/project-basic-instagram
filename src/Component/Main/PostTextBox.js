import React from 'react';
import styled, { css } from 'styled-components';

const PostTextBox = ({ displayName, more, onClickMore, text }) => {
  return (
    <>
      {text && (
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
      )}
    </>
  );
};

const StTextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 1rem;
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

export default PostTextBox;
