import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import main from './main';
import user from './user';
import post from './post';

const rootReducer = combineReducers({
  login,
  signup,
  main,
  user,
  post,
});

export default rootReducer;
