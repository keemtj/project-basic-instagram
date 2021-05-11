import React from 'react';
import SearchPopup from '../../Component/Global/SearchPopup';

const SearchPopupContainer = () => {
  const recentList = [
    { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
    { displayName: 'cole_sprouse', username: 'Cole Sprouse' },
  ];

  return <SearchPopup recentList={recentList} />;
};

export default SearchPopupContainer;
