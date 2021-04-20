import React from 'react';
import Popup from '../../Component/Global/Popup';
import { useSelector } from 'react-redux';
import { User } from '@styled-icons/boxicons-regular/User';
import { Bookmark } from '@styled-icons/boxicons-regular/Bookmark';
import { Settings } from '@styled-icons/ionicons-outline/Settings';
import { signOut } from '../../services/firebaseAuth';
import { useHistory } from 'react-router';

const PopupContainer = ({ setPopup }) => {
  // ! redux
  const { displayName } = useSelector(state => state.user);
  const history = useHistory();

  const popupLists = [
    { link: `/${displayName}`, text: '프로필', icon: <User /> },
    { link: `/${displayName}/saved`, text: '저장됨', icon: <Bookmark /> },
    { link: '/edit', text: '설정', icon: <Settings /> },
  ];

  const onClickSignOut = () => {
    setPopup(false);
    signOut();
    history.push('/login');
    console.log('sign out');
  };

  return (
    <Popup
      setPopup={setPopup}
      popupLists={popupLists}
      onClickSignOut={onClickSignOut}
    />
  );
};

export default PopupContainer;
