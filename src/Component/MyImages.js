import React from 'react';
import styled from 'styled-components';

const BASE_URL = 'https://source.unsplash.com/random/';
const images = [
  { id: 1, url: BASE_URL + '500x500' },
  { id: 2, url: BASE_URL },
  { id: 3, url: BASE_URL },
  { id: 4, url: BASE_URL },
  { id: 5, url: BASE_URL },
];

const MyImages = () => {
  return (
    <StMyImagesWrapper>
      {images.map(image => (
        <StImage src={image.url} alt={image.id} key={image.id} />
      ))}
    </StMyImagesWrapper>
  );
};

const StMyImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 2.5rem;
  margin-bottom: 3rem;
`;

const StImage = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
`;

export default MyImages;
