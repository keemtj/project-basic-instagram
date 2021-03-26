import React from 'react';
import styled from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';
import { ArrowLeftCircleFill } from '@styled-icons/bootstrap/ArrowLeftCircleFill';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';

const Carousel = () => {
  const images = [
    'https://s6.favim.com/orig/140415/black-cute-girl-grunge-Favim.com-1669287.jpg',
    'https://www.studyheights.com/uploads/quizzCategory/a98500a459e1b0bfbbfa43bf9da1e9b7.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FoDXeLRXEqA2o02I2JPgz2VhDb1vyuFAKQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FoDXeLRXEqA2o02I2JPgz2VhDb1vyuFAKQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FoDXeLRXEqA2o02I2JPgz2VhDb1vyuFAKQ&usqp=CAU',
  ];
  const ref = React.useRef();
  const [currentImage, setCurrentImage] = React.useState(0);

  const handlePrev = () => {
    ref.current.style.transform = `translate(-${100 * (currentImage - 1)}%)`;
    currentImage > 0 && setCurrentImage(currentImage - 1);
  };

  const handleNext = () => {
    ref.current.style.transform = `translate(-${100 * (currentImage + 1)}%)`;
    currentImage < images.length - 1 && setCurrentImage(currentImage + 1);
  };

  return (
    <StCarouselWrapper>
      <StCarousel>
        <StCarouselInner ref={ref}>
          {images.map((_, index, arr) => (
            <StImageWrapper key={index}>
              <StImage src={arr[index]} alt="random image" />
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
        {currentImage < images.length - 1 && (
          <StSlideButton type="button" onClick={handleNext}>
            <StRightButton />
          </StSlideButton>
        )}
      </StSlideButtonWrapper>
      <StPagenation>
        {images.map((_, index) => (
          <StPage key={index} currentImage={currentImage}>
            <Dot />
          </StPage>
        ))}
      </StPagenation>
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
  color: rgba(255, 255, 255, 0.8);
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
  /* border: 1px solid red; */
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const StPage = styled.li`
  width: 3rem;
  color: #828282;
  &:nth-child(${({ currentImage }) => currentImage + 1}) {
    color: #0095f6;
  }
  & + & {
    margin-left: -2rem;
  }
`;

export default Carousel;
