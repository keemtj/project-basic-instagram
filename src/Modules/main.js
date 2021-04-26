import * as fb from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// TODO: action type
const MY_ALL_POSTS = 'main/MY_ALL_POSTS';
const MY_ALL_POSTS_SUCCESS = 'main/MY_ALL_POSTS_SUCCESS';
const MY_ALL_POSTS_ERROR = 'main/MY_ALL_POSTS_ERROR';

const MY_FOLLOWING_POSTS = 'main/MY_FOLLOWING_POSTS';

const RESET_FOLLOWING_POSTS = 'main/RESET_FOLLOWING_POSTS';

// TODO: action creator
// TODO: fetchDataThunk
export const getAllPostsByCurrentUid = fetchDataThunk(
  MY_ALL_POSTS,
  fb.getCurrentUserPostsData,
);
export const getMyFollowingPosts = datas => ({
  type: MY_FOLLOWING_POSTS,
  datas,
});
export const resetFollowingPosts = () => ({ type: RESET_FOLLOWING_POSTS });

// TODO: initialState
const initialState = {
  myPosts: reducerUtils.initial(),
  myFollowingPosts: [],
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
        myFollowingPosts: action.datas,
      };
    case RESET_FOLLOWING_POSTS:
      return {
        ...state,
        myFollowingPosts: [],
      };
    default:
      return state;
  }
};

export default main;
