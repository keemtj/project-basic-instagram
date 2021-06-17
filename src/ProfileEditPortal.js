import ReactDOM from 'react-dom';

const ProfileEditPortal = ({ children }) => {
  const profileEditEl = document.getElementById('profile-edit');
  return ReactDOM.createPortal(children, profileEditEl);
};

export default ProfileEditPortal;
