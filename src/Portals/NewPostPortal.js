import ReactDOM from 'react-dom';

const NewPostPortal = ({ children }) => {
  const newPostEl = document.getElementById('new-post');
  return ReactDOM.createPortal(children, newPostEl);
};

export default NewPostPortal;
