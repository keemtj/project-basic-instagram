import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Direct from '../../Component/Direct/Direct';
import { getPartners, getRooms, updateRooms } from '../../Modules/direct';
import { closePopup, openPopup } from '../../Modules/popup';
import { firestore } from '../../services/firebase';
import { updateDirectRooms } from '../../services/firestore';

const DirectContainer = () => {
  const dispatch = useDispatch();
  const { displayName, uid } = useSelector(state => state.user.currentUser);
  const currentUser = useSelector(state => state.user.currentUser);
  const { postSharePopup: postSharePopupState } = useSelector(
    state => state.popup,
  );
  const { data: rooms } = useSelector(state => state.direct.rooms);
  const { partners } = useSelector(state => state.direct);

  const onClickNewDirect = () => {
    dispatch(openPopup('postSharePopup'));
  };

  useEffect(() => {
    updateDirectRooms(dispatch, updateRooms, uid);
  }, [uid]);

  useEffect(() => {
    dispatch(getRooms(uid));
  }, [uid]);

  useEffect(async () => {
    if (!rooms) return;
    const arr = rooms.map(async room => {
      const isMe = room.participant.length === 1 && room.participant[0] === uid;
      if (isMe) {
        return { ...currentUser, timeStamp: room.timeStamp };
      }
      const partner = room.participant.find(partUid => partUid !== uid);
      const response = await firestore.collection('users').doc(partner).get();
      const data = response.data();
      return { ...data, timeStamp: room.timeStamp };
    });
    // eslint-disable-next-line no-undef
    const promiseAll = await Promise.all(arr);
    dispatch(getPartners(promiseAll));
  }, [rooms]);

  useEffect(() => {
    return () => dispatch(closePopup('directDetails'));
  }, []);

  useEffect(() => {
    document.body.style.overflow = postSharePopupState ? 'hidden' : 'auto';
  }, [postSharePopupState]);

  useEffect(() => {
    document.title = '받은 메시지함 • Direct';
  }, []);

  return (
    <Direct
      uid={uid}
      displayName={displayName}
      onClickNewDirect={onClickNewDirect}
      rooms={rooms}
      partners={partners}
    />
  );
};

export default DirectContainer;

/**
 * Direct
 * 1. postShareModal -> newDirectModal로 변경하기
 * 2. rooms = collection('direct').where().get()
 */
