import React from 'react';
import styled from 'styled-components';
import PostContainer from '../../Container/Main/PostContainer';
import AsideFooter from './AsideFooter';
import AsideContainer from '../../Container/Main/AsideContainer';

const Main = ({ posts, userDatas, bookmarks, hearts }) => {
  return (
    <StMainWrapper>
      <StMain>
        <StSection>
          {posts?.map((post, index) => {
            const userData = userDatas.find(user => user.uid === post.uid);
            const bookmark = bookmarks.find(
              bookmark => bookmark.id === post.id,
            );
            const bookmarkState = bookmark?.id ? true : false;
            const heart = hearts.find(heart => heart.id === post.id);
            const heartState = heart?.id ? true : false;
            return (
              <PostContainer
                key={index}
                post={post}
                displayName={userData?.displayName}
                photoURL={userData?.photoURL || '/images/default_profile.png'}
                bookmarkState={bookmarkState}
                heartState={heartState}
              />
            );
          })}
        </StSection>
        <StAsideWrapper>
          <AsideContainer />
          <AsideFooter />
        </StAsideWrapper>
      </StMain>
    </StMainWrapper>
  );
};

const StMainWrapper = styled.div`
  background-color: #fafafa;
  flex-grow: 1;
  margin-top: 5.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StMain = styled.main`
  width: 95rem;
  padding-top: 3rem;
  display: flex;
  flex-flow: row nowrap;
`;

const StSection = styled.section`
  width: 65rem;
`;

const StAsideWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  padding-top: 3rem;
  top: 5.5rem;
  position: fixed;
  right: calc((100% - 95rem) / 2);
`;

export default Main;
