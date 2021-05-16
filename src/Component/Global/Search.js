import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Search as SearchIcon } from '@styled-icons/ionicons-outline/Search';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import SearchPopupContainer from '../../Container/Global/SearchPopupContainer';
import { Spinner3 } from '@styled-icons/icomoon/Spinner3';

const Search = ({
  searchRef,
  popupState,
  onSearch,
  onChangeSearchInput,
  onClearValue,
  value,
  loading,
}) => {
  return (
    <StSearchWrapper onClick={onSearch} ref={searchRef}>
      <StSearchInput
        type="text"
        name="searchPopup"
        placeholder="검색"
        value={value}
        onChange={onChangeSearchInput}
        popupState={popupState}
        autoComplete="off"
      />
      <StSearchIcon popupState={popupState} />
      {popupState && (
        <StClearBtn onClick={loading ? undefined : onClearValue}>
          {loading ? <StSpinner isLoading={loading} /> : <StCloseCircleIcon />}
        </StClearBtn>
      )}
      {popupState && <SearchPopupContainer />}
    </StSearchWrapper>
  );
};

/**
 * FIXME: Need to change style label, input
 * @props popupState  -> popupState ? true : false
 * @props value -> value ? true : false
 */

const StSearchWrapper = styled.label`
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
  cursor: ${({ isLoading }) => (isLoading ? 'default' : 'pointer')};
`;

const StCloseCircleIcon = styled(CloseCircle)`
  width: 1.5rem;
  height: 3rem;
  color: ${({ theme }) => theme.darkGray};
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StSpinner = styled(Spinner3)`
  animation: ${({ isLoading }) =>
    isLoading &&
    css`
      ${rotate} 2s linear infinite;
    `};
`;

export default Search;
