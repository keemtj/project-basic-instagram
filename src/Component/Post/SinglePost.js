import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PostContainer from '../../Container/Main/PostContainer';

const SinglePost = () => {
  const { data: mainPosts } = useSelector(state => state.posts.mainPosts);
  const { activePostIndex } = useSelector(state => state.posts);
  const [newComments, setNewComments] = useState([]);

  return (
    <StSinglePostWrapper>
      <StSinglePost>
        <PostContainer
          post={mainPosts?.[activePostIndex]}
          newComments={newComments}
          setNewComments={setNewComments}
        />
        <StMoreSinglePost>Temp님의 게시물 더 보기</StMoreSinglePost>
      </StSinglePost>
    </StSinglePostWrapper>
  );
};

const StSinglePostWrapper = styled.div`
  background-color: #fafafa;
  flex-grow: 1;
  margin-top: 5.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
`;

const StSinglePost = styled.main`
  border: 1px solid red;
  width: 95rem;
  padding-top: 3rem;
  display: flex;
  flex-flow: row nowrap;
`;

const StMoreSinglePost = styled.section`
  border: 1px solid red;
  width: 95rem;
  height: 10rem;
`;
export default SinglePost;
