// HEART module
import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action
const GET_HEARTS = 'heart/GET_HEARTS';

const HEART_POSTS = 'heart/HEART_POSTS';
const HEART_POSTS_SUCCESS = 'heart/HEART_POSTS_SUCCESS';
const HEART_POSTS_ERROR = 'heart/HEART_POSTS_ERROR';

const HEART_USERS = 'hearts/HEART_USERS';
const HEART_USERS_SUCCESS = 'hearts/HEART_USERS_SUCCESS';
const HEART_USERS_ERROR = 'hearts/HEART_USERS_ERROR';

// action creator
export const getHearts = data => ({ type: GET_HEARTS, data });

export const getHeartPosts = fetchDataThunk(
  HEART_POSTS,
  store.getPostsByHearts,
  2000,
);

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
const saved = (state = initialState, action) => {
  switch (action.type) {
    case GET_HEARTS:
      return {
        ...state,
        hearts: action.data.reverse(),
      };
    case HEART_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case HEART_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload),
      };
    case HEART_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      };
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

export default saved;
