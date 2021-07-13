import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { CheckCircle } from '@styled-icons/bootstrap/CheckCircle';
import { CheckCircleFill } from '@styled-icons/bootstrap/CheckCircleFill';
import { closePopup } from '../../Modules/popup';
import PostSharePortal from '../../Portals/PostSharePortal';
import {
  getSearchUsers,
  addUsersStack,
  removeUsersStack,
  clearUsersStack,
} from '../../Modules/share';
import Loading from '../../Component/Global/Loading';
import ProfileImage from '../Global/ProfileImage';
import useToast from '../../Hooks/useToast';
import { useHistory, useLocation } from 'react-router';
import { firebase, firestore } from '../../services/firebase';
import {
  generatedId,
  getRoomDataAlreadyCreated,
} from '../../services/firestore';
import {
  getPartner,
  getPartners,
  getRoomAlreadyCreated,
} from '../../Modules/direct';

const PostShareModal = () => {
  const his = useHistory();
  const location = useLocation();
  const isDirect = location.pathname.includes('/direct');
  const modalRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.currentUser);
  const currentUser = useSelector(state => state.user.currentUser);
  const { postSharePopup: postSharePopupState, activePostId } = useSelector(
    state => state.popup,
  );
  const { partners } = useSelector(state => state.direct);
  const { data: rooms } = useSelector(state => state.direct.rooms);
  const { data: searchUsers, loading } = useSelector(
    state => state.share.searchUsers,
  );
  const { selectedUsers } = useSelector(state => state.share);
  const [toast] = useToast();
  const [value, setValue] = useState(''); // input text
  const [msg, setMsg] = useState('');

  const onChangeSearchInput = ({ target }) => {
    setValue(target.value);
    dispatch(getSearchUsers(target.value));
  };

  const onChangeMessageInput = ({ target }) => {
    setMsg(target.value);
  };

  const onClickUser = user => {
    if (selectedUsers.find(stack => stack.uid === user.uid)) {
      dispatch(removeUsersStack(user));
    } else {
      dispatch(addUsersStack(user));
    }
    inputRef.current.focus();
  };

  const onClickRemoveStack = user => {
    dispatch(removeUsersStack(user));
  };

  const onCreateDirectRoomAndSharePost = async () => {
    console.log('onCreateDirectRoomAndSharePost');
    const partnersArr = partners.map(partner => partner.uid);
    await selectedUsers.forEach(async user => {
      const { uid: selectedUid } = user;
      const isPartner = partnersArr.includes(selectedUid);
      if (!isPartner) {
        console.log('create direct room with new partner and share post');
        const newRoomId = generatedId('direct');
        const systemMsgId = generatedId('message');
        const msgId = generatedId('message');
        const sharePostId = generatedId('message');
        const timeStamp = Date.now();
        console.log('new direct room, system');
        await firestore
          .collection('direct')
          .doc(newRoomId)
          .set({
            from: uid,
            id: newRoomId,
            participant: firebase.firestore.FieldValue.arrayUnion(
              uid,
              selectedUid,
            ),
            msg: '새로운 다이렉트 메시지',
            timeStamp,
          });
        await firestore
          .collection('direct')
          .doc(newRoomId)
          .collection('messages')
          .doc(systemMsgId)
          .set({
            id: systemMsgId,
            uid: 'system',
            msg: '다이렉트 메시지가 생성되었습니다.',
            timeStamp,
          });
        if (msg.length > 0) {
          console.log('new direct room, system + share post + msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore
              .collection('direct')
              .doc(newRoomId)
              .update({
                msg: `https://localhost:3000/p/${activePostId}`,
                timeStamp,
              });
            await firestore
              .collection('direct')
              .doc(newRoomId)
              .collection('messages')
              .doc(sharePostId)
              .set({
                id: sharePostId,
                msg: `https://localhost:3000/p/${activePostId}`,
                uid,
                timeStamp,
              });
          }, 1000);
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore.collection('direct').doc(newRoomId).update({
              msg,
              timeStamp,
            });
            await firestore
              .collection('direct')
              .doc(newRoomId)
              .collection('messages')
              .doc(msgId)
              .set({
                id: msgId,
                msg,
                uid,
                timeStamp,
              });
          }, 1000);
        } else {
          console.log('new direct room, system + share post - msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore
              .collection('direct')
              .doc(newRoomId)
              .update({
                msg: `https://localhost:3000/p/${activePostId}`,
                timeStamp,
              });
            await firestore
              .collection('direct')
              .doc(newRoomId)
              .collection('messages')
              .doc(sharePostId)
              .set({
                id: sharePostId,
                msg: `https://localhost:3000/p/${activePostId}`,
                uid,
                timeStamp,
              });
          }, 1000);
        }
      } else if (selectedUid === uid) {
        console.log('have my direct room');
        const roomId = rooms.find(room => room.participant.length === 1).id;
        const msgId = generatedId('message');
        const sharePostId = generatedId('message');
        if (msg.length > 0) {
          console.log('share post + msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore.collection('direct').doc(roomId).update({
              msg,
              timeStamp,
            });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(msgId)
              .set({
                id: msgId,
                msg,
                uid,
                timeStamp,
              });
          }, 1000);
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore
              .collection('direct')
              .doc(roomId)
              .update({
                msg: `https://localhost:3000/p/${activePostId}`,
                timeStamp,
              });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(sharePostId)
              .set({
                id: sharePostId,
                msg: `https://localhost:3000/p/${activePostId}`,
                uid,
                timeStamp,
              });
          }, 1000);
        } else {
          console.log('share post - msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore
              .collection('direct')
              .doc(roomId)
              .update({
                msg: `https://localhost:3000/p/${activePostId}`,
                timeStamp,
              });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(sharePostId)
              .set({
                id: sharePostId,
                msg: `https://localhost:3000/p/${activePostId}`,
                uid,
                timeStamp,
              });
          }, 1000);
        }
      } else {
        console.log('has room already created and not my direct room');
        const roomId = rooms.find(room =>
          room.participant.includes(selectedUid),
        ).id;
        const msgId = generatedId('message');
        const sharePostId = generatedId('message');
        if (msg.length > 0) {
          console.log('share post + msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore.collection('direct').doc(roomId).update({
              msg,
              timeStamp,
            });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(msgId)
              .set({
                id: msgId,
                msg,
                uid,
                timeStamp,
              });
          }, 1000);
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore
              .collection('direct')
              .doc(roomId)
              .update({
                msg: `https://localhost:3000/p/${activePostId}`,
                timeStamp,
              });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(sharePostId)
              .set({
                id: sharePostId,
                msg: `https://localhost:3000/p/${activePostId}`,
                uid,
                timeStamp,
              });
          }, 1000);
        } else {
          console.log('share post - msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore
              .collection('direct')
              .doc(roomId)
              .update({
                msg: `https://localhost:3000/p/${activePostId}`,
                timeStamp,
              });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(sharePostId)
              .set({
                id: sharePostId,
                msg: `https://localhost:3000/p/${activePostId}`,
                uid,
                timeStamp,
              });
          }, 1000);
        }
      }
    });
    dispatch(clearUsersStack());
    dispatch(closePopup('postSharePopup'));
    toast('전송됨');
  };

  const onCreateDirectRoom = async () => {
    console.log('onCreateDirectRoom');
    const partnersArr = partners.map(partner => partner.uid);
    await selectedUsers.forEach(async user => {
      const { uid: selectedUid } = user;
      const isPartner = partnersArr.includes(selectedUid);
      if (!isPartner) {
        console.log('create direct room with new partner');
        console.log('new direct room, system');
        const newRoomId = generatedId('direct');
        const systemMsgId = generatedId('message');
        const msgId = generatedId('message');
        const timeStamp = Date.now();
        await firestore
          .collection('direct')
          .doc(newRoomId)
          .set({
            from: uid,
            id: newRoomId,
            participant: firebase.firestore.FieldValue.arrayUnion(
              uid,
              selectedUid,
            ),
            msg: '새로운 다이렉트 메시지',
            timeStamp,
          });
        await firestore
          .collection('direct')
          .doc(newRoomId)
          .collection('messages')
          .doc(systemMsgId)
          .set({
            id: systemMsgId,
            uid: 'system',
            msg: '다이렉트 메시지가 생성되었습니다.',
            timeStamp,
          });
        if (msg.length > 0) {
          console.log('new direct room, system + msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore.collection('direct').doc(newRoomId).update({
              msg,
              timeStamp,
            });
            await firestore
              .collection('direct')
              .doc(newRoomId)
              .collection('messages')
              .doc(msgId)
              .set({
                id: msgId,
                msg,
                uid,
                timeStamp,
              });
          }, 1000);
        }
      } else if (selectedUid === uid) {
        console.log('have my direct room');
        const roomAlreadyCreated = await getRoomDataAlreadyCreated(
          uid,
          selectedUid,
        );
        const partner = partners.find(partner => partner.uid === selectedUid);
        dispatch(getRoomAlreadyCreated(roomAlreadyCreated));
        dispatch(getPartner(partner));
        const roomId = rooms.find(room => room.participant.length === 1).id;
        const msgId = generatedId('message');
        if (msg.length > 0) {
          console.log('+ msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore.collection('direct').doc(roomId).update({
              msg,
              timeStamp,
            });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(msgId)
              .set({
                id: msgId,
                msg,
                uid,
                timeStamp,
              });
          }, 1000);
        }
      } else {
        console.log('has room already created and not my direct room');
        const roomAlreadyCreated = await getRoomDataAlreadyCreated(
          uid,
          selectedUid,
        );
        const partner = partners.find(partner => partner.uid === selectedUid);
        dispatch(getRoomAlreadyCreated(roomAlreadyCreated));
        dispatch(getPartner(partner));
        const roomId = rooms.find(room =>
          room.participant.includes(selectedUid),
        ).id;
        const msgId = generatedId('message');
        if (msg.length > 0) {
          console.log('+ msg');
          setTimeout(async () => {
            const timeStamp = Date.now();
            await firestore.collection('direct').doc(roomId).update({
              msg,
              timeStamp,
            });
            await firestore
              .collection('direct')
              .doc(roomId)
              .collection('messages')
              .doc(msgId)
              .set({
                id: msgId,
                msg,
                uid,
                timeStamp,
              });
          }, 1000);
        }
      }
    });
    dispatch(clearUsersStack());
    dispatch(closePopup('postSharePopup'));
    toast('전송됨');
    his.push('/direct');
  };

  const onClosePopup = () => {
    dispatch(closePopup('postSharePopup'));
    dispatch(clearUsersStack());
  };

  const onCilckOutside = e => {
    if (
      postSharePopupState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closePopup('postSharePopup'));
      dispatch(clearUsersStack());
    }
  };

  useEffect(() => {
    window.addEventListener('click', onCilckOutside, { capture: true });
    return () => {
      window.removeEventListener('click', onCilckOutside, { capture: true });
    };
  }, []);

  useEffect(() => {
    inputRef.current.focus();
    const URL = document.URL;
    if (document.URL.includes('/direct')) {
      history.pushState('', '', '/direct/new');
    }
    return () => history.pushState('', '', URL);
  }, []);

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

  return (
    <PostSharePortal>
      <StModal>
        <StShareBox ref={modalRef}>
          <StHeader>{isDirect ? '새로운 메시지' : '공유'}</StHeader>
          <StInputBox>
            <StLabel htmlFor="to">받는 유저:</StLabel>
            <StInput
              ref={inputRef}
              type="text"
              name="share"
              id="to"
              placeholder="검색..."
              value={value}
              onChange={onChangeSearchInput}
              autoFocus
              autoComplete="off"
            />
          </StInputBox>
          {selectedUsers?.length > 0 && (
            <>
              <StSubTitle>선택한 유저</StSubTitle>
              <StUserStack>
                {selectedUsers.map((user, index) => {
                  return (
                    <StStack key={index}>
                      <StDisplayName>{user.displayName}</StDisplayName>
                      <StRemoveStackButton
                        onClick={() => onClickRemoveStack(user)}
                      >
                        <CloseOutline />
                      </StRemoveStackButton>
                    </StStack>
                  );
                })}
              </StUserStack>
            </>
          )}
          <StSuggestionBox>
            {value.length > 0 ? (
              loading ? (
                <Loading isLoading={loading} />
              ) : (
                <StSuggetionUsers>
                  {!searchUsers || searchUsers.length > 0 ? (
                    searchUsers?.map((user, index) => {
                      const { photoURL, displayName, uid } = user;
                      return (
                        <StUser key={index} onClick={() => onClickUser(user)}>
                          <ProfileImage
                            src={photoURL}
                            alt={displayName}
                            width={4}
                            height={4}
                            marginLeft={1}
                            username={displayName}
                            fontSize={1.4}
                          />
                          <StCheckBox>
                            {selectedUsers.find(stack => stack.uid === uid) ? (
                              <StCheckFillIcon />
                            ) : (
                              <StCheckIcon />
                            )}
                          </StCheckBox>
                        </StUser>
                      );
                    })
                  ) : (
                    <StNoSuggetion>계정을 찾을 수 없습니다.</StNoSuggetion>
                  )}
                </StSuggetionUsers>
              )
            ) : (
              <>
                <StSubTitle>추천된 유저</StSubTitle>
                <StSuggetionUsers>
                  {partners.length > 0 ? (
                    partners?.map((user, index) => {
                      const { photoURL, displayName, uid } = user;
                      return (
                        <StUser key={index} onClick={() => onClickUser(user)}>
                          <ProfileImage
                            src={photoURL}
                            alt={displayName}
                            width={4}
                            height={4}
                            marginLeft={1}
                            username={displayName}
                            fontSize={1.4}
                          />
                          <StCheckBox>
                            {selectedUsers.find(stack => stack.uid === uid) ? (
                              <StCheckFillIcon />
                            ) : (
                              <StCheckIcon />
                            )}
                          </StCheckBox>
                        </StUser>
                      );
                    })
                  ) : (
                    <StNoSuggetion>계정을 찾을 수 없습니다.</StNoSuggetion>
                  )}
                </StSuggetionUsers>
              </>
            )}
          </StSuggestionBox>
          <StMessageInput
            type="text"
            name="message"
            id="message"
            placeholder="메시지 작성..."
            value={msg}
            onChange={onChangeMessageInput}
            autoFocus
            autoComplete="off"
            selectedUsers={selectedUsers}
          />
          <StFooter>
            <StSendButton
              selectedUsers={selectedUsers}
              onClick={
                selectedUsers.length > 0
                  ? isDirect
                    ? onCreateDirectRoom
                    : onCreateDirectRoomAndSharePost
                  : undefined
              }
            >
              <div>
                {isDirect ? '다이렉트 메시지 생성하기' : '공유하기'}
                {selectedUsers.length > 0 && (
                  <>
                    <span> (</span>
                    <span>{selectedUsers.length}</span>
                    <span>)</span>
                  </>
                )}
              </div>
            </StSendButton>
          </StFooter>
          <StCloseButton onClick={onClosePopup}>
            <StIcon />
          </StCloseButton>
        </StShareBox>
      </StModal>
    </PostSharePortal>
  );
};

