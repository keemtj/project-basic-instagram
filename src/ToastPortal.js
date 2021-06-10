import ReactDOM from 'react-dom';

const ToastPortal = ({ children }) => {
  const toastEl = document.getElementById('toast');
  return ReactDOM.createPortal(children, toastEl);
};

export default ToastPortal;
