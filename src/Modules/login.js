// TODO: action types
const LOGIN_FORM = 'login/LOGIN_FORM';
const LOGIN_ERROR = 'login/LOGIN_ERROR';
const RESET_LOGIN_FORM = 'login/RESET_LOGIN_FORM';

const LOGOUT = 'logout/LOGOUT';

// TODO: action creators
export const addForm = form => ({ type: LOGIN_FORM, form });
export const addError = error => ({ type: LOGIN_ERROR, error });
export const resetForm = () => ({ type: RESET_LOGIN_FORM });

export const logout = () => ({ type: LOGOUT });

// TODO: initialState
const initialState = {
  isSignIn: false,
  form: {
    email: '',
    password: '',
  },
  error: {
    code: '',
    message: '',
  },
};

// TODO: reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.form.name]: action.form.value,
        },
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
    case RESET_LOGIN_FORM:
      return {
        ...state,
        form: {
          email: '',
          password: '',
        },
      };
    case LOGOUT:
      return {
        ...state,
        isSignin: false,
      };
    default:
      return state;
  }
};

export default login;
