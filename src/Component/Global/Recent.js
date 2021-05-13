import React from 'react';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import { Clear } from '@styled-icons/material-rounded/Clear';

const Recent = ({ recentList }) => {
  return (
    <>
      <StRecentPopupHeader>
        <h3>최근 검색 항목</h3>
        {recentList?.length ? (
          <StClearAllButton>모두 지우기</StClearAllButton>
        ) : (
          <div />
        )}
      </StRecentPopupHeader>
      <StRecentBox>
        {recentList?.length ? (
          recentList.map(({ src, displayName, username }, index) => (
            <StRecentList key={index}>
              <ProfileImage
                src={src || '/images/default_profile2.jpg'}
                width={5}
                height={5}
                marginLeft={1.2}
                fontSize={1.4}
                username={displayName}
              >
                <StNameWrapper>
                  <StDisplayName>{displayName}</StDisplayName>
                  {username && <StUsername>{username}</StUsername>}
                </StNameWrapper>
              </ProfileImage>
              <StClearButton>
                <Clear />
              </StClearButton>
            </StRecentList>
          ))
        ) : (
          <StNoRecent>최근 검색 내역 없음.</StNoRecent>
        )}
      </StRecentBox>
    </>
  );
};

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
  height: 100%;
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

const StNoRecent = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin-top: -2rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.4rem;
  font-weight: 600;
`;
export default Recent;
