import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import { Spinner3 } from '@styled-icons/icomoon/Spinner3';

const SearchResult = ({ searchResult, loading, onClickSearchUser }) => {
  return (
    <>
      <StRecentBox>
        {loading ? (
          <StLoading>
            <StSpinner />
          </StLoading>
        ) : searchResult?.length ? (
          searchResult.map((user, index) => {
            // slice(0, n)
            const { photoURL, displayName, username } = user;
            return (
              <StRecentList key={index}>
                <StLink
                  // to={`/p/${displayName}`}
                  to="/direct"
                  onClick={() => onClickSearchUser(user)}
                >
                  <ProfileImage
                    src={photoURL || '/images/default_profile2.jpg'}
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
                </StLink>
              </StRecentList>
            );
          })
        ) : (
          <StNoResult>검색 결과 없음</StNoResult>
        )}
      </StRecentBox>
    </>
  );
};

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StRecentBox = styled.ul`
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  overflow: scroll;
`;

const StRecentList = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.gray2};
  }
  &:last-child {
    margin-bottom: 0.5rem;
  }
`;

const StLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 0.5rem 2rem;
  color: ${({ theme }) => theme.black};
  text-decoration: none;
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

const StLoading = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.4rem;
  font-weight: 600;
`;

const StSpinner = styled(Spinner3)`
  width: 2rem;
  height: 2rem;
  animation: ${rotate} 2s linear infinite;
`;

const StNoResult = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.4rem;
  font-weight: 600;
`;

export default SearchResult;
