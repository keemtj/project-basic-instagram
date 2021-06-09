import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { activePostData, closePopup } from '../../Modules/popup';
import { removePost } from '../../Modules/posts';
import PostSettingPortal from '../../PostSettingPortal';
import { removeImagesByPostData } from '../../services/firebaseStorage';
import { removePostData, updatePostsData } from '../../services/firestore';

const PostSettingModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { postSettingModal: postSettingModalState } = useSelector(
    state => state.popup,
  );
  const { uid: currentUserUid } = useSelector(state => state.user.currentUser);
  const { uid, id, imagesArray } = useSelector(
    state => state.popup.activePostData,
  );

  // TODO: toast Popup 만들기
  const onRemovePost = async () => {
    dispatch(closePopup('postSettingModal'));
    await removePostData(uid, id);
    await removeImagesByPostData(imagesArray, uid, id);
    await updatePostsData(dispatch, removePost);
  };

  const onCilckOutside = e => {
    if (
      postSettingModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closePopup('postSettingModal'));
      dispatch(activePostData({}));
    }
  };

  useEffect(() => {
    window.addEventListener('click', onCilckOutside);
    return () => {
      window.removeEventListener('click', onCilckOutside);
    };
  }, []);

  return (
    <PostSettingPortal>
      <StModal>
        <StSettingBox ref={modalRef}>
          <ul>
            {currentUserUid === uid && (
              <StButtonList>
                <StButton name="remove" onClick={onRemovePost}>
                  삭제
                </StButton>
              </StButtonList>
            )}
            {currentUserUid !== uid && (
              <StButtonList>
                <StButton name="unfollow">팔로우 취소</StButton>
              </StButtonList>
            )}
            <StButtonList>
              <StButton>저장</StButton>
            </StButtonList>
            {currentUserUid === uid && (
              <StButtonList>
                <StButton>좋아요 수 숨기기</StButton>
              </StButtonList>
            )}
            {currentUserUid === uid && (
              <StButtonList>
                <StButton>댓글 기능 해제</StButton>
              </StButtonList>
            )}
            <StButtonList>
              <StButton>링크 복사</StButton>
            </StButtonList>
            <StButtonList>
              <StButton>게시물로 이동</StButton>
            </StButtonList>
          </ul>
        </StSettingBox>
        <StSettingBox>
          <ul>
            <StButtonList>
              <StButton
                name="cancel"
                onClick={() => dispatch(closePopup('postSettingModal'))}
              >
                취소
              </StButton>
            </StButtonList>
          </ul>
        </StSettingBox>
      </StModal>
    </PostSettingPortal>
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

const StSettingBox = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};
  border-radius: 10px;
  width: 40rem;
  height: auto;
  overflow: hidden;
`;

const StButtonList = styled.li`
  width: 100%;
`;

const StButton = styled.button`
  width: 100%;
  height: 5rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.gray5};
  }
  color: ${({ theme, name }) => name === 'cancel' && theme.heart};
  color: ${({ theme, name }) => name === 'remove' && theme.heart};
  color: ${({ theme, name }) => name === 'unfollow' && theme.heart};
  font-weight: ${({ name }) => name === 'cancel' && 600};
  font-weight: ${({ name }) => name === 'remove' && 600};
  font-weight: ${({ name }) => name === 'unfollow' && 600};
`;

export default PostSettingModal;
