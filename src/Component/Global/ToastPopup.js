import React from 'react';
import styled from 'styled-components';

const ToastPopup = ({ message }) => {
  return <StToastPopupWrapper>{message}</StToastPopupWrapper>;
};

const StToastPopupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 4.5rem;
  background: #262626;
  padding: 2rem;
  color: white;
  font-size: 1.4rem;
  position: fixed;
  bottom: 0rem;
`;

export default ToastPopup;
