import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import user from './user';
import posts from './posts';
import popup from './popup';

const rootReducer = combineReducers({
  login,
  signup,
  user,
  posts,
  popup,
});

export default rootReducer;
