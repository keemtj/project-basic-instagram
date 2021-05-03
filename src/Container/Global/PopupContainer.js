import React from 'react';
import Popup from '../../Component/Global/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@styled-icons/boxicons-regular/User';
import { Bookmark } from '@styled-icons/boxicons-regular/Bookmark';
import { Settings } from '@styled-icons/ionicons-outline/Settings';
import { signOut } from '../../services/firebaseAuth';
import { useHistory } from 'react-router';
import { loginState } from '../../Modules/login';
import { resetFollow } from '../../Modules/user';
import { getPosts } from '../../Modules/posts';

const PopupContainer = ({ setPopup }) => {
  // ! redux
  const { displayName, uid } = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const popupLists = [
    { link: `/p/${displayName}`, text: '프로필', icon: <User /> },
    { link: `/p/${displayName}/saved`, text: '저장됨', icon: <Bookmark /> },
    { link: '/edit', text: '설정', icon: <Settings /> },
  ];

  const onClickList = () => {
    setPopup(false);
    dispatch(getPosts(uid));
  };

  const onClickSignOut = () => {
    setPopup(false);
    signOut();
    dispatch(loginState(false));
    dispatch(resetFollow());
    history.push('/login');
    console.log('sign out');
  };

  return (
    <Popup
      popupLists={popupLists}
      onClickList={onClickList}
      onClickSignOut={onClickSignOut}
    />
  );
};

export default PopupContainer;
