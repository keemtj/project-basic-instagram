import React from 'react';
import styled from 'styled-components';

const MyImages = () => {
  const datas = [];
  return (
    <StMyImagesWrapper>
      {datas?.map(({ id, media_url, caption }) => (
        <StImage src={media_url} alt={caption} key={id} />
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
