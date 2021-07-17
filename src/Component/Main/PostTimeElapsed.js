import React from 'react';
import styled from 'styled-components';
import { calcTimeElapsed } from '../../lib/calcTime';

const PostTimeElapsed = ({ post }) => {
  return <StDate>{calcTimeElapsed(post?.date)}</StDate>;
};

const StDate = styled.div`
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

export default PostTimeElapsed;
