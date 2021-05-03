import React from 'react';
import styled, { css } from 'styled-components';

const PostItem = ({ srcs, alt }) => {
  return (
    <>
      <StPostWrapper>
        <StPost src={srcs?.[0]} alt={alt} />
        <StHover hover={false}>핱 190 댓 25</StHover>
      </StPostWrapper>
    </>
  );
};

const StPostWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 30rem;
  cursor: pointer;
`;

const StPost = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
`;

const StHover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ hover }) =>
    hover
      ? css`
          color: red;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
        `
      : css`
          display: none;
        `}
`;
export default PostItem;
