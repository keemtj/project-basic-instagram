import { useDispatch } from 'react-redux';
import { closePopup, openPopup, toastMessage } from '../Modules/popup';

const useToast = () => {
  const dispatch = useDispatch();

  const timer = () => {
    dispatch(closePopup('toast'));
    dispatch(toastMessage(''));
  };

  const toast = message => {
    dispatch(openPopup('toast'));
    dispatch(toastMessage(message));
    setTimeout(timer, 3000);
  };

  return [toast];
};

export default useToast;
