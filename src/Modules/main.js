import * as fb from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// TODO: action type
const MY_ALL_POSTS = 'main/MY_ALL_POSTS';
const MY_ALL_POSTS_SUCCESS = 'main/MY_ALL_POSTS_SUCCESS';
const MY_ALL_POSTS_ERROR = 'main/MY_ALL_POSTS_ERROR';

// TODO: fetchDataThunk
export const getAllPostsByCurrentUid = fetchDataThunk(
  MY_ALL_POSTS,
  fb.getCurrentUserPostsData,
);

// TODO: action creator

// TODO: initialState
const initialState = reducerUtils.initial();
// TODO: reducer

const main = (state = initialState, action) => {
  switch (action.type) {
    case MY_ALL_POSTS:
      return reducerUtils.loading();
    case MY_ALL_POSTS_SUCCESS:
      return reducerUtils.success(action.payload);
    case MY_ALL_POSTS_ERROR:
      return reducerUtils.error(action.payload);
    default:
      return state;
  }
};

export default main;
