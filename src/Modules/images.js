import * as storage from '../services/firebaseStorage';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// NOTE action type
const MY_POSTS_IMAGES = 'image/MY_POSTS_IMAGES';
const MY_POSTS_IMAGES_SUCCESS = 'image/MY_POSTS_IMAGES_SUCCESS';
const MY_POSTS_IMAGES_ERROR = 'image/MY_POSTS_IMAGES_ERROR';

const FOLLWING_POSTS_IMAGES = 'image/FOLLWING_POSTS_IMAGES';
const FOLLWING_POSTS_IMAGES_SUCCESS = 'image/FOLLWING_POSTS_IMAGES_SUCCESS';
const FOLLWING_POSTS_IMAGES_ERROR = 'image/FOLLWING_POSTS_IMAGES_ERROR';

// NOTE action creator
export const getPostImages = fetchDataThunk(
  MY_POSTS_IMAGES,
  storage.getPostImagesUrlFromStorage,
);
export const getFollowingPostImages = fetchDataThunk(
  FOLLWING_POSTS_IMAGES,
  storage.getPostImagesUrlFromStorage,
);

// NOTE initialState
const initialState = {
  myPostsImages: reducerUtils.initial(),
  myFollowingPostsImages: reducerUtils.initial(),
};

// NOTE reducer
const images = (state = initialState, action) => {
  switch (action.type) {
    // --> MY POSTS IMAGES
    case MY_POSTS_IMAGES:
      return {
        ...state,
        myPostsImages: {
          ...state.myPostsImages,
          loading: reducerUtils.loading().loading,
        },
      };
    case MY_POSTS_IMAGES_SUCCESS:
      return state.myPostsImages.data
        ? {
            ...state,
            myPostsImages: {
              ...state.myPostsImages,
              data: [
                ...state.myPostsImages.data,
                reducerUtils.success(action.payload).data,
              ],
              loading: reducerUtils.success(action.payload).loading,
            },
          }
        : {
            ...state,
            myPostsImages: {
              ...state.myPostsImages,
              data: [reducerUtils.success(action.payload).data],
              loading: reducerUtils.success(action.payload).loading,
            },
          };
    case MY_POSTS_IMAGES_ERROR:
      return {
        ...state,
        myPostsImages: {
          ...state.myPostsImages,
          error: reducerUtils.error(action.payload).error,
        },
      };
    // --> FOLLOWING POSTS IMAGES
    case FOLLWING_POSTS_IMAGES:
      return {
        ...state,
        myFollowingPostsImages: {
          ...state.myFollowingPostsImages,
          loading: reducerUtils.loading().loading,
        },
      };
    case FOLLWING_POSTS_IMAGES_SUCCESS:
      return state.myFollowingPostsImages.data
        ? {
            ...state,
            myFollowingPostsImages: {
              ...state.myFollowingPostsImages,
              data: [
                ...state.myFollowingPostsImages.data,
                reducerUtils.success(action.payload).data,
              ],
              loading: reducerUtils.success(action.payload).loading,
            },
          }
        : {
            ...state,
            myFollowingPostsImages: {
              ...state.myFollowingPostsImages,
              data: [reducerUtils.success(action.payload).data],
              loading: reducerUtils.success(action.payload).loading,
            },
          };
    case FOLLWING_POSTS_IMAGES_ERROR:
      return {
        ...state,
        myPostsImages: {
          ...state.myPostsImages,
          error: reducerUtils.error(action.payload).error,
        },
      };
    default:
      return state;
  }
};

export default images;
