import React from 'react';
import styled from 'styled-components';
import Carousel from '../Global/Carousel';

const PostItem = ({ imagesArray }) => {
  return (
    <>
      <StPostWrapper>
        <Carousel
          imagesArray={imagesArray}
          multiple={imagesArray.length > 1}
          hover
        />
      </StPostWrapper>
    </>
  );
};

const StPostWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 30rem;
  cursor: pointer;
`;

export default PostItem;
