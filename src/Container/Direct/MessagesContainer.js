import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Messages from '../../Component/Direct/Messages';
import { getMessages } from '../../Modules/direct';

const MessagesContainer = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.currentUser);
  const { room, partner } = useSelector(state => state.direct);
  const { data: messages } = useSelector(state => state.direct.messages);

  const { displayName, photoURL } = partner || {
    displayName: '',
    photoURL: '/images/default_profile.png',
  };
  const { id } = room;

  const onClickDetails = () => {
    console.log(`${id}인 messages의 details`);
  };

  useEffect(() => {
    dispatch(getMessages(id));
  }, [id]);
  return (
    <Messages
      uid={uid}
      onClickDetails={onClickDetails}
      displayName={displayName}
      photoURL={photoURL}
      messages={messages}
    />
  );
};

export default MessagesContainer;
