import React from 'react';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';

const SearchResult = ({ searchResultList, loading }) => {
  return (
    <>
      <StRecentBox>
        {loading ? (
          <div>로딩중</div>
        ) : searchResultList.length ? (
          searchResultList.map(({ src, displayName, username }, index) => (
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
            </StRecentList>
          ))
        ) : (
          <div>검색 결과 없음</div>
        )}
      </StRecentBox>
    </>
  );
};

const StRecentBox = styled.ul`
  width: 100%;
  padding-top: 1rem;
  overflow: scroll;
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

export default SearchResult;
