import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// NOTE action type
const MY_POSTS = 'posts/MY_POSTS';
const MY_POSTS_SUCCESS = 'posts/MY_POSTS_SUCCESS';
const MY_POSTS_ERROR = 'posts/MY_POSTS_ERROR';

const MY_FOLLOWING_POSTS = 'posts/MY_FOLLOWING_POSTS';
const MY_FOLLOWING_POSTS_SUCCESS = 'posts/MY_FOLLOWING_POSTS_SUCCESS';
const MY_FOLLOWING_POSTS_ERROR = 'posts/MY_FOLLOWING_POSTS_ERROR';

const COMBINE_POSTS = 'posts/COMBINE_POSTS';

const SEARCH_USER_POSTS = 'posts/SEARCH_USER_POSTS';
const SEARCH_USER_POSTS_SUCCESS = 'posts/SEARCH_USER_POSTS_SUCCESS';
const SEARCH_USER_POSTS_ERROR = 'posts/SEARCH_USER_POSTS_ERROR';

const POST = 'posts/POST';
const POST_SUCCESS = 'posts/POST_SUCCESS';
const POST_ERROR = 'posts/POST_ERROR';

const UPDATE_POSTS = 'posts/UPDATE_POSTS';
const UPDATE_POST = 'posts/UPDATE_POST';

const UPDATE_FOLLOWING_POST = 'posts/UPDATE_FOLLOWING_POST';

const DATA_CLEAR = 'posts/DATA_CLEAR';

// NOTE action creator
export const getPosts = fetchDataThunk(MY_POSTS, store.getCurrentUserPostsData);
export const getFollowingPosts = fetchDataThunk(
  MY_FOLLOWING_POSTS,
  store.getPostsByAllFollowing,
);
export const combinePosts = () => ({ type: COMBINE_POSTS });

export const getSearchUserPosts = fetchDataThunk(
  SEARCH_USER_POSTS,
  store.getCurrentUserPostsData,
);

export const getPost = fetchDataThunk(POST, store.getPostBySinglePost);

export const updatePosts = data => ({ type: UPDATE_POSTS, data });
export const updatePost = data => ({ type: UPDATE_POST, data });
export const updateFollowingPost = data => ({
  type: UPDATE_FOLLOWING_POST,
  data,
});

export const postDataClear = () => ({ type: DATA_CLEAR });

// NOTE initialState
const initialState = {
  myPosts: reducerUtils.initial(),
  myFollowingPosts: reducerUtils.initial(),
  combinePosts: [],
  searchUserPosts: reducerUtils.initial(),
  post: reducerUtils.initial(),
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
    case COMBINE_POSTS:
      return {
        ...state,
        combinePosts: [
          ...state.myPosts.data,
          ...state.myFollowingPosts.data,
        ].sort((a, b) => b.date - a.date),
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
    case POST:
      return {
        ...state,
        post: reducerUtils.loading(),
      };
    case POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.payload),
      };
    case POST_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.payload),
      };
    case UPDATE_POSTS: {
      return {
        ...state,
        myPosts: {
          ...state.myPosts,
          data: action.data,
        },
      };
    }
    case UPDATE_POST: {
      return {
        ...state,
        myPosts: {
          ...state.myPosts,
          data: state.myPosts.data.map(post => {
            if (post.id === action.data.id) {
              return action.data;
            } else {
              return post;
            }
          }),
        },
      };
    }
    case UPDATE_FOLLOWING_POST: {
      return {
        ...state,
        myFollowingPosts: {
          ...state.myFollowingPosts,
          data: state.myFollowingPosts.data.map(post => {
            if (post.id === action.data.id) {
              return action.data;
            } else {
              return post;
            }
          }),
        },
      };
    }
    case DATA_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default posts;
