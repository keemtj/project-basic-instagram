import React from 'react';
import styled from 'styled-components';
import Carousel from '../Global/Carousel';

const PostImages = ({ imagesArray }) => {
  return (
    <StImagesSection>
      <Carousel imagesArray={imagesArray} pagenation />
    </StImagesSection>
  );
};

const StImagesSection = styled.section`
  width: 100%;
`;

export default PostImages;
