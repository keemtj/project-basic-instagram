import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import main from './main';
import user from './user';

const rootReducer = combineReducers({
  login,
  signup,
  main,
  user,
});

export default rootReducer;
