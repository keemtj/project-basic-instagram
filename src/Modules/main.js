import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// TODO: action type
const MY_ALL_POSTS = 'main/MY_ALL_POSTS';
const MY_ALL_POSTS_SUCCESS = 'main/MY_ALL_POSTS_SUCCESS';
const MY_ALL_POSTS_ERROR = 'main/MY_ALL_POSTS_ERROR';

const MY_FOLLOWING_POSTS = 'main/MY_FOLLOWING_POSTS';
const MY_FOLLOWING_POSTS_SUCCESS = 'main/MY_FOLLOWING_POSTS_SUCCESS';
const MY_FOLLOWING_POSTS_ERROR = 'main/MY_FOLLOWING_POSTS_ERROR';

// TODO: action creator
// TODO: fetchDataThunk
export const getAllPostsByCurrentUid = fetchDataThunk(
  MY_ALL_POSTS,
  store.getCurrentUserPostsData,
);

export const getMyFollowingPosts = fetchDataThunk(
  MY_FOLLOWING_POSTS,
  store.getAllPostsByFollowing,
);

// TODO: initialState
const initialState = {
  myPosts: reducerUtils.initial(),
  myFollowingPosts: reducerUtils.initial(),
};

// TODO: reducer
const main = (state = initialState, action) => {
  switch (action.type) {
    case MY_ALL_POSTS:
      return {
        ...state,
        myPosts: reducerUtils.loading(),
      };
    case MY_ALL_POSTS_SUCCESS:
      return {
        ...state,
        myPosts: reducerUtils.success(action.payload),
      };
    case MY_ALL_POSTS_ERROR:
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
    default:
      return state;
  }
};

export default main;
