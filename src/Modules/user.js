import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// TODO: action type
const CURRENT_USER = 'user/CURRENT_USER';
const FOLLOW_DATA = 'user/FOLLOW_DATA';

const FOLLOWED_ME = 'user/FOLLOWED_ME';
const FOLLOWED_ME_SUCCESS = 'user/FOLLOWED_ME_SUCCESS';
const FOLLOWED_ME_ERROR = 'user/FOLLOWED_ME_ERROR';

const SEARCH_USER = 'user/SEARCH_USER';
const SEARCH_USER_SUCCESS = 'user/SEARCH_USER_SUCCESS';
const SEARCH_USER_ERROR = 'user/SEARCH_USER_ERROR';
const SEARCH_USER_FOLLOW = 'user/SEARCH_USER_FOLLOW';

const RESET_FOLLOW = 'user/RESET_FOLLOW';

// TODO: action creator
export const currentUser = userData => ({ type: CURRENT_USER, userData });

export const followData = followData => ({ type: FOLLOW_DATA, followData });

export const followedMe = fetchDataThunk(FOLLOWED_ME, store.getFollowedMe);

export const getWatchUserByDisplayName = fetchDataThunk(
  SEARCH_USER,
  store.getUserDataByDisplayName,
);

export const searchUserFollow = followData => ({
  type: SEARCH_USER_FOLLOW,
  followData,
});

export const resetFollow = () => ({ type: RESET_FOLLOW });

// TODO: initialState
const initialState = {
  currentUser: {
    photoURL: '',
    displayName: '',
    email: '',
    uid: '',
    username: '',
    presentation: '',
  },
  follow: {
    followers: [],
    following: [],
  },
  followed: reducerUtils.initial(),
  searchUser: reducerUtils.initial(),
  searchUserFollow: {
    followers: [],
    following: [],
  },
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
          uid: action.userData.uid,
          username: action.userData.username,
        },
      };
    case FOLLOW_DATA:
      return {
        ...state,
        follow: {
          followers: action.followData?.followers,
          following: action.followData?.following,
        },
      };
    case FOLLOWED_ME:
      return {
        ...state,
        followed: reducerUtils.loading(),
      };
    case FOLLOWED_ME_SUCCESS:
      return {
        ...state,
        followed: reducerUtils.success(action.payload),
      };
    case FOLLOWED_ME_ERROR:
      return {
        ...state,
        followed: reducerUtils.error(action.payload),
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
    case SEARCH_USER_FOLLOW:
      return {
        ...state,
        searchUserFollow: {
          followers: action.followData.followers,
          following: action.followData.following,
        },
      };
    case RESET_FOLLOW:
      return {
        ...state,
        follow: {
          followers: [],
          following: [],
        },
      };
    default:
      return state;
  }
};

export default user;
