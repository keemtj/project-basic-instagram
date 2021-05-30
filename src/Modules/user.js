// action type
const CURRENT_USER_DATA = 'user/CURRENT_USER_DATA';
const CURRENT_USER_FOLLOW_DATA = 'user/CURRENT_USER_FOLLOW_DATA';
const DATA_CLEAR = 'user/DATA_CLEAR';

// action creator
export const currentUserData = data => ({ type: CURRENT_USER_DATA, data });
export const currentUserFollowData = data => ({
  type: CURRENT_USER_FOLLOW_DATA,
  data,
});
export const userDataClear = () => ({ type: DATA_CLEAR });

// initialStates
const initialState = {
  currentUser: {
    displayName: '',
    email: '',
    phone: '',
    photoURL: '/images/default_profile.png',
    presentation: '',
    uid: '',
    username: '',
  },
  currentUserFollowData: {},
};

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_DATA:
      return {
        ...state,
        currentUser: action.data,
      };
    case CURRENT_USER_FOLLOW_DATA:
      return {
        ...state,
        currentUserFollowData: action.data,
      };
    case DATA_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default user;
