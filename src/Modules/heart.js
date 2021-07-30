import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action
const HEART_USERS = 'hearts/HEART_USERS';
const HEART_USERS_SUCCESS = 'hearts/HEART_USERS_SUCCESS';
const HEART_USERS_ERROR = 'hearts/HEART_USERS_ERROR';

// action creator
export const getUsersWhoClickHeart = fetchDataThunk(
  HEART_USERS,
  store.getUsersDataByHearts,
  500,
);

// initialState
const initialState = {
  hearts: [],
  posts: reducerUtils.initial(),
  users: reducerUtils.initial(),
};

// reducer
const hearts = (state = initialState, action) => {
  switch (action.type) {
    case HEART_USERS:
      return {
        ...state,
        users: reducerUtils.loading(),
      };
    case HEART_USERS_SUCCESS:
      return {
        ...state,
        users: reducerUtils.success(action.payload),
      };
    case HEART_USERS_ERROR:
      return {
        ...state,
        users: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
};

export default hearts;
