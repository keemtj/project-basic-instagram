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

// action creator
export const getRooms = fetchDataThunk(GET_ROOMS, store.getRoomsByUid);
export const getRoom = data => ({ type: GET_ROOM, data });
export const getPartners = datas => ({ type: PARTNERS_DATA, datas });
export const getPartner = data => ({ type: PARTNER_DATA, data });
export const getMessages = fetchDataThunk(
  GET_MESSAGES,
  store.getMessagesByRoomId,
);

// initialState
const initialState = {
  rooms: reducerUtils.initial(),
  room: {},
  partners: [],
  partner: {},
  messages: reducerUtils.initial(),
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
    default:
      return state;
  }
};

export default direct;
