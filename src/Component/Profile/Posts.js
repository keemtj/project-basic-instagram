import React from 'react';
import styled from 'styled-components';
import EmptyPosts from './EmptyPosts';

const Posts = () => {
  const datas = [];
  const flag = true;
  if (flag) return <EmptyPosts />;
  return (
    <StPostsWrapper>
      {datas.map(({ id, media_url, caption }) => (
        <StPost src={media_url} alt={caption} key={id} />
      ))}
    </StPostsWrapper>
  );
};

const StPostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 2.5rem;
  margin-bottom: 3rem;
`;

const StPost = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
`;

export default Posts;
