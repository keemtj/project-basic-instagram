import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';
import { ArrowLeftCircleFill } from '@styled-icons/bootstrap/ArrowLeftCircleFill';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';
import { SquareMultiple } from '@styled-icons/fluentui-system-filled/SquareMultiple';

const Carousel = ({ imagesArray, pagenation, multiple, hover }) => {
  console.log(hover);
  /**
   * @param imagesArray [image, image, ..., image]
   * @param pagenation Dot pagenation
   * @param multiple images icon
   * @param hover image hover
   */

  const ref = useRef();
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    ref.current.style.transform = `translate(-${100 * (currentImage - 1)}%)`;
    currentImage > 0 && setCurrentImage(currentImage - 1);
  };

  const handleNext = () => {
    ref.current.style.transform = `translate(-${100 * (currentImage + 1)}%)`;
    currentImage < imagesArray.length - 1 && setCurrentImage(currentImage + 1);
  };

  return (
    <StCarouselWrapper>
      <StCarousel>
        <StCarouselInner ref={ref}>
          {multiple ? (
            <StImageWrapper>
              <StBadge>
                <SquareMultiple />
              </StBadge>
              <StImage src={imagesArray[0].url} alt={imagesArray[0].name} />
            </StImageWrapper>
          ) : (
            imagesArray.map(({ url, name }, index) => {
              return (
                <StImageWrapper key={index}>
                  <StImage src={url} alt={name} />
                </StImageWrapper>
              );
            })
          )}
        </StCarouselInner>
      </StCarousel>
      {/* {hover && <StHover hover={hover}>핱 190 댓 25</StHover>} */}
      {!multiple && (
        <StSlideButtonWrapper>
          {currentImage > 0 ? (
            <StSlideButton type="button" onClick={handlePrev}>
              <StLeftButton />
            </StSlideButton>
          ) : (
            <div />
          )}
          {currentImage < imagesArray.length - 1 && (
            <StSlideButton type="button" onClick={handleNext}>
              <StRightButton />
            </StSlideButton>
          )}
        </StSlideButtonWrapper>
      )}
      {pagenation && imagesArray.length >= 2 && (
        <StPagenation>
          {imagesArray.map((_, index) => (
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

const StBadge = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  color: ${({ theme }) => theme.white};
  width: 2.2rem;
  height: 2.2rem;
`;

const StImage = styled.img`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.white};
`;

// const StHover = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   ${({ hover }) =>
//     hover
//       ? css`
//           color: red;
//           position: absolute;
//           top: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//         `
//       : css`
//           display: none;
//         `}
// `;

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
