// TODO: action types
const LOGIN_EMAIL = 'login/LOGIN_EMAIL';
const LOGIN_PASSWORD = 'login/LOGIN_PASSWORD';
const LOGIN_ERROR = 'login/LOGIN_ERROR';

// TODO: action creators
export const addEmail = email => ({ type: LOGIN_EMAIL, email });
export const addPassword = password => ({ type: LOGIN_PASSWORD, password });
export const addError = error => ({ type: LOGIN_ERROR, error });

// TODO: initialState
const initialState = {
  email: '',
  password: '',
  error: {
    code: '',
    message: '',
  },
};

// TODO: reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case LOGIN_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          code: action.error.code,
          message: action.error.message,
        },
      };
    default:
      return state;
  }
};

export default login;
