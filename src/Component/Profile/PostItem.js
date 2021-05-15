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
