import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSignOut from '../../Hooks/useSignOut';
import { closePopup } from '../../Modules/popup';
import ProfileEditPortal from '../../Portals/ProfileEditPortal';

const ProfileEditModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { profileEditModal: profileEditModalState } = useSelector(
    state => state.popup,
  );
  const [logOut] = useSignOut();

  const onSignOut = () => {
    logOut('profileEditModal');
  };

  const onCloseModal = () => {
    dispatch(closePopup('profileEditModal'));
  };

  const onCilckOutside = e => {
    if (
      profileEditModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closePopup('profileEditModal'));
    }
  };

  useEffect(() => {
    window.addEventListener('click', onCilckOutside);
    return () => {
      window.removeEventListener('click', onCilckOutside);
    };
  }, []);

  const editLists = [
    { name: '프로필 편집', link: '/edit' },
    { name: '비밀번호 변경', link: '/edit/password' },
    { name: '공개 범위 및 보안(준비중)', link: '/edit/private' },
    { name: '로그인 활동(준비중)', link: '/edit/activity' },
  ];

  return (
    <ProfileEditPortal>
      <StModal>
        <StEditBox ref={modalRef}>
          {editLists.map((list, index) => (
            <StList key={index}>
              <StLink to={list.link} onClick={onCloseModal}>
                {list.name}
              </StLink>
            </StList>
          ))}
          <StList className={'signout'} onClick={onSignOut}>
            로그아웃
          </StList>
        </StEditBox>
      </StModal>
    </ProfileEditPortal>
  );
};

const StModal = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > div + div {
    margin-top: 0.8rem;
  }
  overflow: hidden;
`;

const StEditBox = styled.ul`
  position: relative;
  background: ${({ theme }) => theme.white};
  border-radius: 10px;
  width: 40rem;
  height: auto;
  overflow: hidden;
`;

const StList = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  color: black;
  font-size: 1.4rem;
  font-weight: 600;
  &:hover {
    background: ${({ theme }) => theme.gray2};
  }
  &:active {
    color: ${({ theme }) => theme.darkGray};
  }
  &.signout {
    color: ${({ theme }) => theme.heart};
  }
  cursor: pointer;
`;

const StLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: black;
  &:hover {
    background: ${({ theme }) => theme.gray2};
  }
  &:active {
    color: ${({ theme }) => theme.darkGray};
  }
`;

export default ProfileEditModal;
