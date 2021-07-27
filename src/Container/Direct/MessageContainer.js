import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Message from '../../Component/Direct/Message';
import { firestore } from '../../services/firebase';

const MessageContainer = ({
  message,
  uid,
  photoURL,
  latestMessageId,
  secondMessageId,
  secondMessage,
  secondMessageTimeStamp,
}) => {
  const { msg, timeStamp, uid: msgUid, id: msgId } = message;
  const { room } = useSelector(state => state.direct);
  const { id: roomId } = room;
  const [hover, setHover] = useState(false);
  const isLatestMessageId = latestMessageId === msgId;

  const onShow = () => setHover(true);

  const onHide = () => setHover(false);

  const onRemoveMessage = async () => {
    await firestore
      .collection('direct')
      .doc(roomId)
      .collection('messages')
      .doc(msgId)
      .delete();
    if (isLatestMessageId) {
      await firestore.collection('direct').doc(roomId).update({
        msg: secondMessage,
        mgsId: secondMessageId,
        timeStamp: secondMessageTimeStamp,
      });
    }
  };

  // Legacy
  // const onCopyMessage = msg => {
  //   const tempEl = document.createElement('textarea');
  //   document.body.appendChild(tempEl);
  //   tempEl.value = msg;
  //   tempEl.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(tempEl);
  // };

  // Clipboard API
  const onCopyMessage = msg => {
    /**
     * writeText('copy text')
     * readText().then(text => console.log(text)) // 'copy text'
     */
    if (!msg) return;
    navigator.clipboard.writeText(msg).then(() => {
      navigator.clipboard.readText().then(text => console.log(text));
    });
  };

  return (
    <Message
      uid={uid}
      photoURL={photoURL}
      msg={msg}
      timeStamp={timeStamp}
      msgUid={msgUid}
      hover={hover}
      onShow={onShow}
      onHide={onHide}
      onRemoveMessage={onRemoveMessage}
      onCopyMessage={onCopyMessage}
    />
  );
};

export default MessageContainer;
