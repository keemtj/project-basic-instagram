import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchPopup from '../../Component/Global/SearchPopup';
import { closePopup } from '../../Modules/popup';
import {
  addRecent,
  allclearRecent,
  removeRecent,
  clearValue,
} from '../../Modules/search';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';
import {
  getProfilePosts,
  updateLastDocByProfilePosts,
} from '../../Modules/posts';

const SearchPopupContainer = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.search.value);
  const { data: searchResult, loading } = useSelector(
    state => state.search.searchResult,
  );
  const recent = useSelector(state => state.search.recent);

  const onMoveProfilePage = user => {
    console.log('user searching');
    dispatch(getProfileUserData(user.uid));
    dispatch(getProfileUserFollowData(user.uid));
    dispatch(
      getProfilePosts({
        uid: user.uid,
        dispatch,
        updateLastDocByProfilePosts,
      }),
    );
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
      onMoveProfilePage={onMoveProfilePage}
      onRemoveRecentUser={onRemoveRecentUser}
      onRemoveAllRecentUser={onRemoveAllRecentUser}
    />
  );
};

export default SearchPopupContainer;
