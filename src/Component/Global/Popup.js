import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Popup = () => {
  return (
    <StPopup className="profile-popup">
      <ul>
        <StPopupList>
          <StNavLink to="/profile">
            <div>프로필</div>
          </StNavLink>
        </StPopupList>
        <StPopupList>
          <StNavLink to="/profile/saved">
            <div>저장됨</div>
          </StNavLink>
        </StPopupList>
        <StPopupList>
          {/* <NavLink to="/edit"> */}
          <div> 설정</div>
          {/* </NavLink> */}
        </StPopupList>
        <StPopupList>
          <button onClick={() => console.log('로그아웃')}>
            <div>로그아웃</div>
          </button>
        </StPopupList>
      </ul>
    </StPopup>
  );
};

const StPopup = styled.div`
  position: absolute;
  top: 5.3rem;
  z-index: 3;

  background: ${({ theme }) => theme.white};
  border: none;
  border-radius: 4px;
  width: 10rem;
  height: auto;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.gray8};
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.white};
    top: -10px;
    right: 4px;
  }
`;

const StNavLink = styled(NavLink)`
  display: block;
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
`;

const StPopupList = styled.li`
  width: 100%;
  height: 100%;
  padding: 2rem;
  &:last-child {
    border-top: 1px solid ${({ theme }) => theme.gray8};
  }
  &:hover {
    background: ${({ theme }) => theme.gray5};
    cursor: pointer;
  }
`;

export default Popup;
