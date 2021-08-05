import React from 'react';
import styled from 'styled-components';
import Recent from './Recent';
import SearchResult from './SearchResult';

const SearchPopup = ({
  recent,
  value,
  searchResult,
  loading,
  onMoveProfilePage,
  onRemoveRecentUser,
  onRemoveAllRecentUser,
}) => {
  return (
    <StSearchPopupWrapper>
      <StTriangle />
      <StSearchPopup>
        {value ? (
          <SearchResult
            searchResult={searchResult}
            loading={loading}
            onMoveProfilePage={onMoveProfilePage}
          />
        ) : (
          <Recent
            recent={recent}
            onMoveProfilePage={onMoveProfilePage}
            onRemoveRecentUser={onRemoveRecentUser}
            onRemoveAllRecentUser={onRemoveAllRecentUser}
          />
        )}
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
  left: -6.5rem;
  z-index: 4;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.white};
  border: none;
  border-radius: 5px;
  width: 35rem;
  height: 35rem;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.gray8};
  overflow-y: scroll;
`;

export default SearchPopup;
