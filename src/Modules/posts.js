import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// NOTE action type
const MAIN_POSTS = 'posts/MAIN_POSTS';
const MAIN_POSTS_SUCCESS = 'posts/MAIN_POSTS_SUCCESS';
const MAIN_POSTS_ERROR = 'posts/MAIN_POSTS_ERROR';
const UPDATE_MAIN_POSTS = 'posts/UPDATE_MAIN_POSTS';

const PROFILE_POSTS = 'posts/PROFILE_POSTS';
const PROFILE_POSTS_SUCCESS = 'posts/PROFILE_POSTS_SUCCESS';
const PROFILE_POSTS_ERROR = 'posts/PROFILE_POSTS_ERROR';

const PROFILE_BOOKMARK_POSTS = 'posts/PROFILE_BOOKMARK_POSTS';
const PROFILE_BOOKMARK_POSTS_SUCCESS = 'posts/PROFILE_BOOKMARK_POSTS_SUCCESS';
const PROFILE_BOOKMARK_POSTS_ERROR = 'posts/PROFILE_BOOKMARK_POSTS_ERROR';

const PROFILE_HEART_POSTS = 'posts/PROFILE_HEART_POSTS';
const PROFILE_HEART_POSTS_SUCCESS = 'posts/PROFILE_HEART_POSTS_SUCCESS';
const PROFILE_HEART_POSTS_ERROR = 'posts/PROFILE_HEART_POSTS_ERROR';

const MY_FOLLOWING_POSTS = 'posts/MY_FOLLOWING_POSTS';
const MY_FOLLOWING_POSTS_SUCCESS = 'posts/MY_FOLLOWING_POSTS_SUCCESS';
const MY_FOLLOWING_POSTS_ERROR = 'posts/MY_FOLLOWING_POSTS_ERROR';

const POST = 'posts/POST';
const POST_SUCCESS = 'posts/POST_SUCCESS';
const POST_ERROR = 'posts/POST_ERROR';

const UPDATE_POSTS = 'posts/UPDATE_POSTS';
const UPDATE_POST = 'posts/UPDATE_POST';

const UPDATE_FOLLOWING_POST = 'posts/UPDATE_FOLLOWING_POST';

const REMOVE_POST = 'posts/REMOVE_POST';

const DATA_CLEAR = 'posts/DATA_CLEAR';

// action creator
export const getMainPosts = fetchDataThunk(MAIN_POSTS, store.getAllPosts, 1000);
export const updateMainPosts = data => ({ type: UPDATE_MAIN_POSTS, data });

export const getProfilePosts = fetchDataThunk(
  PROFILE_POSTS,
  store.getProfilePosts,
  1000,
);
export const getProfileBookmarkPosts = fetchDataThunk(
  PROFILE_BOOKMARK_POSTS,
  store.getProfileBookmarkPosts,
  1000,
);
export const getProfileHeartPosts = fetchDataThunk(
  PROFILE_HEART_POSTS,
  store.getProfileHeartPosts,
  1000,
);

export const getFollowingPosts = fetchDataThunk(
  MY_FOLLOWING_POSTS,
  store.getPostsByAllFollowing,
  1000,
);

export const getPost = fetchDataThunk(POST, store.getPostBySinglePost);

export const updatePosts = data => ({ type: UPDATE_POSTS, data });
export const updatePost = data => ({ type: UPDATE_POST, data });
export const updateFollowingPost = data => ({
  type: UPDATE_FOLLOWING_POST,
  data,
});

export const removePost = data => ({ type: REMOVE_POST, data });

export const postDataClear = () => ({ type: DATA_CLEAR });

// NOTE initialState
const initialState = {
  mainPosts: reducerUtils.initial(),
  profilePosts: reducerUtils.initial(),
  profileBookmarkPosts: reducerUtils.initial(),
  profileHeartPosts: reducerUtils.initial(),
  myFollowingPosts: reducerUtils.initial(),
  combinePosts: [],
  post: reducerUtils.initial(),
};

// NOTE reducer
const posts = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_POSTS:
      return {
        ...state,
        mainPosts: reducerUtils.loading(),
      };
    case MAIN_POSTS_SUCCESS:
      return {
        ...state,
        mainPosts: reducerUtils.success(action.payload),
      };
    case MAIN_POSTS_ERROR:
      return {
        ...state,
        mainPosts: reducerUtils.error(action.payload),
      };
    case UPDATE_MAIN_POSTS:
      return {
        ...state,
        mainPosts: {
          ...state.mainPosts,
          data: state.mainPosts.data.map(post =>
            post.id === action.data.id ? action.data : post,
          ),
        },
      };

    case PROFILE_POSTS:
      return {
        ...state,
        profilePosts: reducerUtils.loading(),
      };
    case PROFILE_POSTS_SUCCESS:
      return {
        ...state,
        profilePosts: reducerUtils.success(action.payload),
      };
    case PROFILE_POSTS_ERROR:
      return {
        ...state,
        profilePosts: reducerUtils.error(action.payload),
      };
    case PROFILE_BOOKMARK_POSTS:
      return {
        ...state,
        profileBookmarkPosts: reducerUtils.loading(),
      };
    case PROFILE_BOOKMARK_POSTS_SUCCESS:
      return {
        ...state,
        profileBookmarkPosts: reducerUtils.success(action.payload),
      };
    case PROFILE_BOOKMARK_POSTS_ERROR:
      return {
        ...state,
        profileBookmarkPosts: reducerUtils.error(action.payload),
      };
    case PROFILE_HEART_POSTS:
      return {
        ...state,
        profileHeartPosts: reducerUtils.loading(),
      };
    case PROFILE_HEART_POSTS_SUCCESS:
      return {
        ...state,
        profileHeartPosts: reducerUtils.success(action.payload),
      };
    case PROFILE_HEART_POSTS_ERROR:
      return {
        ...state,
        profileHeartPosts: reducerUtils.error(action.payload),
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
    case REMOVE_POST: {
      return {
        ...state,
        myPosts: {
          ...state.myPosts,
          data: action.data,
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
