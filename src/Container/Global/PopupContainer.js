import React from 'react';
import Popup from '../../Component/Global/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@styled-icons/boxicons-regular/User';
import { Bookmark } from '@styled-icons/boxicons-regular/Bookmark';
import { Settings } from '@styled-icons/ionicons-outline/Settings';
import { signOut } from '../../services/firebaseAuth';
import { useHistory } from 'react-router';
import { loginState } from '../../Modules/login';

const PopupContainer = ({ setPopup }) => {
  // ! redux
  const { displayName } = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const popupLists = [
    { link: `/p/${displayName}`, text: '프로필', icon: <User /> },
    { link: `/p/${displayName}/saved`, text: '저장됨', icon: <Bookmark /> },
    { link: '/edit', text: '설정', icon: <Settings /> },
  ];

  const onClickSignOut = () => {
    setPopup(false);
    signOut();
    dispatch(loginState(false));
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
