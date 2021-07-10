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
import { useLocation } from 'react-router';
import { firebase, firestore } from '../../services/firebase';
import {
  generatedId,
  getRoomDataAlreadyCreated,
} from '../../services/firestore';
import { getPartner, getRoomAlreadyCreated } from '../../Modules/direct';

const PostShareModal = () => {
  const location = useLocation();
  const isDirect = location.pathname.includes('/direct');
  const modalRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.currentUser);
  const { postSharePopup: postSharePopupState, activePostId } = useSelector(
    state => state.popup,
  );
  const { partners } = useSelector(state => state.direct);
  const { data: searchUsers, loading } = useSelector(
    state => state.share.searchUsers,
  );
  const { selectedUsers } = useSelector(state => state.share);
  const [toast] = useToast();
  const [value, setValue] = useState(''); // input text

  const onChangeSearchInput = ({ target }) => {
    setValue(target.value);
    dispatch(getSearchUsers(target.value));
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
    // 1. direct방 생성
    // 2. post 링크 공유
    console.log(
      `Send "http://localhost:3000/p/$activePostId${activePostId}" post link to user`,
    );
    const timeStamp = Date.now();
    const partnersArr = partners.map(partner => partner.uid);
    await selectedUsers.forEach(async user => {
      const directId = generatedId('direct');
      const { uid: selectedUid, displayName } = user;
      const isPartner = partnersArr.includes(selectedUid);
      if (!isPartner) {
        console.log(`${displayName}님과의 direct방이 생성됨`);
        await firestore
          .collection('direct')
          .doc(directId)
          .set({
            id: directId,
            participant: firebase.firestore.FieldValue.arrayUnion(
              uid,
              selectedUid,
            ),
            timeStamp,
            msg: `http://localhost:3000/p/${activePostId}`,
          });
      } else if (selectedUid === uid) {
        console.log('내 direct방이 생성됨!');
      } else {
        console.log('이미 direct방이 존재');
      }
    });
    dispatch(clearUsersStack());
    dispatch(closePopup('postSharePopup'));
    toast('게시물 전송됨');
  };

  const onCreateDirectRoom = async () => {
    console.log('onCreateDirectRoom');
    const timeStamp = Date.now();
    const partnersArr = partners.map(partner => partner.uid);
    await selectedUsers.forEach(async user => {
      const directId = generatedId('direct');
      const { uid: selectedUid } = user;
      const isPartner = partnersArr.includes(selectedUid);
      if (!isPartner) {
        console.log('create direct room with new partner');
        await firestore
          .collection('direct')
          .doc(directId)
          .set({
            from: uid,
            id: directId,
            participant: firebase.firestore.FieldValue.arrayUnion(
              uid,
              selectedUid,
            ),
            timeStamp,
          });
        toast('전송됨');
      } else if (selectedUid === uid) {
        console.log('my direct room');
        const roomAlreadyCreated = await getRoomDataAlreadyCreated(
          uid,
          selectedUid,
        );
        const partner = partners.find(partner => partner.uid === selectedUid);
        dispatch(getRoomAlreadyCreated(roomAlreadyCreated));
        dispatch(getPartner(partner));
      } else {
        console.log('has room already created');
        const roomAlreadyCreated = await getRoomDataAlreadyCreated(
          uid,
          selectedUid,
        );
        const partner = partners.find(partner => partner.uid === selectedUid);
        dispatch(getRoomAlreadyCreated(roomAlreadyCreated));
        dispatch(getPartner(partner));
      }
    });
    dispatch(clearUsersStack());
    dispatch(closePopup('postSharePopup'));
    toast('새로운 Direct가 생성되었습니다');
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
    const URL = document.URL;
    if (document.URL.includes('/direct')) {
      history.pushState('', '', '/direct/new');
    }
    return () => history.pushState('', '', URL);
  }, []);

  return (
    <PostSharePortal>
      <StModal>
        <StShareBox ref={modalRef}>
          <StHeader>{isDirect ? '새로운 메시지' : '공유'}</StHeader>
          <StSearchBox>
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
          </StSearchBox>
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
          <StFooter>
            <StSendButton
              selectedUsers={selectedUsers}
              onClick={
                selectedUsers.length > 0
                  ? document.URL.includes('/direct')
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

const StSearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 1.5rem;
  min-height: 5rem;
  height: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
`;

const StLabel = styled.label`
  min-width: fit-content;
  font-size: 1.5rem;
  font-weight: 500;
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

const StInput = styled.input`
  flex-grow: 1;
  padding-left: 1rem;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
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
