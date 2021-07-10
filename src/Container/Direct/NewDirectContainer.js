import React from 'react';
import { useDispatch } from 'react-redux';
import NewDirect from '../../Component/Direct/NewDirect';
import { openPopup } from '../../Modules/popup';

const NewDirectContainer = () => {
  const dispatch = useDispatch();

  const onClickNewDirect = () => {
    dispatch(openPopup('postSharePopup'));
  };

  return <NewDirect onClickNewDirect={onClickNewDirect} />;
};

export default NewDirectContainer;
