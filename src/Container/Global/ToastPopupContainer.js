import React from 'react';
import ToastPopup from '../../Component/Global/ToastPopup';

const ToastPopupContainer = () => {
  const message = '토스트 메시지~~~~';
  return <ToastPopup message={message} />;
};

export default ToastPopupContainer;
