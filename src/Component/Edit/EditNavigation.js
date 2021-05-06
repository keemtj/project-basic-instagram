import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const EditNavigation = () => {
  const editnav = [
    { link: '', text: '프로필 편집' },
    { link: 'password', text: '비밀번호 변경' },
  ];

  return (
    <StEditNavigation>
      {editnav.map((nav, index) => (
        <StEditList key={index}>
          <StNavLink
            activClassName="active"
            to={`/edit/${nav.link}`}
            exact={nav.link === ''}
          >
            {nav.text}
          </StNavLink>
        </StEditList>
      ))}
    </StEditNavigation>
  );
};

const beforeStyle = css`
  height: 100%;
  content: '';
  position: absolute;
  left: 0;
`;

const StEditNavigation = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`;

const StEditList = styled.li`
  display: flex;
  align-items: center;
  height: 5rem;
  width: 100%;
  font-size: 1.6rem;
  cursor: pointer;
  position: relative;
  &:hover {
    background: ${({ theme }) => theme.gray2};
    &::before {
      ${beforeStyle};
      border-left: 2px solid ${({ theme }) => theme.gray5};
    }
    .active {
      background: ${({ theme }) => theme.white};
    }
  }
`;

const StNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0rem 3rem;
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  &.active {
    font-weight: 700;
    &::before {
      ${beforeStyle}
      border-left: 2px solid ${({ theme }) => theme.black};
    }
  }
`;

export default EditNavigation;
