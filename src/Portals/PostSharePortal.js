import ReactDOM from 'react-dom';

const PostSharePortal = ({ children }) => {
  const shareEl = document.getElementById('post-share');
  return ReactDOM.createPortal(children, shareEl);
};

export default PostSharePortal;
