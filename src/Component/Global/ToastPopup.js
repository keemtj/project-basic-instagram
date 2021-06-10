import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import ToastPortal from '../../ToastPortal';

const ToastPopup = () => {
  const message = useSelector(state => state.popup.toastMessage);
  const { toast: toastState } = useSelector(state => state.popup);

  return (
    <ToastPortal>
      <StToastPopupWrapper toastState={toastState}>
        {message}
      </StToastPopupWrapper>
    </ToastPortal>
  );
};

const StToastPopupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  width: 100%;
  height: 5rem;
  background: #262626;
  color: white;
  font-size: 1.4rem;

  position: fixed;
  bottom: 0rem;

  opacity: 0;
  overflow: hidden;
  visibility: hidden;
  transform: translate3d(0, 5rem, 0);
  transition: all 0.5s ease;

  ${({ toastState }) =>
    toastState &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, 0, 0);
    `}
`;

export default ToastPopup;
