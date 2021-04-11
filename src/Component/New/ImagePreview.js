import React from 'react';
import styled from 'styled-components';

const ImagePreview = ({ images, children }) => {
  return (
    <>
      {images.length ? (
        <StImagePreview>
          {images.map((image, index) => {
            return (
              <StImage key={index} src={image.url} alt={image.file.name} />
            );
          })}
        </StImagePreview>
      ) : (
        <div>
          <StImagePreviewLabel htmlFor="upload">
            <StIconWrapper>{children}</StIconWrapper>
            <StText>업로드된 사진이 여기에 표시됩니다.</StText>
            <input
              id="upload"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              multiple
              hidden
            />
          </StImagePreviewLabel>
        </div>
      )}
    </>
  );
};

const StImagePreview = styled.div`
  display: flex;
  overflow: auto;
  & > img + img {
    margin-left: 1rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StImagePreviewLabel = styled.label`
  display: flex;
  background: ${({ theme }) => theme.gray2};
  width: 100%;
  height: 25rem;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StImage = styled.img`
  width: 25rem;
  height: 25rem;
`;

const StText = styled.div`
  margin-top: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

const StIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
`;

export default ImagePreview;
