import ReactDOM from 'react-dom';

const PostModalPortal = ({ children }) => {
  const newPostEl = document.getElementById('post');
  return ReactDOM.createPortal(children, newPostEl);
};

export default PostModalPortal;
