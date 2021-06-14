import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft';
import { ChevronRight } from '@styled-icons/entypo/ChevronRight';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { activeIndex, activePostIdData, closePopup } from '../../Modules/popup';
import PostPortal from '../../PostPortal';
import { useHistory } from 'react-router';

const PostModal = ({ posts, id, index }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const his = useHistory();
  const { postModal: postModalState, activeIndexValue } = useSelector(
    state => state.popup,
  );
  const lastIndex = posts.length - 1;

  const handlePrev = () => {
    dispatch(activePostIdData(posts[index - 1].id));
    dispatch(activeIndex(index - 1));
  };

  const handleNext = () => {
    dispatch(activePostIdData(posts[index + 1].id));
    dispatch(activeIndex(index + 1));
  };

  const onCloseButton = () => {
    dispatch(closePopup('postModal'));
  };

  useEffect(() => {
    const path = his.location.pathname;
    dispatch(activePostIdData(id));
    history.pushState('', '', `/p/${posts[activeIndexValue].id}`);
    return () => his.push(`${path}`);
  }, [activeIndexValue]);

  const onClickOutside = e => {
    if (
      postModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      console.log('Modal outside');
      dispatch(closePopup('postModal'));
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <PostPortal>
      <StPostModalWrapper>
        <StPostBoxBlock ref={modalRef}>
          {posts.map((post, index) => {
            console.log(post);
            return (
              <StPostBoxBlockInner key={index}>
                <StSlideButton
                  type="button"
                  role="prev"
                  onClick={handlePrev}
                  hidden={index === 0 ? true : false}
                >
                  <StPrevButton />
                </StSlideButton>
                <StSlideButton
                  type="button"
                  role="next"
                  onClick={handleNext}
                  hidden={index === lastIndex ? true : false}
                >
                  <StNextButton />
                </StSlideButton>
              </StPostBoxBlockInner>
            );
          })}
        </StPostBoxBlock>
        <StCloseButton type="button" onClick={onCloseButton}>
          <CloseOutline />
        </StCloseButton>
      </StPostModalWrapper>
    </PostPortal>
  );
};

const StPostModalWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StPostBoxBlock = styled.main`
  display: flex;
  flex-flow: row nowrap;
  width: 95rem;
  min-width: 95rem;
  height: 59.9rem;
  background: ${({ theme }) => theme.white};
  overflow: hidden;
`;

const StPostBoxBlockInner = styled.div`
  display: flex;
`;

const buttonStyle = css`
  width: 4rem;
  height: 4rem;
  color: ${({ theme }) => theme.gray8};
  cursor: pointer;
  text-shadow: 5px 5px ${({ theme }) => theme.black};
  &:active {
    color: ${({ theme }) => theme.gray5};
  }
`;

const StSlideButton = styled.div`
  position: absolute;
  top: calc(50% - 2rem);
  right: ${({ role }) => role === 'next' && 'calc((100vw - 95rem) / 2 - 4rem)'};
  left: ${({ role }) => role === 'prev' && 'calc((100vw - 95rem) / 2 - 4rem)'};

  width: 4rem;
  height: 4rem;
`;

const StNextButton = styled(ChevronRight)`
  ${buttonStyle}
`;

const StPrevButton = styled(ChevronLeft)`
  ${buttonStyle}
`;

const StCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.white};
  font-size: 2rem;
  cursor: pointer;
`;

export default PostModal;
