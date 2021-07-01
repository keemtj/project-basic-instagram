import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';
import * as store from '../services/firestore';

// action
const SHARE_USERS = 'share/SHARE_USERS';
const SHARE_USERS_SUCCESS = 'share/SHARE_USERS_SUCCESS';
const SHARE_USERS_ERROR = 'share/SHARE_USERS_ERROR';

const ADD_SHARE_USERS_STACK = 'share/ADD_SHARE_USERS_STACK';
const REMOVE_SHARE_USERS_STACK = 'share/REMOVE_SHARE_USERS_STACK';
const CLEAR_SHARE_USERS_STACK = 'share/CLEAR_SHARE_USERS_STACK';

// action creator
export const getSearchUsers = fetchDataThunk(
  SHARE_USERS,
  store.getUserSearchResultByDisplayName,
);

export const addUsersStack = user => ({ type: ADD_SHARE_USERS_STACK, user });
export const removeUsersStack = user => ({
  type: REMOVE_SHARE_USERS_STACK,
  user,
});
export const clearUsersStack = () => ({ type: CLEAR_SHARE_USERS_STACK });

// initialState
const initialState = {
  searchUsers: reducerUtils.initial(),
  usersStack: [],
};

// reducer
const share = (state = initialState, action) => {
  switch (action.type) {
    case SHARE_USERS:
      return {
        ...state,
        searchUsers: reducerUtils.loading(),
      };
    case SHARE_USERS_SUCCESS:
      return {
        ...state,
        searchUsers: reducerUtils.success(action.payload),
      };
    case SHARE_USERS_ERROR:
      return {
        ...state,
        searchUsers: reducerUtils.error(action.payload),
      };
    case ADD_SHARE_USERS_STACK:
      return {
        ...state,
        usersStack: [...state.usersStack, action.user],
      };
    case REMOVE_SHARE_USERS_STACK:
      return {
        ...state,
        usersStack: state.usersStack.filter(
          stack => stack.uid !== action.user.uid,
        ),
      };
    case CLEAR_SHARE_USERS_STACK:
      return {
        ...state,
        usersStack: [],
      };
    default:
      return state;
  }
};

export default share;
