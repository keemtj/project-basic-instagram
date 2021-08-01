import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Dot } from '@styled-icons/bootstrap/Dot';
import { ArrowLeftCircleFill } from '@styled-icons/bootstrap/ArrowLeftCircleFill';
import { ArrowRightCircleFill } from '@styled-icons/bootstrap/ArrowRightCircleFill';
import { SquareMultiple } from '@styled-icons/fluentui-system-filled/SquareMultiple';
import { Heart } from '@styled-icons/boxicons-solid/Heart';
import { Chatbubble } from '@styled-icons/ionicons-sharp/Chatbubble';
import { useDispatch, useSelector } from 'react-redux';
import { currentImageIndex } from '../../Modules/posts';

const ProfileCarousel = ({ ...rest }) => {
  /**
   * @param imagesArray [image, image, ..., image]
   * @param pagination Dot pagination
   * @param badge images icon
   * @param profile using posts in profile page
   * @param hover image hover in profile page
   * @param heartCount when hovering post image
   * @param comments(comment.length) when hovering post image
   * @param onClick onClickPostModal
   * @param pos pagination's dot position
   * @param currentImage at profile Post modal
   * FIXME: profile -> isProfile
   */
  const {
    imagesArray,
    pagination,
    badge,
    profile,
    hover,
    onShow,
    onHide,
    heartCount,
    comments,
    onClick,
    pos,
  } = rest;
  const ref = useRef();
  const dispatch = useDispatch();
  const { currentImage, activePostId } = useSelector(state => state.posts);

  const handlePrev = e => {
    console.log('ProfileCarousel');
    e.stopPropagation();
    ref.current.style.transform = `translate(-${100 * (currentImage - 1)}%)`;
    currentImage > 0 && dispatch(currentImageIndex(currentImage - 1));
  };

  const handleNext = e => {
    console.log('ProfileCarousel');
    e.stopPropagation();
    ref.current.style.transform = `translate(-${100 * (currentImage + 1)}%)`;
    currentImage < imagesArray.length - 1 &&
      dispatch(currentImageIndex(currentImage + 1));
  };

  useEffect(() => {
    ref.current.style.transform = 'translate(0%)';
  }, [activePostId]);

  return (
    <StCarouselWrapper>
      <StCarousel onMouseEnter={onShow} onMouseLeave={onHide}>
        <StCarouselInner ref={ref}>
          {profile ? (
            <StImageWrapper isProfile={profile}>
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
            <StHover hover={hover} onClick={onClick}>
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
        {pagination && imagesArray?.length >= 2 && (
          <StPagenation pos={pos}>
            {imagesArray.map((_, index) => (
              <StPage key={index} currentImage={currentImage}>
                <Dot />
              </StPage>
            ))}
          </StPagenation>
        )}
      </StCarousel>
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
  height: ${({ isProfile }) => isProfile && '30rem'};
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
  width: fit-content;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${({ pos }) => pos && '0'};
  transform: translate(calc(30rem - 50%), 0);
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

export default ProfileCarousel;
