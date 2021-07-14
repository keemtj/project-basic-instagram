import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Room from '../../Component/Direct/Room';
import { getPartner, getRoom } from '../../Modules/direct';
import { closePopup } from '../../Modules/popup';

const RoomContainer = ({ room, partner }) => {
  const dispatch = useDispatch();
  const { directDetails: directDetailsState } = useSelector(
    state => state.popup,
  );
  const { id, timeStamp, msg } = room;
  const { displayName, photoURL } = partner || {
    displayName: '',
    photoURL: '/images/default_profile.png',
  };

  const onClickRoom = () => {
    dispatch(getPartner(partner));
    dispatch(getRoom(room));
    if (directDetailsState) {
      dispatch(closePopup('directDetails'));
    }
  };

  return (
    <Room
      onClickRoom={onClickRoom}
      id={id}
      timeStamp={timeStamp}
      msg={msg}
      displayName={displayName}
      photoURL={photoURL}
    />
  );
};

export default RoomContainer;
