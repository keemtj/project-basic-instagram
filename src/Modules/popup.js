// NOTE action
const OPEN_POPUP = 'popup/OPEN_POPUP';
const CLOSE_POPUP = 'popup/CLOSE_POPUP';
const MODAL_ENTRY_PATH = 'popup/MODAL_ENTRY_PATH';
const ACTIVE_PATH = 'popup/ACTIVE_PATH';

// NOTE action creator
export const openPopup = name => ({ type: OPEN_POPUP, name });
export const closePopup = name => ({ type: CLOSE_POPUP, name });
export const modalEntryPath = path => ({ type: MODAL_ENTRY_PATH, path });
export const activePath = path => ({ type: ACTIVE_PATH, path });

// NOTE initialState
const initialState = {
  searchPopup: false,
  profilePopup: false,
  newPostModal: false,
  postModal: false,
  postSettingModal: false,
  modalEntryPath: '/',
  active: '/',
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
    case MODAL_ENTRY_PATH:
      return {
        ...state,
        modalEntryPath: action.path,
      };
    case ACTIVE_PATH:
      return {
        ...state,
        active: action.path,
      };
    default:
      return state;
  }
};

export default popup;
