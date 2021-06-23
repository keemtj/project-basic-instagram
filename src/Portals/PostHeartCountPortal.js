import ReactDOM from 'react-dom';

const PostHeartCountPortal = ({ children }) => {
  const postHeartCountEl = document.getElementById('post-heart-count');
  return ReactDOM.createPortal(children, postHeartCountEl);
};

export default PostHeartCountPortal;
