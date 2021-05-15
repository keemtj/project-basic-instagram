import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';
import { ArrowLeftCircleFill } from '@styled-icons/bootstrap/ArrowLeftCircleFill';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';
import { SquareMultiple } from '@styled-icons/fluentui-system-filled/SquareMultiple';
import { Heart } from '@styled-icons/boxicons-solid/Heart';
import { Chatbubble } from '@styled-icons/ionicons-sharp/Chatbubble';
const Carousel = ({ imagesArray, pagenation, ...rest }) => {
  /**
   * @param imagesArray [image, image, ..., image]
   * @param pagenation Dot pagenation
   * @param badge images icon
   * @param profile using posts in profile page
   * @param hover image hover in profile page
   * @param heartCount when hovering post image
   * @param comments(comment.length) when hovering post image
   */
  const { badge, profile, hover, onShow, onHide, heartCount, comments } = rest;
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
      <StCarousel onMouseEnter={onShow} onMouseLeave={onHide}>
        <StCarouselInner ref={ref}>
          {profile ? (
            <StImageWrapper profile={profile}>
              {badge && (
                <StBadge>
                  <SquareMultiple />
                </StBadge>
              )}
              <StBackgroundImg url={imagesArray[0].url} />
            </StImageWrapper>
          ) : (
            imagesArray?.map(({ url, name }, index) => {
              return (
                <StImageWrapper key={index}>
                  <StImage src={url} alt={name} />
                </StImageWrapper>
              );
            })
          )}
          {hover && (
            <StHover hover={hover}>
              <StIconWrap>
                <StHeartIcons />
                {heartCount.toLocaleString() || 0}
              </StIconWrap>
              <StIconWrap>
                <StChatIcons />
                {comments.toLocaleString() || 0}
              </StIconWrap>
            </StHover>
          )}
        </StCarouselInner>
      </StCarousel>
      {!profile && (
        <StSlideButtonWrapper>
          {currentImage > 0 ? (
            <StSlideButton type="button" onClick={handlePrev}>
              <StLeftButton />
            </StSlideButton>
          ) : (
            <div />
          )}
          {currentImage < imagesArray?.length - 1 && (
            <StSlideButton type="button" onClick={handleNext}>
              <StRightButton />
            </StSlideButton>
          )}
        </StSlideButtonWrapper>
      )}
      {pagenation && imagesArray?.length >= 2 && (
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
  height: ${({ profile }) => profile && '30rem'};
`;

const StBadge = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${({ theme }) => theme.white};
  width: 2.2rem;
  height: 2.2rem;
`;

const StBackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

const StImage = styled.img`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.white};
`;

const StHover = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  ${({ hover }) =>
    hover
      ? css`
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          color: white;
          font-size: 1.8rem;
          background: rgba(0, 0, 0, 0.5);
        `
      : css`
          display: none;
        `}
`;

const StIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  :first-child {
    margin-right: 2.5rem;
  }
`;

const StHeartIcons = styled(Heart)`
  width: 2.2rem;
  margin-right: 0.5rem;
`;

const StChatIcons = styled(Chatbubble)`
  width: 2rem;
  margin-right: 0.5rem;
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
