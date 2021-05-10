import React from 'react';
import styled from 'styled-components';
import { Search as SearchIcon } from '@styled-icons/ionicons-outline/Search';
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import SearchPopupContainer from '../../Container/Global/SearchPopupContainer';

const Search = ({ openPopup, popup, setPopup, value, onSearch }) => {
  return (
    <StSearch onClick={openPopup}>
      <StSearchInput
        className="searchInput"
        type="text"
        value={value}
        placeholder="검색"
        onChange={onSearch}
      />
      <StSearchIcon />
      <StClearBtn>
        <StCloseCircleIcon />
      </StClearBtn>
      {popup && (
        <SearchPopupContainer value={value} popup={popup} setPopup={setPopup} />
      )}
    </StSearch>
  );
};

const StSearch = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
  left: 5.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

const StClearBtn = styled.button`
  position: absolute;
  right: 5rem;
`;

const StCloseCircleIcon = styled(CloseCircle)`
  width: 1.5rem;
  height: 3rem;
  color: ${({ theme }) => theme.darkGray};
`;

export default Search;
