import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  const newPostEl = document.getElementById('post');
  return ReactDOM.createPortal(children, newPostEl);
};

export default ModalPortal;
