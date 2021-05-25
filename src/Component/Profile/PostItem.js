import React from 'react';
import styled from 'styled-components';
import Carousel from '../Global/Carousel';

const PostItem = ({
  imagesArray,
  hover,
  onShow,
  onHide,
  heartCount,
  comments,
  postId,
  postUid,
  onClickPostModal,
}) => {
  return (
    <StPostWrapper>
      <Carousel
        imagesArray={imagesArray}
        badge={imagesArray?.length > 1}
        profile={true}
        hover={hover}
        onShow={onShow}
        onHide={onHide}
        heartCount={heartCount}
        comments={comments}
        postId={postId}
        postUid={postUid}
        onClick={onClickPostModal}
      />
    </StPostWrapper>
  );
};

const StPostWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 30rem;
  cursor: pointer;
`;

export default PostItem;
