import * as store from '../services/firestore';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// NOTE action type
const MAIN_POSTS = 'posts/MAIN_POSTS';
const MAIN_POSTS_SUCCESS = 'posts/MAIN_POSTS_SUCCESS';
const MAIN_POSTS_ERROR = 'posts/MAIN_POSTS_ERROR';
const UPDATE_MAIN_POSTS = 'posts/UPDATE_MAIN_POSTS';
const LAST_DOCS_BY_MAIN = 'posts/LAST_DOCS_BY_MAIN';
const NEXT_MAIN_POSTS = 'posts/NEXT_MAIN_POSTS';

const PROFILE_POSTS_SIZE = 'posts/PROFILE_POSTS_SIZE';
const PROFILE_POSTS = 'posts/PROFILE_POSTS';
const PROFILE_POSTS_SUCCESS = 'posts/PROFILE_POSTS_SUCCESS';
const PROFILE_POSTS_ERROR = 'posts/PROFILE_POSTS_ERROR';
const UPDATE_PROFILE_POSTS = 'posts/UPDATE_PROFILE_POSTS';
const LAST_DOC_BY_PROFILE_POSTS = 'posts/LAST_DOC_BY_PROFILE_POSTS';
const NEXT_PROFILE_POSTS = 'posts/NEXT_PROFILE_POSTS';

const PROFILE_BOOKMARK_POSTS = 'posts/PROFILE_BOOKMARK_POSTS';
const PROFILE_BOOKMARK_POSTS_SUCCESS = 'posts/PROFILE_BOOKMARK_POSTS_SUCCESS';
const PROFILE_BOOKMARK_POSTS_ERROR = 'posts/PROFILE_BOOKMARK_POSTS_ERROR';
const UPDATE_PROFILE_BOOKMARK_POSTS = 'posts/UPDATE_PROFILE_BOOKMARK_POSTS';
const LAST_DOC_BY_PROFILE_BOOKMARK_POSTS =
  'posts/LAST_DOC_BY_PROFILE_BOOKMARK_POSTS';
const NEXT_PROFILE_BOOKMARK_POSTS = 'posts/NEXT_PROFILE_BOOKMARK_POSTS';

const PROFILE_HEART_POSTS = 'posts/PROFILE_HEART_POSTS';
const PROFILE_HEART_POSTS_SUCCESS = 'posts/PROFILE_HEART_POSTS_SUCCESS';
const PROFILE_HEART_POSTS_ERROR = 'posts/PROFILE_HEART_POSTS_ERROR';
const UPDATE_PROFILE_HEART_POSTS = 'posts/UPDATE_PROFILE_HEART_POSTS';
const LAST_DOC_BY_PROFILE_HEART_POSTS = 'posts/LAST_DOC_BY_PROFILE_HEART_POSTS';
const NEXT_PROFILE_HEART_POSTS = 'posts/NEXT_PROFILEHEART__POSTS';

const ACTIVE_POST_ID = 'posts/ACTIVE_POST_ID';
const ACTIVE_POST_INDEX = 'posts/ACTIVE_POST_INDEX';
const CURRENT_IMAGE = 'posts/CURRENT_IMAGE';

const SINGLE_POST = 'posts/SINGLE_POST';
const SINGLE_POST_SUCCESS = 'posts/SINGLE_POST_SUCCESS';
const SINGLE_POST_ERROR = 'posts/SINGLE_POST_ERROR';

const REMOVE_POST = 'posts/REMOVE_POST';

const DATA_CLEAR = 'posts/DATA_CLEAR';

// action creator
export const getMainPosts = fetchDataThunk(MAIN_POSTS, store.getAllPosts, 1000);
export const updateMainPosts = data => ({ type: UPDATE_MAIN_POSTS, data });
export const updateLastMainDocs = docs => ({ type: LAST_DOCS_BY_MAIN, docs });
export const nextMainPosts = datas => ({ type: NEXT_MAIN_POSTS, datas });

export const getProfilePostsSize = size => ({ type: PROFILE_POSTS_SIZE, size });
export const getProfilePosts = fetchDataThunk(
  PROFILE_POSTS,
  store.getProfilePosts,
  1000,
);
export const updateProfilePosts = data => ({
  type: UPDATE_PROFILE_POSTS,
  data,
});
export const updateLastDocByProfilePosts = doc => ({
  type: LAST_DOC_BY_PROFILE_POSTS,
  doc,
});
export const nextProfilePosts = datas => ({ type: NEXT_PROFILE_POSTS, datas });

