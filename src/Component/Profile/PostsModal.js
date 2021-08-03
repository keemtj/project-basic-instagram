import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import PostPortal from '../../Portals/PostPortal';
import PostContainer from '../../Container/Profile/PostContainer';
import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft';
import { ChevronRight } from '@styled-icons/entypo/ChevronRight';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../Modules/popup';
import {
  activeIndexOfPost,
  activeIdOfPost,
  currentImageIndex,
} from '../../Modules/posts';

const PostsModal = () => {
  const modalRef = useRef();
  const his = useHistory();
  const dispatch = useDispatch();
  const { postsModal: postsModalState } = useSelector(state => state.popup);
  const { data: posts } = useSelector(state => state.posts.profilePosts);
  const { activePostIndex, activePostId } = useSelector(state => state.posts);
  const path = his.location.pathname;
  const lastIndex = posts?.length - 1;
  const [modalLoading, setModalLoading] = useState(false);
  const [newComments, setNewComments] = useState([]);

  const handlePrev = e => {
    e.stopPropagation();
    dispatch(activeIndexOfPost(activePostIndex - 1));
    dispatch(activeIdOfPost(posts[activePostIndex - 1].id));
    dispatch(currentImageIndex(0));
    setModalLoading(true);
    setTimeout(() => setModalLoading(false), 1000);
    console.log('prev');
  };

  const handleNext = e => {
    e.stopPropagation();
    dispatch(activeIndexOfPost(activePostIndex + 1));
    dispatch(activeIdOfPost(posts[activePostIndex + 1].id));
    dispatch(currentImageIndex(0));
    setModalLoading(true);
    setTimeout(() => setModalLoading(false), 1000);
    console.log('next');
  };

  const onCloseButton = () => {
    dispatch(closePopup('postsModal'));
    his.push(`${path}`);
  };

  const onClickOutside = e => {
    if (
      postsModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      console.log('outside');
      onCloseButton();
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  useEffect(() => {
    history.pushState('', '', `/p/${activePostId}`);
  }, [activePostId]);

  return (
    <PostPortal>
      <StPostModalWrapper>
        <StPostCarousel>
          <StPostBox ref={modalRef}>
            <PostContainer
              post={posts?.[activePostIndex]}
              modalLoading={modalLoading}
              newComments={newComments}
              setNewComments={setNewComments}
            />
          </StPostBox>
          <StSlideButton
            type="button"
            role="prev"
            onClick={handlePrev}
            hidden={activePostIndex === 0 ? true : false}
          >
            <StPrevButtonIcon />
          </StSlideButton>
          <StSlideButton
            type="button"
            role="next"
            onClick={handleNext}
            hidden={activePostIndex === lastIndex ? true : false}
          >
            <StNextButtonIcon />
          </StSlideButton>
          <StCloseButton type="button" onClick={onCloseButton}>
            <CloseOutline />
          </StCloseButton>
        </StPostCarousel>
      </StPostModalWrapper>
    </PostPortal>
  );
};

const StPostModalWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
`;

const StPostCarousel = styled.div`
  background: ${({ theme }) => theme.white};
  width: 95rem;
  min-width: 95rem;
  height: 59.9rem;
`;

const StPostBox = styled.main`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  background: ${({ theme }) => theme.white};
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
  width: 4rem;
  height: 4rem;

  position: absolute;
  top: calc(50% - 2rem);
  right: ${({ role }) => role === 'next' && 'calc((100vw - 95rem) / 2 - 4rem)'};
  left: ${({ role }) => role === 'prev' && 'calc((100vw - 95rem) / 2 - 4rem)'};
  z-index: 4;
`;

const StNextButtonIcon = styled(ChevronRight)`
  ${buttonStyle}
`;

const StPrevButtonIcon = styled(ChevronLeft)`
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

export default PostsModal;
