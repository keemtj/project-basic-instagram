import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchPopup from '../../Component/Global/SearchPopup';
import { addRecent, allclearRecent, removeRecent } from '../../Modules/search';

const SearchPopupContainer = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.search.value);
  const { data: searchResult, loading } = useSelector(state => state.search);
  const recent = useSelector(state => state.search.recent);

  const onClickSearchUser = user => {
    // TODO: 1. 클릭한 유저의 프로필 페이지로 이동
    console.log('1. 클릭한 유저의 프로필 페이지로 이동');
    // dispatch();
    console.log('2. 최근 검색 항목에 추가');
    dispatch(addRecent(user));
  };

  const onClickRecentUser = () => {
    // TODO
    console.log('검색된 항목에서 유저 클릭 -> 검색 항목의 맨 위로 위치 변경');
  };

  const onRemoveRecentUser = user => {
    dispatch(removeRecent(user));
  };

  const onRemoveAllRecentUser = () => {
    dispatch(allclearRecent());
  };

  return (
    <SearchPopup
      recent={recent}
      value={value}
      searchResult={searchResult}
      loading={loading}
      onClickSearchUser={onClickSearchUser}
      onClickRecentUser={onClickRecentUser}
      onRemoveRecentUser={onRemoveRecentUser}
      onRemoveAllRecentUser={onRemoveAllRecentUser}
    />
  );
};

export default SearchPopupContainer;
