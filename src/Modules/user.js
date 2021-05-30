// NOTE current user's datas(my datas)
import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action type
const CURRENT_USER_DATA = 'user/CURRENT_USER_DATA';
const CURRENT_USER_DATA_SUCCESS = 'user/CURRENT_USER_DATA_SUCCESS';
const CURRENT_USER_DATA_ERROR = 'user/CURRENT_USER_DATA_ERROR';

const CURRENT_USER_FOLLOW_DATA = 'user/CURRENT_USER_FOLLOW_DATA';
const CURRENT_USER_FOLLOW_DATA_SUCCESS =
  'user/CURRENT_USER_FOLLOW_DATA_SUCCESS';
const CURRENT_USER_FOLLOW_DATA_ERROR = 'user/CURRENT_USER_FOLLOW_DATA_ERROR';

// action creator
export const getCurrentUserData = fetchDataThunk(
  CURRENT_USER_DATA,
  store.getCurrentUserData,
);
export const getCurrentUserFollowData = fetchDataThunk(
  CURRENT_USER_FOLLOW_DATA,
  store.getCurrentUserFollowData,
);

// initialState
const initialState = {
  currentUser: reducerUtils.initial(),
  currentUserFollowData: reducerUtils.initial(),
  followed: reducerUtils.initial(),
};

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_DATA:
      return {
        ...state,
        currentUser: reducerUtils.loading(),
      };
    case CURRENT_USER_DATA_SUCCESS:
      return {
        ...state,
        currentUser: reducerUtils.success(action.payload),
      };
    case CURRENT_USER_DATA_ERROR:
      return {
        ...state,
        currentUser: reducerUtils.error(action.payload),
      };
    case CURRENT_USER_FOLLOW_DATA:
      return {
        ...state,
        currentUserFollowData: reducerUtils.loading(),
      };
    case CURRENT_USER_FOLLOW_DATA_SUCCESS:
      return {
        ...state,
        currentUserFollowData: reducerUtils.success(action.payload),
      };
    case CURRENT_USER_FOLLOW_DATA_ERROR:
      return {
        ...state,
        currentUserFollowData: reducerUtils.error(action.payload),
      };

    // case FOLLOW:
    //   return {
    //     ...state,
    //     follow: {
    //       ...state.follow,
    //       followers: [...state.follow.followers, action.uid],
    //     },
    //   };
    // case UNFOLLOW:
    //   return {
    //     ...state,
    //     follow: {
    //       ...state.follow,
    //       following: state.follow.following.filter(uid => uid !== action.uid),
    //     },
    //   };
    default:
      return state;
  }
};

export default user;
