// NOTE action
const OPEN_POPUP = 'popup/OPEN_POPUP';
const CLOSE_POPUP = 'popup/CLOSE_POPUP';

// NOTE action creator
export const openPopup = name => ({ type: OPEN_POPUP, name });
export const closePopup = name => ({ type: CLOSE_POPUP, name });

// NOTE initialState
const initialState = {
  searchPopup: false,
  profilePopup: false,
  newPostPopup: false,
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
    default:
      return state;
  }
};

export default popup;
