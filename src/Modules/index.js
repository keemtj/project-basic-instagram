import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import user from './user';
import posts from './posts';
import popup from './popup';
import search from './search';
import saved from './saved';
import heart from './heart';

const rootReducer = combineReducers({
  login,
  signup,
  user,
  posts,
  popup,
  search,
  heart,
  saved,
});

export default rootReducer;
