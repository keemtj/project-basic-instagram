import React, { useState } from 'react';
import Search from '../../Component/Global/Search';

const SearchContainer = () => {
  const [value, setValue] = useState('');
  const [popup, setPopup] = useState(false);

  const openPopup = () => {
    setPopup(true);
  };

  const onSearch = e => {
    setValue(e.target.value);
  };

  return (
    <Search
      openPopup={openPopup}
      popup={popup}
      setPopup={setPopup}
      value={value}
      onSearch={onSearch}
    />
  );
};

export default SearchContainer;
