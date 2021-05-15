import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../Component/Global/Search';
import { openPopup, closePopup } from '../../Modules/popup';
import {
  searchValue,
  clearValue,
  getUserSearchResultByDisplayName,
  addLocalStorageToRecent,
} from '../../Modules/search';

const SearchContainer = () => {
  const dispatch = useDispatch();
  const { searchPopup: popupState } = useSelector(state => state.popup);
  const value = useSelector(state => state.search.value);
  const { loading } = useSelector(state => state.search);
  const searchRef = useRef();

  const onSearch = () => {
    if (!popupState) dispatch(openPopup('searchPopup'));
  };

  const onClosePopup = e => {
    if (popupState && !searchRef.current.contains(e.target)) {
      e.stopPropagation();
      dispatch(closePopup('searchPopup'));
    }
  };

  const onChangeSearchInput = e => {
    dispatch(searchValue(e.target.value));
    dispatch(getUserSearchResultByDisplayName(e.target.value));
  };

  const onClearValue = () => {
    dispatch(clearValue());
  };

  useEffect(() => {
    const recentHistory = JSON.parse(localStorage.getItem('recent'));
    dispatch(addLocalStorageToRecent(recentHistory));
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', onClosePopup);
    return () => {
      document.removeEventListener('mousedown', onClosePopup);
    };
  }, [popupState]);
  return (
    <Search
      searchRef={searchRef}
      popupState={popupState}
      onSearch={onSearch}
      onClosePopup={onClosePopup}
      onChangeSearchInput={onChangeSearchInput}
      onClearValue={onClearValue}
      value={value}
      loading={loading}
    />
  );
};

export default SearchContainer;
