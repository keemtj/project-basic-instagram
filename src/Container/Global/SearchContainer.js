import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../Component/Global/Search';
import { openPopup, closePopup } from '../../Modules/popup';

const SearchContainer = () => {
  const popupState = useSelector(state => state.popup.searchPopup);
  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(openPopup('searchPopup'));
  };
  const onClosePopup = () => {
    dispatch(closePopup('searchPopup'));
  };
  return (
    <Search
      popupState={popupState}
      onSearch={onSearch}
      onClosePopup={onClosePopup}
    />
  );
};

export default SearchContainer;
