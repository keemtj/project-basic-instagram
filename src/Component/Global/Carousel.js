import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';
import { ArrowLeftCircleFill } from '@styled-icons/bootstrap/ArrowLeftCircleFill';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';

const Carousel = ({ imageSrc, pagenation }) => {
  console.log(imageSrc.length);
  const ref = useRef();
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    ref.current.style.transform = `translate(-${100 * (currentImage - 1)}%)`;
    currentImage > 0 && setCurrentImage(currentImage - 1);
  };

  const handleNext = () => {
    ref.current.style.transform = `translate(-${100 * (currentImage + 1)}%)`;
    currentImage < imageSrc.length - 1 && setCurrentImage(currentImage + 1);
  };

  return (
    <StCarouselWrapper>
      <StCarousel>
        <StCarouselInner ref={ref}>
          {imageSrc?.map((image, index) => (
            <StImageWrapper key={index}>
              <StImage src={image.url} alt={image.name} />
            </StImageWrapper>
          ))}
        </StCarouselInner>
      </StCarousel>
      <StSlideButtonWrapper>
        {currentImage > 0 ? (
          <StSlideButton type="button" onClick={handlePrev}>
            <StLeftButton />
          </StSlideButton>
        ) : (
          <div />
        )}
        {currentImage < imageSrc?.length - 1 && (
          <StSlideButton type="button" onClick={handleNext}>
            <StRightButton />
          </StSlideButton>
        )}
      </StSlideButtonWrapper>
      {pagenation && imageSrc?.length >= 2 && (
        <StPagenation>
          {imageSrc?.map((_, index) => (
            <StPage key={index} currentImage={currentImage}>
              <Dot />
            </StPage>
          ))}
        </StPagenation>
      )}
    </StCarouselWrapper>
  );
};

const StCarouselWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StCarousel = styled.div`
  width: 100%;
  overflow: hidden;
`;

const StCarouselInner = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  transition: all 0.5s ease;
`;

const StImageWrapper = styled.div`
  min-width: 100%;
`;

const StImage = styled.img`
  width: 100%;
  height: auto;
`;

const StSlideButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

const StSlideButton = styled.button`
  padding: 1rem;
  color: ${({ theme }) => theme.gray8};
  cursor: pointer;
  outline: none;
`;

const StLeftButton = styled(ArrowLeftCircleFill)`
  width: 2.5rem;
  height: 2.5rem;
`;

const StRightButton = styled(ArrowRightCircleFill)`
  width: 2.5rem;
  height: 2.5rem;
`;

const StPagenation = styled.ul`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const StPage = styled.li`
  width: 3rem;
  color: ${({ theme }) => theme.darkGray};
  &:nth-child(${({ currentImage }) => currentImage + 1}) {
    color: ${({ theme }) => theme.activeBlue};
  }
  & + & {
    margin-left: -2rem;
  }
`;

export default Carousel;
