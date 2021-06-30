import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { closePopup } from '../../Modules/popup';
import PostSharePortal from '../../Portals/PostSharePortal';

const PostShareModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { postSharePopup: postSharePopupState } = useSelector(
    state => state.popup,
  );
  const [value, setValue] = useState('');

  const onChangeSearchInput = ({ target }) => {
    setValue(target.value);
  };

  const onClickSend = () => {
    console.log('send & share');
  };

  const onClosePopup = () => {
    dispatch(closePopup('postSharePopup'));
  };

  const onCilckOutside = e => {
    if (
      postSharePopupState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closePopup('postSharePopup'));
    }
  };

  useEffect(() => {
    window.addEventListener('click', onCilckOutside);
    return () => {
      window.removeEventListener('click', onCilckOutside);
    };
  }, []);

  useEffect(() => {
    console.log('get user list by DM');
  }, []);
  const tempDmLists = [];
  const searchDmLists = [];
  return (
    <PostSharePortal>
      <StModal>
        <StShareBox ref={modalRef}>
          <StHeader>공유</StHeader>
          <StSearchBox>
            <StLabel htmlFor="to">받는 사람:</StLabel>
            <StInput
              type="text"
              name="share"
              id="to"
              placeholder="검색..."
              value={value}
              onChange={onChangeSearchInput}
              autoFocus
            />
          </StSearchBox>
          <StSuggestionBox>
            {value.length > 0 ? (
              <StSuggetionUsers>
                {searchDmLists.map((list, index) => {
                  return (
                    <li key={index}>
                      <div>{list.list}</div>
                    </li>
                  );
                })}
              </StSuggetionUsers>
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
            <StSendButton onClick={onClickSend}>보내기</StSendButton>
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
  overflow: hidden;
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
  height: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
`;

const StLabel = styled.label`
  min-width: fit-content;
  font-size: 1.5rem;
  font-weight: 500;
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
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
`;

const StSubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const StSuggetionUsers = styled.ul``;

const StNoSuggetion = styled.div`
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.darkGray};
  font-size: 1.2rem;
`;

const StFooter = styled.footer`
  width: 100%;
  height: 6.5rem;
  padding: 1.5rem;
`;

const StSendButton = styled.button`
  background: ${({ theme }) => theme.inactiveBlue};
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
