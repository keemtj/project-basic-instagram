import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import user from './user';
import posts from './posts';

const rootReducer = combineReducers({
  login,
  signup,
  user,
  posts,
});

export default rootReducer;
