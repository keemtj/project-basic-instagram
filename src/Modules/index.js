import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import user from './user';
import posts from './posts';
import images from './images';

const rootReducer = combineReducers({
  login,
  signup,
  user,
  posts,
  images,
});

export default rootReducer;
