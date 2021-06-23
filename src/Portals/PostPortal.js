import ReactDOM from 'react-dom';

const PostPortal = ({ children }) => {
  const postEl = document.getElementById('post');
  return ReactDOM.createPortal(children, postEl);
};

export default PostPortal;
