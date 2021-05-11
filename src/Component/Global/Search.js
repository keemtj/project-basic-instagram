import React from 'react';
import styled, { css } from 'styled-components';
import { Search as SearchIcon } from '@styled-icons/ionicons-outline/Search';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import SearchPopupContainer from '../../Container/Global/SearchPopupContainer';

const Search = ({ popupState, onSearch, onClosePopup }) => {
  return (
    <>
      {popupState ? (
        <StSearch>
          <StSearchInput type="text" placeholder="검색" />
          <StSearchIcon />
          <StClearBtn onClick={onClosePopup}>
            <StCloseCircleIcon />
          </StClearBtn>
          <SearchPopupContainer />
        </StSearch>
      ) : (
        <StSearch popupState={popupState} onClick={onSearch}>
          <StIconbox>
            <SearchIcon />
          </StIconbox>
          <span>검색</span>
        </StSearch>
      )}
    </>
  );
};

const StIconbox = styled.div`
  width: 1.5rem;
  margin-right: 0.5rem;
`;

const StSearch = styled.label`
  width: 50rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${({ popupState }) =>
    !popupState &&
    css`
      width: 50rem;
      height: 3rem;
      border: 1px solid ${({ theme }) => theme.gray};
      border-radius: 3px;
      background: ${({ theme }) => theme.background};
      padding: 0rem 2.5rem;
    `}
`;

const StSearchInput = styled.input`
  width: 22rem;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 3px;
  background: ${({ theme }) => theme.background};
  padding: 0rem 2.5rem;
  &::placeholder {
    color: ${({ theme }) => theme.darkGray};
    font-weight: 100;
  }
`;

const StSearchIcon = styled(SearchIcon)`
  position: absolute;
  width: 1.4rem;
  left: 0.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

const StClearBtn = styled.button`
  position: absolute;
  right: 0.5rem;
  width: 1.5rem;
  height: 3rem;
  cursor: pointer;
`;

const StCloseCircleIcon = styled(CloseCircle)`
  width: 1.5rem;
  height: 3rem;
  color: ${({ theme }) => theme.darkGray};
`;

export default Search;
