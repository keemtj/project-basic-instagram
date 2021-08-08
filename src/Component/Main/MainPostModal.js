import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { closePopup } from '../../Modules/popup';
import PostPortal from '../../Portals/PostPortal';
import { useHistory } from 'react-router';
import PostContainer from '../../Container/Main/PostContainer';
import { currentImageIndex } from '../../Modules/posts';

const MainPostModal = () => {
  const his = useHistory();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { postModal: postModalState } = useSelector(state => state.popup);
  const { activePostId, activePostIndex } = useSelector(state => state.posts);
  const { data: mainPosts } = useSelector(state => state.posts.mainPosts);
  const [newComments, setNewComments] = useState([]);
  const path = his.location.pathname;

  const onCloseButton = () => {
    dispatch(closePopup('postModal'));
    his.push(`${path}`);
  };

  const onClickOutside = e => {
    if (e.target.name === 'cancel') return;
    if (
      postModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      console.log('outside');
      onCloseButton();
      dispatch(currentImageIndex(0)); // reset index of images carousel
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutside, { capture: true });
    return () => {
      window.removeEventListener('click', onClickOutside, { capture: true });
    };
  }, []);

  useEffect(() => {
    history.pushState('', '', `/p/${activePostId}`);
  }, []);

  return (
    <PostPortal>
      <StPostModalWrapper>
        <StPostCarousel>
          <StPostCarouselInner ref={modalRef}>
            <PostContainer
              post={mainPosts?.[activePostIndex]}
              newComments={newComments}
              setNewComments={setNewComments}
            />
          </StPostCarouselInner>
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
  overflow: hidden;
`;

const StPostCarouselInner = styled.main`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  background: ${({ theme }) => theme.white};
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

export default MainPostModal;
