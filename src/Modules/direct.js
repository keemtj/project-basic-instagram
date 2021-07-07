import { fetchDataThunk, reducerUtils } from '../lib/asyncUtils';
import * as store from '../services/firestore';

// action
const GET_ROOMS = 'direct/GET_ROOMS';
const GET_ROOMS_SUCCESS = 'direct/GET_ROOMS_SUCCESS';
const GET_ROOMS_ERROR = 'direct/GET_ROOMS_ERROR';

const GET_ROOM = 'direct/GET_ROOM';

const PARTNERS_DATA = 'direct/PARTNERS_DATA';

const PARTNER_DATA = 'direct/PARTNER_DATA';

const GET_MESSAGES = 'direct/GET_MESSAGES';
const GET_MESSAGES_SUCCESS = 'direct/GET_MESSAGES_SUCCESS';
const GET_MESSAGES_ERROR = 'direct/GET_MESSAGES_ERROR';

const DIRECT_TEXT = 'direct/DIRECT_TEXT';
const EMOJI_TEXT = 'direct/EMOJI_TEXT';
const CLEAR_DIRECT_TEXT = 'direct/CLEAR_DIRECT_TEXT';

const UPDATE_MESSAGES = 'direct/UPDATE_MESSAGES';

// action creator
export const getRooms = fetchDataThunk(GET_ROOMS, store.getRoomsByUid);
export const getRoom = data => ({ type: GET_ROOM, data });
export const getPartners = datas => ({ type: PARTNERS_DATA, datas });
export const getPartner = data => ({ type: PARTNER_DATA, data });
export const getMessages = fetchDataThunk(
  GET_MESSAGES,
  store.getMessagesByRoomId,
);
export const directText = data => ({ type: DIRECT_TEXT, data });
export const emojiText = emoji => ({ type: EMOJI_TEXT, emoji });
export const clearDirectText = () => ({ type: CLEAR_DIRECT_TEXT });

export const updateMessages = datas => ({ type: UPDATE_MESSAGES, datas });

// initialState
const initialState = {
  rooms: reducerUtils.initial(),
  room: {},
  partners: [],
  partner: {},
  messages: reducerUtils.initial(),
  text: '',
};

// reducer
const direct = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: reducerUtils.loading(),
      };
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: reducerUtils.success(action.payload),
      };
    case GET_ROOMS_ERROR:
      return {
        ...state,
        rooms: reducerUtils.error(action.payload),
      };
    case GET_ROOM:
      return {
        ...state,
        room: action.data,
      };
    case PARTNERS_DATA:
      return {
        ...state,
        partners: action.datas,
      };
    case PARTNER_DATA:
      return {
        ...state,
        partner: action.data,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: reducerUtils.loading(),
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: reducerUtils.success(action.payload),
      };
    case GET_MESSAGES_ERROR:
      return {
        ...state,
        messages: reducerUtils.error(action.payload),
      };
    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: {
          loading: state.messages.loading,
          error: state.messages.error,
          data: action.datas,
        },
      };
    case DIRECT_TEXT:
      return {
        ...state,
        text: action.data,
      };
    case EMOJI_TEXT:
      return {
        ...state,
        text: state.text + action.emoji,
      };
    case CLEAR_DIRECT_TEXT:
      return {
        ...state,
        text: '',
      };
    default:
      return state;
  }
};

export default direct;
