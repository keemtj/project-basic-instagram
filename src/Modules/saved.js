// SAVED(BOOKMARK) module
// action
const GET_BOOKMARKS = 'saved/GET_BOOKMARKS';
// const ADD_BOOKMAKR = 'saved/ADD_BOOKMARK';
// const REMOVE_BOOKMARK = 'saved/REMOVE_BOOKMARK';

// action creator
export const getBookmarks = data => ({ type: GET_BOOKMARKS, data });
// export const addBookmark = (uid, id) => ({ type: ADD_BOOKMAKR, uid, id });
// export const removeBookmark = (uid, id) => ({ type: REMOVE_BOOKMARK, uid, id });

// initialState
const initialState = {
  bookmarks: [],
};

// reducer
const saved = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKMARKS:
      return action.data;
    // case ADD_BOOKMAKR:
    //   return {
    //     ...state,
    //     bookmarks: [...state.bookmarks, { uid: action.uid, id: action.id }],
    //   };
    // case REMOVE_BOOKMARK:
    //   return {
    //     ...state,
    //     bookmarks: state.bookmarks.filter(
    //       bookmark => bookmark.id !== action.id,
    //     ),
    //   };
    default:
      return state;
  }
};

export default saved;
