import React from 'react';
import styled from 'styled-components';

const PostTimeElapsed = ({ timeElapsed, comments }) => {
  return <StDate comments={comments}>{timeElapsed}</StDate>;
};

const StDate = styled.div`
  padding: 1rem 1.5rem;
  padding: ${({ comments }) => comments.length === 0 && '0rem 1.5rem 1rem'};
  color: ${({ theme }) => theme.darkGray};
`;

export default PostTimeElapsed;
