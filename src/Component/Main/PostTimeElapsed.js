import React from 'react';
import styled from 'styled-components';

const PostTimeElapsed = ({ timeElapsed, comments, newComments }) => {
  return (
    <StDate comments={comments} newComments={newComments}>
      {timeElapsed}
    </StDate>
  );
};

const StDate = styled.div`
  margin-top: 1rem;
  padding: 0rem 1.5rem 1rem;
  color: ${({ theme }) => theme.darkGray};
`;

export default PostTimeElapsed;
