// SAVED(BOOKMARK) module
// action
const BOOKMARKS = 'saved/BOOKMARK';
const ADD_BOOKMAKR = 'saved/ADD_BOOKMARK';
const REMOVE_BOOKMARK = 'saved/REMOVE_BOOKMARK';

// action creator
export const getBookmarks = data => ({ type: BOOKMARKS, data });
export const addBookmarks = id => ({ type: ADD_BOOKMAKR, id });
export const removeBookmarks = id => ({ type: REMOVE_BOOKMARK, id });

// initialState
const initialState = {};

// reducer
const saved = (state = initialState, action) => {
  switch (action.type) {
    case BOOKMARKS:
      return action.data;
    case ADD_BOOKMAKR:
      return {
        ...state,
        bookmarks: state.bookmarks.concat(action.id),
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark !== action.id),
      };
    default:
      return state;
  }
};

export default saved;
