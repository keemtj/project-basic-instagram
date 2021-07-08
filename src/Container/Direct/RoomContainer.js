import React from 'react';
import { useDispatch } from 'react-redux';
import Room from '../../Component/Direct/Room';
import { getPartner, getRoom } from '../../Modules/direct';

const RoomContainer = ({ room, partner }) => {
  const dispatch = useDispatch();
  const { id, timeStamp, msg } = room;
  const { displayName, photoURL } = partner || {
    displayName: '',
    photoURL: '/images/default_profile.png',
  };

  const onClickRoom = () => {
    dispatch(getPartner(partner));
    dispatch(getRoom(room));
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
