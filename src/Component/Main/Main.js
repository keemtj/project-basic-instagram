import React from 'react';
import styled from 'styled-components';
import MainPostContainer from '../../Container/Main/MainPostContainer';
import AsideFooter from './AsideFooter';
import AsideContainer from '../../Container/Main/AsideContainer';
import Loading from '../Global/Loading';
import { NoData } from '../Global/Empty';

const Main = ({
  isLoading,
  mainPosts,
  userDatas,
  intersectionObserver,
  lastDocs,
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
  console.log(lastDocs.length);
  return (
    <StMainWrapper>
      <StMain>
        <StSection>
          {isLoading ? (
            <Loading isLoading={isLoading} />
          ) : (
            <>
              {mainPosts?.map((post, index) => {
                const userData = userDatas.find(user => user.uid === post?.uid);
                return (
                  <MainPostContainer
                    key={index}
                    post={post}
                    index={index}
                    userDatas={userDatas}
                    displayName={userData?.displayName}
                    photoURL={
                      userData?.photoURL || '/images/default_profile.png'
                    }
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
                    <MainPostContainer
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
              {!isLoading && !lastDocs.length && <NoData isNoData />}
              {!isLoading && lastDocs.length > 0 && (
                <StObserve {...intersectionObserver} />
              )}
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
  flex-flow: column nowrap;
`;

const StSection = styled.section`
  width: 65rem;
`;

const StObserve = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 60rem;
  height: 10rem;
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
