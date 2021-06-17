import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loginState } from '../Modules/login';
import { closePopup } from '../Modules/popup';
import { postDataClear } from '../Modules/posts';
import { searchDataClear } from '../Modules/search';
import { userDataClear } from '../Modules/user';
import { signOut } from '../services/firebaseAuth';

const useSignOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logOut = popupName => {
    dispatch(closePopup(popupName)); // closePopup
    dispatch(postDataClear());
    dispatch(userDataClear()); // user data clear
    dispatch(searchDataClear()); // search data clear
    dispatch(loginState(false));
    signOut();
    localStorage.removeItem('recent');
    history.push('/login');
    console.log('sign out');
  };

  return [logOut];
};

export default useSignOut;
