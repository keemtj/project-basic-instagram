import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const ProfileNavigation = ({ watchName, subnav }) => {
  return (
    <StProfileNavigation>
      <StNav>
        {subnav.map(({ name, icon, text, isShow, onClick }) => {
          if (!isShow) return null;
          return (
            <StNavItem key={name}>
              <NavLink
                activeClassName="active"
                to={name === '' ? `/${watchName}` : `/${watchName}/${name}`}
                exact={name === ''}
                onClick={onClick}
              >
                <StIcon>{icon}</StIcon>
                {text}
              </NavLink>
            </StNavItem>
          );
        })}
      </StNav>
    </StProfileNavigation>
  );
};

const StProfileNavigation = styled.nav`
  border-top: 1px solid ${({ theme }) => theme.gray};
  height: 5rem;
`;

const StNav = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StNavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  cursor: pointer;
  position: relative;
  & + & {
    margin-left: 6rem;
  }
  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${({ theme }) => theme.category};
  }
  & > .active {
    & {
      color: ${({ theme }) => theme.black};
    }
    &::after {
      width: 100%;
      content: '';
      position: absolute;
      top: -1px;
      background: ${({ theme }) => theme.white};
      transition: all 0.2s ease-in-out;
      border-top: 1px solid ${({ theme }) => theme.black};
    }
  }
`;

const StIcon = styled.span`
  margin-right: 0.3rem;
  width: 1.3rem;
  height: 1.3rem;
`;

export default ProfileNavigation;
