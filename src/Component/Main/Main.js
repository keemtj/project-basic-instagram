import React from 'react';
import styled from 'styled-components';
import PostContainer from '../../Container/Main/PostContainer';
import AsideFooter from './AsideFooter';
import AsideContainer from '../../Container/Main/AsideContainer';
import Loading from '../Global/Loading';

const Main = ({ isLoading, mainPosts, userDatas, bookmarks, hearts }) => {
  console.log(userDatas);
  return (
    <StMainWrapper>
      <StMain>
        <StSection>
          {isLoading ? (
            <Loading isLoading={isLoading} />
          ) : (
            mainPosts?.map((post, index) => {
              const userData = userDatas.find(user => user.uid === post.uid);
              const isBookmark = bookmarks.find(
                bookmark => bookmark.id === post.id,
              );
              const isHeart = hearts.find(heart => heart.id === post.id);
              return (
                <PostContainer
                  key={index}
                  post={post}
                  displayName={userData?.displayName}
                  photoURL={userData?.photoURL || '/images/default_profile.png'}
                  isBookmark={isBookmark}
                  isHeart={isHeart}
                />
              );
            })
          )}
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
