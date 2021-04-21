import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// TODO: action type
const CURRENT_USER = 'user/CURRENT_USER';

const SEARCH_USER = 'user/SEARCH_USER';
const SEARCH_USER_SUCCESS = 'user/SEARCH_USER_SUCCESS';
const SEARCH_USER_ERROR = 'user/SEARCH_USER_ERROR';

// TODO: action creator
export const currentUser = userData => ({ type: CURRENT_USER, userData });
export const getWatchUserByDisplayName = fetchDataThunk(
  SEARCH_USER,
  store.getUserDataByDisplayName,
);

// TODO: initialState
const initialState = {
  currentUser: {
    photoURL: '',
    displayName: '',
    email: '',
    followers: '',
    following: '',
    uid: '',
    username: '',
  },
  searchUser: reducerUtils.initial(),
};

// TODO: reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: {
          photoURL: action.userData.photoURL,
          displayName: action.userData.displayName,
          email: action.userData.email,
          followers: [...action.userData.followers],
          following: [...action.userData.following],
          uid: action.userData.uid,
          username: action.userData.username,
        },
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
        searchUser: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
};

export default user;
