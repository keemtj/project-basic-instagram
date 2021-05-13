import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';
// --> get user data by Redux-thunk
// NOTE action

const SEARCH = 'search/SEARCH';
const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS';
const SEARCH_ERROR = 'search/SEARCH_ERROR';

const SEARCH_VALUE = 'search/SEARCH_VALUE';
const CLEAR_VALUE = 'search/CLEAR_VALUE';

// NOTE action creator
export const getUserSearchResultByDisplayName = fetchDataThunk(
  SEARCH,
  store.getUserSearchResultByDisplayName,
);
export const searchValue = value => ({ type: SEARCH_VALUE, value });
export const clearValue = () => ({ type: CLEAR_VALUE });

// NOTE initialState
const initialState = {
  value: '',
  ...reducerUtils.initial(),
};

// NOTE reducer
const popup = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default popup;
