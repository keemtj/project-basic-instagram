import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action type
const CURRENT_USER_DATA = 'user/CURRENT_USER_DATA';
const CURRENT_USER_FOLLOW_DATA = 'user/CURRENT_USER_FOLLOW_DATA';

const USERS_DATA = 'user/USERS_DATA';
const USERS_DATA_SUCCESS = 'user/USERS_DATA_SUCCESS';
const USERS_DATA_ERROR = 'user/USERS_DATA_ERROR';

const DATA_CLEAR = 'user/DATA_CLEAR';

// action creator
export const currentUserData = data => ({ type: CURRENT_USER_DATA, data });
export const currentUserFollowData = data => ({
  type: CURRENT_USER_FOLLOW_DATA,
  data,
});
export const suggestionUsersData = fetchDataThunk(
  USERS_DATA,
  store.getUsersData,
  500,
);
export const userDataClear = () => ({ type: DATA_CLEAR });

// initialStates
const initialState = {
  currentUser: {
    displayName: '',
    email: '',
    phone: '',
    photoURL: '/images/default_profile.png',
    presentation: '',
    uid: '',
    username: '',
  },
  currentUserFollowData: {
    followers: [],
    following: [],
    displayName: '',
    uid: '',
  },
  suggestionUsers: reducerUtils.initial(),
};

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_DATA:
      return {
        ...state,
        currentUser: action.data,
      };
    case CURRENT_USER_FOLLOW_DATA:
      return {
        ...state,
        currentUserFollowData: action.data,
      };
    case USERS_DATA:
      return {
        ...state,
        suggestionUsers: reducerUtils.loading(),
      };
    case USERS_DATA_SUCCESS:
      return {
        ...state,
        suggestionUsers: reducerUtils.success(action.payload),
      };
    case USERS_DATA_ERROR:
      return {
        ...state,
        suggestionUsers: reducerUtils.error(action.payload),
      };
    case DATA_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default user;
