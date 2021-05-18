// NOTE search user's datas
import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';
import * as searchUtils from '../lib/searchUtils';

// action
const SEARCH_VALUE = 'search/SEARCH_VALUE';
const CLEAR_VALUE = 'search/CLEAR_VALUE';

const SEARCH_RESULT = 'search/SEARCH_RESULT';
const SEARCH_RESULT_SUCCESS = 'search/SEARCH_RESULT_SUCCESS';
const SEARCH_RESULT_ERROR = 'search/SEARCH_RESULT_ERROR';

const RECENT_ADD = 'search/RECENT_ADD';
const RECENT_ADD_LOCALSTORAGE = 'search/RECENT_ADD_LOCALSTORAGE';
const RECENT_REMOVE = 'search/RECENT_REMOVE';
const RECENT_ALL_CLEAR = 'search/RECENT_ALL_CLEAR';

const SEARCH_USER = 'search/SEARCH_USER';
const SEARCH_USER_SUCCESS = 'search/SEARCH_USER_SUCCESS';
const SEARCH_USER_ERROR = 'search/SEARCH_USER_ERROR';

const SEARCH_USER_FOLLOW = 'search/SEARCH_USER_FOLLOW';
const SEARCH_USER_FOLLOW_SUCCESS = 'search/SEARCH_USER_FOLLOW_SUCCESS';
const SEARCH_USER_FOLLOW_ERROR = 'search/SEARCH_USER_FOLLOW_ERROR';

const FOLLOW = 'search/ADD_FOLLOW';
const UNFOLLOW = 'search/REMOVE_FOLLOW';

// action creator
export const searchValue = value => ({ type: SEARCH_VALUE, value });
export const clearValue = () => ({ type: CLEAR_VALUE });
export const addRecent = user => ({ type: RECENT_ADD, user });
export const addLocalStorageToRecent = recent => ({
  type: RECENT_ADD_LOCALSTORAGE,
  recent,
});
export const removeRecent = user => ({ type: RECENT_REMOVE, user });
export const allclearRecent = () => ({ type: RECENT_ALL_CLEAR });
export const getUserSearchResultByDisplayName = fetchDataThunk(
  SEARCH_RESULT,
  store.getUserSearchResultByDisplayName,
  2000,
);
export const getSearchUserData = fetchDataThunk(
  SEARCH_USER,
  store.getSearchUserData,
);
export const getSearchUserFollowData = fetchDataThunk(
  SEARCH_USER_FOLLOW,
  store.getSearchUserFollowData,
);
export const followUser = uid => ({ type: FOLLOW, uid });
export const unFollowUser = uid => ({ type: UNFOLLOW, uid });

// initialState
const initialState = {
  value: '',
  searchResult: reducerUtils.initial(),
  recent: [],
  searchUser: reducerUtils.initial(),
  searchUserFollow: reducerUtils.initial(),
};

// reducer
const popup = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_VALUE:
      return {
        ...state,
        value: action.value,
      };
    case CLEAR_VALUE:
      return {
        ...state,
        value: '',
      };
    case SEARCH_RESULT:
      return {
        ...state,
        searchResult: reducerUtils.loading(),
      };
    case SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        searchResult: reducerUtils.success(action.payload),
      };
    case SEARCH_RESULT_ERROR:
      return {
        ...state,
        searchResult: reducerUtils.error(action.payload),
      };
    case RECENT_ADD:
      return {
        ...state,
        recent: state.recent.length
          ? searchUtils.addRecent(state.recent, action.user)
          : [action.user],
      };
    case RECENT_ADD_LOCALSTORAGE:
      return {
        ...state,
        recent: action.recent,
      };
    case RECENT_REMOVE:
      return {
        ...state,
        recent: searchUtils.removeRecent(state.recent, action.user),
      };
    case RECENT_ALL_CLEAR:
      return {
        ...state,
        recent: searchUtils.allClearRecent(),
      };
    case SEARCH_USER:
      return {
        ...state,
        searchUser: reducerUtils.loading(),
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: reducerUtils.success(action.payload),
      };
    case SEARCH_USER_ERROR:
      return {
        ...state,
        searchUser: reducerUtils.error(action.payloads),
      };
    case SEARCH_USER_FOLLOW:
      return {
        ...state,
        searchUserFollow: reducerUtils.loading(),
      };
    case SEARCH_USER_FOLLOW_SUCCESS:
      return {
        ...state,
        searchUserFollow: reducerUtils.success(action.payload),
      };
    case SEARCH_USER_FOLLOW_ERROR:
      return {
        ...state,
        searchUserFollow: reducerUtils.error(action.payload),
      };
    case FOLLOW:
      return {
        ...state,
        searchUserFollow: {
          ...state.searchUserFollow,
          data: {
            ...state.searchUserFollow.data,
            followers: [...state.searchUserFollow.data.followers, action.uid],
          },
        },
      };
    case UNFOLLOW:
      return {
        ...state,
        searchUserFollow: {
          ...state.searchUserFollow,
          data: {
            ...state.searchUserFollow.data,
            followers: state.searchUserFollow.data.followers.filter(
              uid => uid !== action.uid,
            ),
          },
        },
      };
    default:
      return state;
  }
};

export default popup;
