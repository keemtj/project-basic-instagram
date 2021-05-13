import React from 'react';
import { useSelector } from 'react-redux';
import SearchPopup from '../../Component/Global/SearchPopup';

const SearchPopupContainer = () => {
  const value = useSelector(state => state.search.value);
  const recentList = [
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
  ];

  const searchResultList = [
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    // { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
  ];

  return (
    <SearchPopup
      recentList={recentList}
      value={value}
      searchResultList={searchResultList}
    />
  );
};

export default SearchPopupContainer;
