import React, { useRef, useEffect } from 'react';
import SearchPopup from '../../Component/Global/SearchPopup';

const SearchPopupContainer = ({ value, popup, setPopup }) => {
  const popupRef = useRef();

  const onClickOutside = e => {
    if (e.target.className.includes('searchInput')) return;
    if (popup && !popupRef.current.contains(e.target)) {
      console.log('outside');
      setPopup(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return <SearchPopup value={value} popupRef={popupRef} />;
};

export default SearchPopupContainer;
