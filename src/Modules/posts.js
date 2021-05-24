import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// NOTE action type
const MY_POSTS = 'main/MY_POSTS';
const MY_POSTS_SUCCESS = 'main/MY_POSTS_SUCCESS';
const MY_POSTS_ERROR = 'main/MY_POSTS_ERROR';

const MY_FOLLOWING_POSTS = 'main/MY_FOLLOWING_POSTS';
const MY_FOLLOWING_POSTS_SUCCESS = 'main/MY_FOLLOWING_POSTS_SUCCESS';
const MY_FOLLOWING_POSTS_ERROR = 'main/MY_FOLLOWING_POSTS_ERROR';

// --> 검색된 유저의 포스트 액션
const SEARCH_USER_POSTS = 'main/SEARCH_USER_POSTS';
const SEARCH_USER_POSTS_SUCCESS = 'main/SEARCH_USER_POSTS_SUCCESS';
const SEARCH_USER_POSTS_ERROR = 'main/SEARCH_USER_POSTS_ERROR';

// NOTE action creator
export const getPosts = fetchDataThunk(MY_POSTS, store.getCurrentUserPostsData);
export const getFollowingPosts = fetchDataThunk(
  MY_FOLLOWING_POSTS,
  store.getAllPostsByFollowing,
);
export const getSearchUserPosts = fetchDataThunk(
  SEARCH_USER_POSTS,
  store.getCurrentUserPostsData,
);

// NOTE initialState
const initialState = {
  myPosts: reducerUtils.initial(),
  myFollowingPosts: reducerUtils.initial(),
  searchUserPosts: reducerUtils.initial(),
};

// NOTE reducer
const posts = (state = initialState, action) => {
  switch (action.type) {
    case MY_POSTS:
      return {
        ...state,
        myPosts: reducerUtils.loading(),
      };
    case MY_POSTS_SUCCESS:
      return {
        ...state,
        myPosts: reducerUtils.success(action.payload),
      };
    case MY_POSTS_ERROR:
      return {
        ...state,
        myPosts: reducerUtils.error(action.payload),
      };
    case MY_FOLLOWING_POSTS:
      return {
        ...state,
        myFollowingPosts: reducerUtils.loading(),
      };
    case MY_FOLLOWING_POSTS_SUCCESS:
      return {
        ...state,
        myFollowingPosts: reducerUtils.success(action.payload),
      };
    case MY_FOLLOWING_POSTS_ERROR:
      return {
        ...state,
        myFollowingPosts: reducerUtils.error(action.payload),
      };
    case SEARCH_USER_POSTS:
      return {
        ...state,
        searchUserPosts: reducerUtils.loading(),
      };
    case SEARCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        searchUserPosts: reducerUtils.success(action.payload),
      };
    case SEARCH_USER_POSTS_ERROR:
      return {
        ...state,
        searchUserPosts: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
};

export default posts;
