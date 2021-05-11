// --> get user data by Redux-thunk
// NOTE action
const SEARCH_VALUE = 'search/SEARCH_VALUE';
const CLEAR_VALUE = 'search/CLEAR_VALUE';

// NOTE action creator
export const searchValue = value => ({ type: SEARCH_VALUE, value });
export const clearValue = () => ({ type: CLEAR_VALUE });

// NOTE initialState
const initialState = {
  value: '',
};

// NOTE reducer
const popup = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_VALUE:
      return {
        ...state,
        value: action.value,
      };
    case CLEAR_VALUE:
      return {
        ...state,
        value: '',
      };
    default:
      return state;
  }
};

export default popup;
