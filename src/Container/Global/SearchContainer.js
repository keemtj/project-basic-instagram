import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../Component/Global/Search';
import { openPopup, closePopup } from '../../Modules/popup';
import {
  getUserSearchResultByDisplayName,
  searchValue,
} from '../../Modules/search';

const SearchContainer = () => {
  const dispatch = useDispatch();
  const popupState = useSelector(state => state.popup.searchPopup);
  const value = useSelector(state => state.search.value);

  const onSearch = () => {
    dispatch(openPopup('searchPopup'));
  };
  const onClosePopup = () => {
    dispatch(closePopup('searchPopup'));
  };

  const onChangeSearchInput = e => {
    dispatch(searchValue(e.target.value));
    dispatch(getUserSearchResultByDisplayName(e.target.value));
  };

  return (
    <Search
      popupState={popupState}
      onSearch={onSearch}
      onClosePopup={onClosePopup}
      onChangeSearchInput={onChangeSearchInput}
      value={value}
    />
  );
};

export default SearchContainer;