const StModal = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > div + div {
    margin-top: 0.8rem;
  }
  overflow: hidden;
`;

const StShareBox = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};
  border-radius: 10px;
  width: 55rem;
  height: auto;
  max-height: 60rem;
`;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  font-size: 1.8rem;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
`;

const StInputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 1.5rem;
  min-height: 5rem;
  height: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
`;

const StLabel = styled.label`
  min-width: fit-content;
  padding-right: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const StInput = styled.input`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`;

const StMessageInput = styled.input`
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  width: 100%;
  height: fit-content;
  min-height: 5rem;
  border: none;
  outline: none;
`;

const StUserStack = styled.ul`
  display: flex;
  flex-flow: row wrap;
  padding: 0.5rem 1.5rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
  max-height: 8rem;
  overflow: scroll;
`;

const StStack = styled.li`
  display: flex;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.inactiveBlue};
  color: ${({ theme }) => theme.activeBlue};
  font-weight: 500;
`;

const StDisplayName = styled.div`
  padding: 0rem 0.5rem;
  font-size: 1.4rem;
`;

const StRemoveStackButton = styled.button`
  width: 1.5rem;
  color: ${({ theme }) => theme.activeBlue};
  cursor: pointer;
`;

const StSuggestionBox = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
`;

const StSubTitle = styled.div`
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const StSuggetionUsers = styled.ul`
  width: 100%;
  max-height: 32rem;
  overflow: scroll;
`;

const StUser = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  width: 100%;
  &:hover {
    background: ${({ theme }) => theme.gray5};
    cursor: pointer;
  }
`;

const StCheckBox = styled.div`
  width: 2rem;
`;

const StCheckIcon = styled(CheckCircle)`
  color: ${({ theme }) => theme.darkGray};
`;

const StCheckFillIcon = styled(CheckCircleFill)`
  color: ${({ theme }) => theme.activeBlue};
`;

const StNoSuggetion = styled.div`
  padding: 1.5rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.2rem;
`;

const StFooter = styled.footer`
  width: 100%;
  height: 6.5rem;
  padding: 1.5rem;
`;

const StSendButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: ${({ theme, selectedUsers }) =>
    selectedUsers.length > 0 ? theme.activeBlue : theme.inactiveBlue};
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
`;

const StCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;

const StIcon = styled(CloseOutline)`
  width: 2.8rem;
`;

export default PostShareModal;
