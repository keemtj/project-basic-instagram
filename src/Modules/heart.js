// HEART module
import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action
const GET_HEARTS = 'heart/GET_HEARTS';
const HEART_POSTS = 'heart/HEART_POSTS';
const HEART_POSTS_SUCCESS = 'heart/HEART_POSTS_SUCCESS';
const HEART_POSTS_ERROR = 'heart/HEART_POSTS_ERROR';

// action creator
export const getHearts = data => ({ type: GET_HEARTS, data });
export const getHeartPosts = fetchDataThunk(
  HEART_POSTS,
  store.getPostsByHearts,
  2000,
);

// initialState
const initialState = {
  hearts: [],
  posts: reducerUtils.initial(),
};

// reducer
const saved = (state = initialState, action) => {
  switch (action.type) {
    case GET_HEARTS:
      return {
        ...state,
        hearts: action.data,
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
    default:
      return state;
  }
};

export default saved;
