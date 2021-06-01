// HEART module
// action
const GET_HEARTS = 'saved/GET_HEARTS';

// action creator
export const getHearts = data => ({ type: GET_HEARTS, data });

// initialState
const initialState = {
  hearts: [],
};

// reducer
const saved = (state = initialState, action) => {
  switch (action.type) {
    case GET_HEARTS:
      return action.data;
    default:
      return state;
  }
};

export default saved;
