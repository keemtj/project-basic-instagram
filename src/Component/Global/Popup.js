import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';

const Popup = ({ popupLists, onClickSignOut }) => {
  return (
    <>
      <StTriangle />
      <StPopup>
        <ul>
          {popupLists.map(({ link, icon, text, onClick }, index) => (
            <StPopupList key={index}>
              <StNavLink to={`${link}`} onClick={onClick}>
                <StIcons>{icon}</StIcons>
                {text}
              </StNavLink>
            </StPopupList>
          ))}
          <StPopupList>
            <StLogoutButton onClick={onClickSignOut}>
              <StIcons>
                <LogOut />
              </StIcons>
              <div>로그아웃</div>
            </StLogoutButton>
          </StPopupList>
        </ul>
      </StPopup>
    </>
  );
};

const itemStyle = css`
  display: flex;
  align-items: center;
  padding: 1.8rem 2rem;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  &:hover {
    background: ${({ theme }) => theme.gray5};
    cursor: pointer;
  }
`;

const StPopup = styled.div`
  position: absolute;
  right: calc((100% - 100rem) / 2);
  top: 5.4rem;
  z-index: 4;

  background: ${({ theme }) => theme.white};
  border: none;
  border-radius: 5px;
  width: 20rem;
  height: auto;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.gray8};
`;

const StTriangle = styled.div`
  position: absolute;
  z-index: 5;
  top: 4.65rem;
  right: calc((100% - 93.7rem) / 2);
  border: 7.5px solid black;
  border-color: ${({ theme }) => theme.white} ${({ theme }) => theme.white}
    transparent transparent;
  box-shadow: 2px -2px 5px -2px ${({ theme }) => theme.gray8};
  transform: rotate(-45deg);
`;

const StPopupList = styled.li`
  width: 100%;
  height: 100%;
  overflow: hidden;
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-top: 1px solid ${({ theme }) => theme.gray8};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const StNavLink = styled(NavLink)`
  ${itemStyle};
  text-decoration: none;
  color: black;
`;

const StLogoutButton = styled.button`
  ${itemStyle};
  line-height: 1;
`;

const StIcons = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 1rem;
  font-weight: 600;
`;

export default Popup;
