import React from 'react';
import styled from 'styled-components';

const PostTimeElapsed = ({ timeElapsed }) => {
  return <StDate>{timeElapsed}</StDate>;
};

const StDate = styled.div`
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

export default PostTimeElapsed;
