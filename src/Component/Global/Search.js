import React from 'react';
import styled, { css } from 'styled-components';
import { Search as SearchIcon } from '@styled-icons/ionicons-outline/Search';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import SearchPopupContainer from '../../Container/Global/SearchPopupContainer';

const Search = ({ popupState, onSearch, onClosePopup }) => {
  return (
    <StSearchWrapper>
      <StSearchInput
        type="text"
        placeholder="검색"
        onClick={onSearch}
        popupState={popupState}
      />
      <StSearchIcon onClick={!popupState && onSearch} popupState={popupState} />
      {popupState && (
        <>
          <StClearBtn onClick={onClosePopup}>
            <StCloseCircleIcon />
          </StClearBtn>
        </>
      )}
      {popupState && <SearchPopupContainer />}
    </StSearchWrapper>
  );
};

const StSearchWrapper = styled.div`
  position: relative;
`;

const StSearchInput = styled.input`
  width: 22rem;
  height: 3rem;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 3px;
  padding: 0rem 2.5rem;
  color: ${({ popupState }) => !popupState && 'transparent'};
  outline: none;
  position: relative;
  &::placeholder {
    color: ${({ theme }) => theme.darkGray};
    font-weight: 100;
    text-align: ${({ popupState }) => !popupState && 'center'};
  }
`;

const StSearchIcon = styled(SearchIcon)`
  position: absolute;
  ${({ popupState }) =>
    !popupState
      ? css`
          left: calc(50% - 3rem);
          cursor: pointer;
        `
      : css`
          left: 0.5rem;
        `}
  width: 1.5rem;
  height: 3rem;
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
