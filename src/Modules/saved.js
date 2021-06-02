// SAVED(BOOKMARK) module
import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// action
const GET_BOOKMARKS = 'saved/GET_BOOKMARKS';

const BOOKMARK_POSTS = 'saved/BOOKMARK_POSTS';
const BOOKMARK_POSTS_SUCCESS = 'saved/BOOKMARK_POSTS_SUCCESS';
const BOOKMARK_POSTS_ERROR = 'saved/BOOKMARK_POSTS_ERROR';

// action creator
export const getBookmarks = data => ({ type: GET_BOOKMARKS, data });
export const getBookmarkPosts = fetchDataThunk(
  BOOKMARK_POSTS,
  store.getPostsByBookmarks,
);

// initialState
const initialState = {
  bookmarks: [],
  posts: reducerUtils.initial(),
};

// reducer
const saved = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.data,
      };
    case BOOKMARK_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case BOOKMARK_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload),
      };
    case BOOKMARK_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      };
    default:
      return state;
  }
};

export default saved;
