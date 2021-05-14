import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';
import * as searchUtils from '../lib/searchUtils';

// NOTE action
const SEARCH_VALUE = 'search/SEARCH_VALUE';
const CLEAR_VALUE = 'search/CLEAR_VALUE';

const SEARCH = 'search/SEARCH';
const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS';
const SEARCH_ERROR = 'search/SEARCH_ERROR';

const RECENT_ADD = 'search/RECENT_ADD';
const RECENT_ADD_LOCALSTORAGE = 'search/RECENT_ADD_LOCALSTORAGE';
const RECENT_REMOVE = 'search/RECENT_REMOVE';
const RECENT_ALL_CLEAR = 'search/RECENT_ALL_CLEAR';

// NOTE action creator
export const searchValue = value => ({ type: SEARCH_VALUE, value });
export const clearValue = () => ({ type: CLEAR_VALUE });
export const getUserSearchResultByDisplayName = fetchDataThunk(
  SEARCH,
  store.getUserSearchResultByDisplayName,
  2000,
);
export const addRecent = user => ({ type: RECENT_ADD, user });
export const addLocalStorageToRecent = recent => ({
  type: RECENT_ADD_LOCALSTORAGE,
  recent,
});
export const removeRecent = user => ({ type: RECENT_REMOVE, user });
export const allclearRecent = () => ({ type: RECENT_ALL_CLEAR });

// NOTE initialState
const initialState = {
  value: '',
  ...reducerUtils.initial(),
  recent: [],
};

// NOTE reducer
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
    case SEARCH:
      return {
        ...state,
        ...reducerUtils.loading(),
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        ...reducerUtils.success(action.payload),
      };
    case SEARCH_ERROR:
      return {
        ...state,
        ...reducerUtils.error(action.payload),
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
    default:
      return state;
  }
};

export default popup;
