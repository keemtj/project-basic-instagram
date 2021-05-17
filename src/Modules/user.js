// NOTE current user's datas(my datas)
import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action type
const CURRENT_USER = 'user/CURRENT_USER';
const FOLLOW_DATA = 'user/FOLLOW_DATA';

const FOLLOWED_ME = 'user/FOLLOWED_ME';
const FOLLOWED_ME_SUCCESS = 'user/FOLLOWED_ME_SUCCESS';
const FOLLOWED_ME_ERROR = 'user/FOLLOWED_ME_ERROR';

// action creator
export const currentUser = currentUserData => ({
  type: CURRENT_USER,
  currentUserData,
});
export const currentUserFollow = followData => ({
  type: FOLLOW_DATA,
  followData,
});
export const followedMe = fetchDataThunk(FOLLOWED_ME, store.getFollowedMe);

// initialState
const initialState = {
  user: {},
  follow: {
    followers: [],
    following: [],
  },
  followed: reducerUtils.initial(),
};

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        user: action.currentUserData,
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
    default:
      return state;
  }
};

export default user;
