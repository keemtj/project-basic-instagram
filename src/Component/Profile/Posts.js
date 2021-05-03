import React from 'react';
import styled from 'styled-components';
import EmptyPosts from './EmptyPosts';
import PostItemContainer from '../../Container/Profile/PostItemContainer';

const Posts = ({ myPosts, loading, error, images }) => {
  if (loading) return <div>로딩중....</div>;
  if (error) return <div>에러 발생!</div>;
  if (!myPosts) return <EmptyPosts />;
  if (myPosts)
    return (
      <StPostsWrapper>
        {myPosts?.map((post, index) => (
          <PostItemContainer post={post} key={index} image={images} />
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
