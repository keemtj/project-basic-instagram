import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Messages from '../../Component/Direct/Messages';
import { getMessages, updateMessages } from '../../Modules/direct';
import { closePopup, openPopup } from '../../Modules/popup';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';
import {
  getProfilePosts,
  updateLastDocByProfilePosts,
} from '../../Modules/posts';
import { firestore } from '../../services/firebase';
import { updateMsgs } from '../../services/firestore';

const MessagesContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.currentUser);
  const { directDetails: directDetailsState } = useSelector(
    state => state.popup,
  );
  const { room, partner } = useSelector(state => state.direct);
  const { data: messages } = useSelector(state => state.direct.messages);

  const { displayName, photoURL, uid: partnerUid } = partner || {
    displayName: '',
    photoURL: '/images/default_profile.png',
  };
  const { id } = room;

  const onClickDetails = () => {
    console.log(`${id}인 messages의 details`);
    if (!directDetailsState) {
      dispatch(openPopup('directDetails'));
    } else {
      dispatch(closePopup('directDetails'));
    }
  };

  const onMoveProfilePage = () => {
    dispatch(getProfileUserData(partnerUid));
    dispatch(getProfileUserFollowData(partnerUid));
    dispatch(
      getProfilePosts({
        uid: partnerUid,
        dispatch,
        updateLastDocByProfilePosts,
      }),
    );
    history.push(`/${displayName}`);
  };

  const onRemoveDirect = () => {
    firestore.collection('direct').doc(id).delete();
    dispatch(closePopup('directDetails'));
    history.push('/direct');
  };

  useEffect(() => {
    updateMsgs(dispatch, updateMessages, id);
  }, [id]);

  useEffect(() => {
    dispatch(getMessages(id));
  }, [id]);

  return (
    <Messages
      uid={uid}
      id={id}
      onClickDetails={onClickDetails}
      displayName={displayName}
      photoURL={photoURL}
      messages={messages}
      directDetailsState={directDetailsState}
      onMoveProfilePage={onMoveProfilePage}
      onRemoveDirect={onRemoveDirect}
    />
  );
};

export default MessagesContainer;
