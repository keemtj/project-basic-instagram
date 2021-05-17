import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchPopup from '../../Component/Global/SearchPopup';
import { closePopup } from '../../Modules/popup';
import {
  addRecent,
  allclearRecent,
  removeRecent,
  getSearchUserData,
  getSearchUserFollowData,
  clearValue,
} from '../../Modules/search';
import { getSearchUserPosts } from '../../Modules/posts';

const SearchPopupContainer = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.search.value);
  const { data: searchResult, loading } = useSelector(
    state => state.search.searchResult,
  );
  const recent = useSelector(state => state.search.recent);

  const onClickUser = user => {
    dispatch(getSearchUserData(user.uid));
    dispatch(getSearchUserFollowData(user.uid));
    dispatch(getSearchUserPosts(user.uid));
    dispatch(addRecent(user));
    dispatch(clearValue());
    dispatch(closePopup('searchPopup'));
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
      onClickUser={onClickUser}
      onRemoveRecentUser={onRemoveRecentUser}
      onRemoveAllRecentUser={onRemoveAllRecentUser}
    />
  );
};

export default SearchPopupContainer;
