import React from 'react';
import styled from 'styled-components';
import PostContainer from '../../Container/Main/PostContainer';
import AsideFooter from './AsideFooter';
import AsideContainer from '../../Container/Main/AsideContainer';
import Loading from '../Global/Loading';

const Main = ({
  newPost,
  newPostUserData,
  isLoading,
  mainPosts,
  userDatas,
  bookmarks,
  hearts,
}) => {
  // // 비공개 계정이 아니고, 좋아요나 북마크 수가 많은 유저의 포스츠
  // const influencePosts = [
  //   {
  //     date: '2020-03-05',
  //     text: 'influencer',
  //     location: 'seoul',
  //     subLocation: 'gangnam',
  //     isPossibleComment: true,
  //     heartCount: 100,
  //     bookmarkCount: 0,
  //     comments: [],
  //     hearts: [],
  //     bookmarks: [],
  //     imagesArray: [
  //       {
  //         url: '/images/default_profile.png',
  //         name: 'test',
  //         timeCreated: '2020-03-05',
  //       },
  //     ],
  //   },
  // ];
  return (
    <StMainWrapper>
      <StMain>
        <StSection>
          {isLoading ? (
            <Loading isLoading={isLoading} />
          ) : (
            <>
              {newPost.length !== 0 &&
                newPost.map((post, index, arr) => {
                  return (
                    <PostContainer
                      key={index}
                      post={post}
                      displayName={newPostUserData.displayName}
                      photoURL={newPostUserData.photoURL}
                      newPost={arr}
                    />
                  );
                })}
              {mainPosts?.map((post, index) => {
                const userData = userDatas.find(user => user.uid === post?.uid);
                const isBookmark = bookmarks.find(
                  bookmark => bookmark.id === post.id,
                );
                const isHeart = hearts.find(heart => heart.id === post.id);
                return (
                  <PostContainer
                    key={index}
                    post={post}
                    displayName={userData?.displayName}
                    photoURL={
                      userData?.photoURL || '/images/default_profile.png'
                    }
                    isBookmark={isBookmark}
                    isHeart={isHeart}
                  />
                );
              })}
              {/* {mainPosts.length === 0 && */}
              {/* newPost.length === 0 && */}
              {/* {
                <>
                  <div
                    style={{
                      width: '60rem',
                      height: '10rem',
                      fontSize: '1.5rem',
                      textAlign: 'center',
                      border: '1px solid black',
                      marginBottom: '1.5rem',
                    }}
                  >
                    새 게시물을 업롣드하거나 새로운 친구를 팔로우하고 새로운
                    피드를 받아보세요.
                  </div>
                  {influencePosts.map((post, index) => (
                    <PostContainer
                      key={index}
                      post={post}
                      displayName={'influencer'}
                      photoURL={'/images/default_profile.png'}
                      isBookmark={false}
                      isHeart={false}
                    />
                  ))}
                </>
              } */}
            </>
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
