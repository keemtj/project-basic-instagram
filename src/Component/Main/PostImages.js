import React from 'react';
import styled from 'styled-components';
import Carousel from '../Global/Carousel';

const PostImages = ({ ...rest }) => {
  return (
    <StImagesSection>
      <Carousel {...rest} />
    </StImagesSection>
  );
};

const StImagesSection = styled.section`
  width: 100%;
`;

export default PostImages;
