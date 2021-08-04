// NOTE action
const OPEN_POPUP = 'popup/OPEN_POPUP';
const CLOSE_POPUP = 'popup/CLOSE_POPUP';

const TOAST_MESSAGE = 'popup/TOAST_MESSAGE';

// NOTE action creator
export const openPopup = name => ({ type: OPEN_POPUP, name });
export const closePopup = name => ({ type: CLOSE_POPUP, name });
export const toastMessage = message => ({ type: TOAST_MESSAGE, message });

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
  postsModal: false,
  bookmarksModal: false,
  heartsModal: false,
  toast: false,
  toastMessage: '',
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
    default:
      return state;
  }
};

export default popup;
