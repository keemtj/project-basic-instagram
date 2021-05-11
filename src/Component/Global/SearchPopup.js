import React from 'react';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import { Clear } from '@styled-icons/material-rounded/Clear';

const SearchPopup = ({ recentList }) => {
  return (
    <StSearchPopupWrapper style={{ position: ' relative' }}>
      <StTriangle />
      <StSearchPopup>
        <StRecentPopupHeader>
          <h3>최근 검색 항목</h3>
          {recentList?.length ? (
            <StClearAllButton>모두 지우기</StClearAllButton>
          ) : (
            <div />
          )}
        </StRecentPopupHeader>
        <StRecentBox>
          {recentList?.map((list, index) => (
            <StRecentList key={index}>
              <ProfileImage
                src={list.src || '/images/default_profile2.jpg'}
                width={5}
                height={5}
                marginLeft={1.2}
                fontSize={1.4}
                username={list.displayName}
              >
                <StNameWrapper>
                  <StDisplayName>{list.displayName}</StDisplayName>
                  {list.username && <StUsername>{list.username}</StUsername>}
                </StNameWrapper>
              </ProfileImage>
              <StClearButton>
                <Clear />
              </StClearButton>
            </StRecentList>
          ))}
        </StRecentBox>
      </StSearchPopup>
    </StSearchPopupWrapper>
  );
};

const StSearchPopupWrapper = styled.div`
  position: relative;
`;

const StTriangle = styled.div`
  position: absolute;
  z-index: 5;
  top: 0.5rem;
  right: calc(50% - 1rem);

  border: 7.5px solid black;
  border-color: ${({ theme }) => theme.white} ${({ theme }) => theme.white}
    transparent transparent;
  box-shadow: 2px -2px 5px -2px ${({ theme }) => theme.gray8};
  transform: rotate(-45deg);
`;

const StSearchPopup = styled.div`
  position: absolute;
  top: 1.2rem;
  left: -9rem;
  z-index: 4;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.white};
  border: none;
  border-radius: 5px;
  width: 40rem;
  height: 37rem;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.gray8};
  overflow-y: scroll;
`;

const StRecentPopupHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StClearAllButton = styled.button`
  color: ${({ theme }) => theme.activeBlue};
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
`;

const StRecentBox = styled.ul`
  width: 100%;
`;

const StRecentList = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5rem 2rem;
  &:hover {
    background: ${({ theme }) => theme.gray2};
  }
  &:last-child {
    margin-bottom: 0.5rem;
  }
`;

const StNameWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 1rem;
  font-size: 1.4rem;
`;

const StDisplayName = styled.div`
  font-weight: 500;
`;

const StUsername = styled.div`
  margin-top: 0.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
`;

const StClearButton = styled.button`
  width: 2.2rem;
  height: 2.2rem;
  color: ${({ theme }) => theme.darkGray};
  cursor: pointer;
`;

export default SearchPopup;
