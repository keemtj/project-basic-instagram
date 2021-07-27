import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action type
// main
const CURRENT_USER_DATA = 'user/CURRENT_USER_DATA';
const CURRENT_USER_FOLLOW_DATA = 'user/CURRENT_USER_FOLLOW_DATA';
// aside
const SUGGESTION_USERS_DATA = 'user/SUGGESTION_USERS_DATA';
const SUGGESTION_USERS_DATA_SUCCESS = 'user/SUGGESTION_USERS_DATA_SUCCESS';
const SUGGESTION_USERS_DATA_ERROR = 'user/SUGGESTION_USERS_DATA_ERROR';
// profile
const PROFILE_USER_DATA = 'user/PROFILE_USER_DATA';
const PROFILE_USER_DATA_SUCCESS = 'user/PROFILE_USER_DATA_SUCCESS';
const PROFILE_USER_DATA_ERROR = 'user/PROFILE_USER_DATA_ERROR';
const PROFILE_USER_FOLLOW_DATA = 'user/PROFILE_USER_FOLLOW_DATA';
// sign out
const DATA_CLEAR = 'user/DATA_CLEAR';

// action creator
export const currentUserData = data => ({ type: CURRENT_USER_DATA, data });
export const currentUserFollowData = data => ({
  type: CURRENT_USER_FOLLOW_DATA,
  data,
});

export const suggestionUsersData = fetchDataThunk(
  SUGGESTION_USERS_DATA,
  store.getSuggestionUsersData,
  500,
);

export const getProfileUserData = fetchDataThunk(
  PROFILE_USER_DATA,
  store.getProfileUserData,
  1000,
);
export const profileUserFollowData = data => ({
  type: PROFILE_USER_FOLLOW_DATA,
  data,
});

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
  profileUserData: reducerUtils.initial(),
  profileUserFollowData: {
    followers: [],
    following: [],
    displayName: '',
    uid: '',
  },
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
    case SUGGESTION_USERS_DATA:
      return {
        ...state,
        suggestionUsers: reducerUtils.loading(),
      };
    case SUGGESTION_USERS_DATA_SUCCESS:
      return {
        ...state,
        suggestionUsers: reducerUtils.success(action.payload),
      };
    case SUGGESTION_USERS_DATA_ERROR:
      return {
        ...state,
        suggestionUsers: reducerUtils.error(action.payload),
      };
    case PROFILE_USER_DATA:
      return {
        ...state,
        profileUserData: reducerUtils.loading(),
      };
    case PROFILE_USER_DATA_SUCCESS:
      return {
        ...state,
        profileUserData: reducerUtils.success(action.payload),
      };
    case PROFILE_USER_DATA_ERROR:
      return {
        ...state,
        profileUserData: reducerUtils.error(action.payload),
      };
    case PROFILE_USER_FOLLOW_DATA:
      return {
        ...state,
        profileUserFollowData: action.data,
      };
    case DATA_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default user;
