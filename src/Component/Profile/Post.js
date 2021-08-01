import React from 'react';
import styled from 'styled-components';
import Loading from '../Global/Loading';
import ProfileCarousel from '../Global/ProfileCarousel';
// import PostTimeElapsed from '../Main/PostTimeElapsed';
// import PostHeaderContainer from '../../Container/Main/PostHeaderContainer';
// import PostTextBoxContainer from '../../Container/Main/PostTextBoxContainer';
// import PostCommentsInModalContainer from '../../Container/Main/PostCommentsInModalContainer';
// import PostNavigationContainer from '../../Container/Main/PostNavigationContainer';
// import PostHeartCountContainer from '../../Container/Main/PostHeartCountContainer';
// import PostChatInputInModalContainer from '../../Container/Main/PostChatInputInModalContainer';

const Post = ({
  modalLoading,
  date,
  uid,
  isPossibleToComment,
  location,
  id,
  text,
  imagesArray,
  hearts,
  heartsCount,
  bookmarks,
  subLocation,
  comments,
}) => {
  console.log({
    date,
    uid,
    isPossibleToComment,
    location,
    id,
    text,
    imagesArray,
    hearts,
    heartsCount,
    bookmarks,
    subLocation,
    comments,
  });

  return (
    <StPostBoxBlockInner>
      <StImageBox>
        <StImagesSection>
          {modalLoading ? (
            <Loading isLoading={modalLoading} />
          ) : (
            <ProfileCarousel imagesArray={imagesArray} pagination pos />
          )}
        </StImagesSection>
      </StImageBox>
      <StPostDataBox>
        {/* <PostHeaderContainer />
        <PostTextBoxContainer />
        <PostCommentsInModalContainer />
        <PostNavigationContainer heartsCount={heartsCount} />
        <PostHeartCountContainer heartsCount={heartsCount} />
        <PostTimeElapsed />
        <PostChatInputInModalContainer /> */}
      </StPostDataBox>
    </StPostBoxBlockInner>
  );
};

const StPostBoxBlockInner = styled.div`
  min-width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const StImageBox = styled.div`
  width: 60rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${({ theme }) => theme.gray8};
`;

const StImagesSection = styled.section`
  width: 100%;
`;

const StPostDataBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 35rem;
`;

export default Post;
