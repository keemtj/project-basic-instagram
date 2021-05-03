import React from 'react';
import styled from 'styled-components';
import PostItemContainer from '../../Container/Profile/PostItemContainer';

const Posts = ({ myPosts }) => {
  return (
    <StPostsWrapper>
      {myPosts?.map((post, index) => (
        <PostItemContainer post={post} key={index} />
      ))}
    </StPostsWrapper>
  );
};

const StPostsWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 2.5rem;
  margin-bottom: 3rem;
`;

export default Posts;
