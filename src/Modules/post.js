import * as storage from '../services/firebaseStorage';
import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';

// TODO: action
const GET_POST_IMAGES_URL = 'post/GET_POST_IMAGES_URL';
const GET_POST_IMAGES_URL_SUCCESS = 'post/GET_POST_IMAGES_URL_SUCCESS';
const GET_POST_IMAGES_UR_ERROR = 'post/GET_POST_IMAGES_URL_ERROR';

// TODO: action creator
export const getPostImagesToStorage = fetchDataThunk(
  GET_POST_IMAGES_URL,
  storage.getPostImages,
);

// TODO: initialState
const initialState = [{ id: '', ...reducerUtils.initial() }];

// TODO: reducer
const post = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_IMAGES_URL:
      return [{ id: '', ...reducerUtils.loading() }];
    case GET_POST_IMAGES_URL_SUCCESS:
      return state[0].id === ''
        ? [
            {
              id: reducerUtils.success(action.payload).data.id,
              ...reducerUtils.success(action.payload),
            },
          ]
        : [
            ...state,
            {
              id: reducerUtils.success(action.payload).data.id,
              ...reducerUtils.success(action.payload),
            },
          ];
    case GET_POST_IMAGES_UR_ERROR:
      return [
        ...state,
        {
          id: reducerUtils.error(action.payload).data.id,
          ...reducerUtils.error(action.payload),
        },
      ];
    default:
      return state;
  }
};

export default post;
