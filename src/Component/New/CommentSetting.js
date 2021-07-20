import React from 'react';
import styled from 'styled-components';

const CommentSetting = ({ isPossibleToComment, handleToggle }) => {
  return (
    <>
      <StCommentTitle>댓글 기능 해제</StCommentTitle>
      <StToggle checked={isPossibleToComment}>
        <input
          type="checkbox"
          checked={isPossibleToComment}
          onChange={handleToggle}
          hidden
        />
        <StCircle checked={isPossibleToComment} />
      </StToggle>
    </>
  );
};

const StCommentTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const StToggle = styled.label`
  display: flex;
  align-items: center;
  border-radius: 2rem;
  width: 3.6rem;
  height: 2rem;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease;
  background: ${({ checked, theme }) =>
    checked ? theme.activeBlue : theme.gray5};
`;

const StCircle = styled.span`
  position: absolute;
  left: 0.2rem;
  background: white;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  transition: all 0.4s ease;
  transform: ${({ checked }) => checked && 'translate3d(1.6rem, 0, 0)'};
`;

export default CommentSetting;
