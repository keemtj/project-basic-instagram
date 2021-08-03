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
const UPDATE_PROFILE_POSTS = 'posts/UPDATE_PROFILE_POSTS';

const PROFILE_BOOKMARK_POSTS = 'posts/PROFILE_BOOKMARK_POSTS';
const PROFILE_BOOKMARK_POSTS_SUCCESS = 'posts/PROFILE_BOOKMARK_POSTS_SUCCESS';
const PROFILE_BOOKMARK_POSTS_ERROR = 'posts/PROFILE_BOOKMARK_POSTS_ERROR';
const UPDATE_PROFILE_BOOKMARK_POSTS = 'posts/UPDATE_PROFILE_BOOKMARK_POSTS';

const PROFILE_HEART_POSTS = 'posts/PROFILE_HEART_POSTS';
const PROFILE_HEART_POSTS_SUCCESS = 'posts/PROFILE_HEART_POSTS_SUCCESS';
const PROFILE_HEART_POSTS_ERROR = 'posts/PROFILE_HEART_POSTS_ERROR';
const UPDATE_PROFILE_HEART_POSTS = 'posts/UPDATE_PROFILE_HEART_POSTS';

const ACTIVE_POST_ID = 'posts/ACTIVE_POST_ID';
const ACTIVE_POST_INDEX = 'posts/ACTIVE_POST_INDEX';
const CURRENT_IMAGE = 'posts/CURRENT_IMAGE';

const POST = 'posts/POST';
const POST_SUCCESS = 'posts/POST_SUCCESS';
const POST_ERROR = 'posts/POST_ERROR';

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
export const updateProfilePosts = data => ({
  type: UPDATE_PROFILE_POSTS,
  data,
});

export const getProfileBookmarkPosts = fetchDataThunk(
  PROFILE_BOOKMARK_POSTS,
  store.getProfileBookmarkPosts,
  1000,
);
export const updateProfileBookmarkPosts = data => ({
  type: UPDATE_PROFILE_BOOKMARK_POSTS,
  data,
});

export const getProfileHeartPosts = fetchDataThunk(
  PROFILE_HEART_POSTS,
  store.getProfileHeartPosts,
  1000,
);
export const updateProfileHeartPosts = data => ({
  type: UPDATE_PROFILE_HEART_POSTS,
  data,
});

export const activeIdOfPost = id => ({ type: ACTIVE_POST_ID, id });
export const activeIndexOfPost = index => ({
  type: ACTIVE_POST_INDEX,
  index,
});
export const currentImageIndex = index => ({ type: CURRENT_IMAGE, index });

// FIXME: 아래는 수정 가능성이 있는 action creator
export const getPost = fetchDataThunk(POST, store.getPostBySinglePost);
export const removePost = data => ({ type: REMOVE_POST, data });
export const postDataClear = () => ({ type: DATA_CLEAR });

// NOTE initialState
const initialState = {
  mainPosts: reducerUtils.initial(),
  profilePosts: reducerUtils.initial(),
  profileBookmarkPosts: reducerUtils.initial(),
  profileHeartPosts: reducerUtils.initial(),
  activePostId: '',
  activePostIndex: 0,
  currentImage: 0,
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
    case UPDATE_PROFILE_POSTS:
      return {
        ...state,
        profilePosts: {
          ...state.profilePosts,
          data: state.profilePosts.data.map(post =>
            post.id === action.data.id ? action.data : post,
          ),
        },
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
    case UPDATE_PROFILE_BOOKMARK_POSTS:
      return {
        ...state,
        profileBookmarkPosts: {
          ...state.profileBookmarkPosts,
          data: state.profileBookmarkPosts.data.map(post =>
            post.id === action.data.id ? action.data : post,
          ),
        },
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
    case UPDATE_PROFILE_HEART_POSTS:
      return {
        ...state,
        profileHeartPosts: {
          ...state.profileHeartPosts,
          data: state.profileHeartPosts.data.map(post =>
            post.id === action.data.id ? action.data : post,
          ),
        },
      };

    case ACTIVE_POST_ID:
      return {
        ...state,
        activePostId: action.id,
      };
    case ACTIVE_POST_INDEX:
      return {
        ...state,
        activePostIndex: action.index,
      };
    case CURRENT_IMAGE:
      return {
        ...state,
        currentImage: action.index,
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
