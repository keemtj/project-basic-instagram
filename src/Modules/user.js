// TODO: action type
const CURRENT_USER = 'user/CURRENT_USER';

// TODO: action creator
export const currentUser = userData => ({ type: CURRENT_USER, userData });

// TODO: initialState
const initialState = {
  displayName: '',
  email: '',
  followers: [],
  following: [],
  uid: '',
  username: '',
  photoURL: '/images/default_profile.png',
};

// TODO: reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        displayName: action.userData.displayName,
        email: action.userData.email,
        followers: [...action.userData.followers],
        following: [...action.userData.following],
        uid: action.userData.uid,
        username: action.userData.username,
      };
    default:
      return state;
  }
};

export default user;