export const getProfileBookmarkPosts = fetchDataThunk(
  PROFILE_BOOKMARK_POSTS,
  store.getProfileBookmarkPosts,
  1000,
);
export const updateProfileBookmarkPosts = data => ({
  type: UPDATE_PROFILE_BOOKMARK_POSTS,
  data,
});
export const updateLastDocByProfileBookmarkPosts = doc => ({
  type: LAST_DOC_BY_PROFILE_BOOKMARK_POSTS,
  doc,
});
export const nextProfileBookmarkPosts = datas => ({
  type: NEXT_PROFILE_BOOKMARK_POSTS,
  datas,
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
export const updateLastDocByProfileHeartPosts = doc => ({
  type: LAST_DOC_BY_PROFILE_HEART_POSTS,
  doc,
});
export const nextProfileHeartPosts = datas => ({
  type: NEXT_PROFILE_HEART_POSTS,
  datas,
});

export const activeIdOfPost = id => ({ type: ACTIVE_POST_ID, id });
export const activeIndexOfPost = index => ({
  type: ACTIVE_POST_INDEX,
  index,
});
export const currentImageIndex = index => ({ type: CURRENT_IMAGE, index });

export const getSinglePost = fetchDataThunk(
  SINGLE_POST,
  store.getPostBySinglePost,
);

export const removePost = id => ({ type: REMOVE_POST, id });

// FIXME: 아래는 수정 가능성이 있는 action creator
export const postDataClear = () => ({ type: DATA_CLEAR });

// NOTE initialState
const initialState = {
  mainPosts: reducerUtils.initial(),
  lastMainDocs: [],
  profilePostsSize: 0,
  profilePosts: reducerUtils.initial(),
  lastDocByProfilePosts: null,
  profileBookmarkPosts: reducerUtils.initial(),
  lastDocByProfileBookmarkPosts: null,
  profileHeartPosts: reducerUtils.initial(),
  lastDocByProfileHeartPosts: null,
  activePostId: '',
  activePostIndex: 0,
  currentImage: 0,
  singlePost: reducerUtils.initial(),
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
    case LAST_DOCS_BY_MAIN:
      return {
        ...state,
        lastMainDocs: [...action.docs],
      };
    case NEXT_MAIN_POSTS:
      return {
        ...state,
        mainPosts: {
          ...state.mainPosts,
          data: [...state.mainPosts.data, ...action.datas],
        },
      };

    case PROFILE_POSTS_SIZE:
      return {
        ...state,
        profilePostsSize: action.size,
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
    case LAST_DOC_BY_PROFILE_POSTS:
      return {
        ...state,
        lastDocByProfilePosts: action.doc,
      };
    case NEXT_PROFILE_POSTS:
      return {
        ...state,
        profilePosts: {
          ...state.profilePosts,
          data: [...state.profilePosts.data, ...action.datas],
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
    case LAST_DOC_BY_PROFILE_BOOKMARK_POSTS:
      return {
        ...state,
        lastDocByProfileBookmarkPosts: action.doc,
      };
    case NEXT_PROFILE_BOOKMARK_POSTS:
      return {
        ...state,
        profileBookmarkPosts: {
          ...state.profileBookmarkPosts,
          data: [...state.profileBookmarkPosts.data, ...action.datas],
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
    case LAST_DOC_BY_PROFILE_HEART_POSTS:
      return {
        ...state,
        lastDocByProfileHeartPosts: action.doc,
      };
    case NEXT_PROFILE_HEART_POSTS:
      return {
        ...state,
        profileHeartPosts: {
          ...state.profileHeartPosts,
          data: [...state.profileHeartPosts.data, ...action.datas],
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

    case SINGLE_POST:
      return {
        ...state,
        singlePost: reducerUtils.loading(),
      };
    case SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: reducerUtils.success(action.payload),
      };
    case SINGLE_POST_ERROR:
      return {
        ...state,
        singlePost: reducerUtils.error(action.payload),
      };

    case REMOVE_POST: {
      return {
        ...state,
        mainPosts: {
          ...state.mainPosts,
          data: state.mainPosts.data.filter(post => post.id !== action.id),
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
