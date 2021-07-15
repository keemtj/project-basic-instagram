// NOTE action
const OPEN_POPUP = 'popup/OPEN_POPUP';
const CLOSE_POPUP = 'popup/CLOSE_POPUP';

const TOAST_MESSAGE = 'popup/TOAST_MESSAGE';

const ACTIVE_POSTS_DATA = 'popup/ACTIVE_POSTS_DATA';
const ACTIVE_POST_DATA = 'popup/ACTIVE_POST_DATA';
const ACTIVE_POST_ID = 'popup/ACTIVE_POST_ID';
const ACTIVE_POST_USER = 'popup/ACTIVE_POST_USER';
const ACTIVE_INDEX = 'popup/ACTIVE_INDEX';

// NOTE action creator
export const openPopup = name => ({ type: OPEN_POPUP, name });
export const closePopup = name => ({ type: CLOSE_POPUP, name });
export const toastMessage = message => ({ type: TOAST_MESSAGE, message });

export const activePostsData = datas => ({ type: ACTIVE_POSTS_DATA, datas });
export const activePostData = data => ({ type: ACTIVE_POST_DATA, data });
export const activePostIdData = id => ({ type: ACTIVE_POST_ID, id });
export const activePostUserData = data => ({ type: ACTIVE_POST_USER, data });
export const activeIndex = index => ({ type: ACTIVE_INDEX, index });

// NOTE initialState
const initialState = {
  searchPopup: false,
  profilePopup: false,
  newPostModal: false,
  postModal: false,
  postSettingModal: false,
  postHeartCountModal: false,
  profileEditModal: false,
  postSharePopup: false,
  directDetails: false,
  toast: false,
  toastMessage: '',
  activePosts: [], // post modal in profile page
  activePost: {}, // post modal & post setting modal in main page
  activePostId: '', // post id
  activePostUser: {}, // user who posted the post
  activeIndexValue: 0,
};

// NOTE reducer
const popup = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        [action.name]: true,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        [action.name]: false,
      };
    case TOAST_MESSAGE:
      return {
        ...state,
        toastMessage: action.message,
      };
    case ACTIVE_POSTS_DATA:
      return {
        ...state,
        activePosts: action.datas,
      };
    case ACTIVE_POST_DATA:
      return {
        ...state,
        activePost: action.data,
      };
    case ACTIVE_POST_ID:
      return {
        ...state,
        activePostId: action.id,
      };
    case ACTIVE_POST_USER:
      return {
        ...state,
        activePostUser: action.data,
      };
    case ACTIVE_INDEX:
      return {
        ...state,
        activeIndexValue: action.index,
      };
    default:
      return state;
  }
};

export default popup;
