import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import user from './user';
import posts from './posts';
import popup from './popup';
import search from './search';
import heart from './heart';
import share from './share';
import direct from './direct';

const rootReducer = combineReducers({
  login,
  signup,
  user,
  posts,
  popup,
  search,
  heart,
  share,
  direct,
});

export default rootReducer;
