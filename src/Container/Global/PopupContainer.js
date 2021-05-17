import React from 'react';
import Popup from '../../Component/Global/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@styled-icons/boxicons-regular/User';
import { Bookmark } from '@styled-icons/boxicons-regular/Bookmark';
import { Settings } from '@styled-icons/ionicons-outline/Settings';
import { signOut } from '../../services/firebaseAuth';
import { useHistory } from 'react-router';
import { loginState } from '../../Modules/login';
import { getPosts } from '../../Modules/posts';
import { closePopup } from '../../Modules/popup';

const PopupContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { displayName, uid } = useSelector(state => state.user.user);
  const popupLists = [
    { link: `/${displayName}`, text: '프로필', icon: <User /> },
    { link: `/${displayName}/saved`, text: '저장됨', icon: <Bookmark /> },
    { link: '/edit', text: '설정', icon: <Settings /> },
  ];

  const onClickList = () => {
    dispatch(getPosts(uid));
    dispatch(closePopup('profilePopup'));
  };

  const onClickSignOut = () => {
    /**
     * TODO: 1. 로그아웃시 localStorage의 'recent' key 기록 삭제
     * TODO: 2. 재 로그인시 검색기록을 가져오기 위해 파이어베이스에 저장하는 코드 추가
     */
    signOut();
    dispatch(closePopup('profilePopup'));
    dispatch(loginState(false));
    localStorage.removeItem('recent');
    history.push('/login');
    console.log('sign out');
  };

  const onClickOutside = () => {
    dispatch(closePopup('profilePopup'));
  };

  React.useEffect(() => {
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <Popup
      popupLists={popupLists}
      onClickList={onClickList}
      onClickSignOut={onClickSignOut}
    />
  );
};

export default PopupContainer;
