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

const PostShareModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { postSharePopup: postSharePopupState } = useSelector(
    state => state.popup,
  );
  const { data: searchUsers, loading } = useSelector(
    state => state.share.searchUsers,
  );
  const { usersStack } = useSelector(state => state.share);
  const [toast] = useToast();
  const [value, setValue] = useState('');

  const onChangeSearchInput = ({ target }) => {
    setValue(target.value);
    dispatch(getSearchUsers(target.value));
  };

  const onClickUser = user => {
    if (usersStack.find(stack => stack.uid === user.uid)) {
      dispatch(removeUsersStack(user));
    } else {
      dispatch(addUsersStack(user));
    }
  };

  const onClickRemoveStack = user => {
    dispatch(removeUsersStack(user));
  };

  const onClickSend = () => {
    console.log('send & share');
    dispatch(clearUsersStack());
    dispatch(closePopup('postSharePopup'));
    toast('전송됨');
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

  const tempDmLists = [];

  return (
    <PostSharePortal>
      <StModal>
        <StShareBox ref={modalRef}>
          <StHeader>공유</StHeader>
          <StSearchBox>
            <StLabel htmlFor="to">받는 유저:</StLabel>
            <StInput
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
          {usersStack?.length > 0 && (
            <>
              <StSubTitle>선택한 유저</StSubTitle>
              <StUserStack>
                {usersStack.map((user, index) => {
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
                            {usersStack.find(stack => stack.uid === uid) ? (
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
                <StSubTitle>추천</StSubTitle>
                <StSuggetionUsers>
                  {tempDmLists.length > 0 ? (
                    tempDmLists.map((list, index) => {
                      return (
                        <li key={index}>
                          <div>{list.list}</div>
                        </li>
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
              usersStack={usersStack}
              onClick={usersStack.length > 0 ? onClickSend : undefined}
            >
              <div>게시물 공유하기</div>
              {usersStack.length > 0 && (
                <div>
                  {'('}
                  {usersStack.length}
                  {')'}
                </div>
              )}
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
  background: ${({ theme, usersStack }) =>
    usersStack.length > 0 ? theme.activeBlue : theme.inactiveBlue};
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
