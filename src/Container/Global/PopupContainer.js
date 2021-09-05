import React from 'react';
import Popup from '../../Component/Global/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@styled-icons/boxicons-regular/User';
import { Bookmark } from '@styled-icons/boxicons-regular/Bookmark';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { Settings } from '@styled-icons/ionicons-outline/Settings';
import { signOut } from '../../services/firebaseAuth';
import { useHistory } from 'react-router';
import { loginState } from '../../Modules/login';
import {
  postDataClear,
  getProfilePosts,
  getProfileBookmarkPosts,
  getProfileHeartPosts,
  updateLastDocByProfilePosts,
  updateLastDocByProfileHeartPosts,
  updateLastDocByProfileBookmarkPosts,
} from '../../Modules/posts';
import { closePopup } from '../../Modules/popup';
import { userDataClear } from '../../Modules/user';
import { searchDataClear } from '../../Modules/search';

const PopupContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { displayName, uid } = useSelector(state => state.user.currentUser);

  const onMoveProfilePage = () => {
    dispatch(getProfilePosts({ uid, dispatch, updateLastDocByProfilePosts }));
    dispatch(closePopup('profilePopup'));
  };

  const onMoveBookmarkPage = () => {
    dispatch(
      getProfileBookmarkPosts({
        uid,
        dispatch,
        updateLastDocByProfileBookmarkPosts,
      }),
    );
    dispatch(closePopup('profilePopup'));
  };

  const onMoveHeartPage = () => {
    dispatch(
      getProfileHeartPosts({
        uid,
        dispatch,
        updateLastDocByProfileHeartPosts,
      }),
    );
    dispatch(closePopup('profilePopup'));
  };

  const onClickSignOut = () => {
    /**
     * TODO: 1. 로그아웃시 localStorage의 'recent' key 기록 삭제
     * TODO: 2. 재 로그인시 검색기록을 가져오기 위해 파이어베이스에 저장하는 코드 추가
     */
    dispatch(postDataClear()); // post data clear
    dispatch(userDataClear()); // user data clear
    dispatch(searchDataClear()); // search data clear
    dispatch(closePopup('profilePopup'));
    dispatch(loginState(false));
    signOut();
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

  const popupLists = [
    {
      link: `/${displayName}`,
      text: '프로필',
      icon: <User />,
      onClick: onMoveProfilePage,
    },
    {
      link: `/${displayName}/saved`,
      text: '저장됨',
      icon: <Bookmark />,
      onClick: onMoveBookmarkPage,
    },
    {
      link: `/${displayName}/heart`,
      text: '좋아요',
      icon: <Heart />,
      onClick: onMoveHeartPage,
    },
    { link: '/edit', text: '설정', icon: <Settings /> },
  ];

  return <Popup popupLists={popupLists} onClickSignOut={onClickSignOut} />;
};

export default PopupContainer;
