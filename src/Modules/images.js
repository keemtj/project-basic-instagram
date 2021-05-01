import * as storage from '../services/firebaseStorage';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// TODO: action type
const MY_POSTS_IMAGES = 'image/MY_POSTS_IMAGES';
const MY_POSTS_IMAGES_SUCCESS = 'image/MY_POSTS_IMAGES_SUCCESS';
const MY_POSTS_IMAGES_ERROR = 'image/MY_POSTS_IMAGES_ERROR';

// TODO: action creator
// fetchDataThunk
export const getPostImagesURL = fetchDataThunk(
  MY_POSTS_IMAGES,
  storage.getPostImagesUrlFromStorage,
);

// TODO: initialState
const initialState = reducerUtils.initial();

// TODO: reducer

const images = (state = initialState, action) => {
  switch (action.type) {
    case MY_POSTS_IMAGES:
      return {
        ...state,
        loading: reducerUtils.loading().loading,
      };
    case MY_POSTS_IMAGES_SUCCESS:
      return state.data
        ? {
            ...state,
            data: [...state.data, reducerUtils.success(action.payload).data],
            loading: reducerUtils.success(action.payload).loading,
          }
        : {
            ...state,
            data: [reducerUtils.success(action.payload).data],
            loading: reducerUtils.success(action.payload).loading,
          };
    case MY_POSTS_IMAGES_ERROR:
      return {
        ...state,
        error: reducerUtils.error(action.payload).error,
      };
    default:
      return state;
  }
};

export default images;
