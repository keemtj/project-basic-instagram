import ReactDOM from 'react-dom';

const PostSettingPortal = ({ children }) => {
  const postSettingEl = document.getElementById('post-setting');
  return ReactDOM.createPortal(children, postSettingEl);
};

export default PostSettingPortal;
