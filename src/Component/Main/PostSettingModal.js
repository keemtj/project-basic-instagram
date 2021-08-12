import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useToast from '../../Hooks/useToast';
import { closePopup } from '../../Modules/popup';
import { getProfilePosts, updateMainPosts } from '../../Modules/posts';
import {
  getProfileUserData,
  getProfileUserFollowData,
} from '../../Modules/user';
import PostSettingPortal from '../../Portals/PostSettingPortal';
import { removeImagesByPostData } from '../../services/firebaseStorage';
import {
  addBookmarkData,
  observeMainPost,
  removeBookmarkData,
  removeMyPost,
} from '../../services/firestore';

const PostSettingModal = () => {
  const modalRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { postSettingModal: postSettingModalState } = useSelector(
    state => state.popup,
  );
  const { uid: currentUid } = useSelector(state => state.user.currentUser);
  const { data: mainPosts } = useSelector(state => state.posts.mainPosts);
  const { activePostIndex, activePostId } = useSelector(state => state.posts);
  const [toast] = useToast();
  const { uid, id, imagesArray, bookmarks } = mainPosts?.[activePostIndex];

  const isSaved = () => bookmarks.includes(currentUid);

  const onRemovePost = async () => {
    await removeMyPost(id);
    removeImagesByPostData(imagesArray, uid, id);
    observeMainPost(dispatch, updateMainPosts, id);
    dispatch(closePopup('postSettingModal'));
    toast('게시글이 삭제되었습니다.');
  };

  const onClickBookmark = async () => {
    if (!isSaved()) {
      console.log('Saved!');
      const result = await addBookmarkData(id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      } else {
        toast('게시물이 저장되었습니다.');
      }
    } else {
      console.log('Cancel Saved!');
      const result = await removeBookmarkData(id);
      if (result === 'error') {
        toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
      } else {
        toast('게시물 저장이 취소되었습니다.');
      }
    }
    observeMainPost(dispatch, updateMainPosts, id);
  };

  const onToggleHeartCount = () => {
    console.log('show/hide heart count');
  };

  const onToggleFollow = () => {
    console.log('follow/unfollow');
  };

  const onToggleCommentInput = () => {
    console.log('댓글 인풋 on/off');
  };

  const onClickCopyLink = () => {
    console.log('포스트 링크 복사', activePostId);
  };

  const onMoveSinglePostPage = () => {
    console.log('싱글 포스트 페이지로 이동');
    dispatch(getProfileUserData(uid));
    dispatch(getProfileUserFollowData(uid));
    dispatch(getProfilePosts(uid));
    dispatch(closePopup('postSettingModal'));
    history.push(`/p/${activePostId}`);
  };

  const onCancel = () => {
    dispatch(closePopup('postSettingModal'));
  };

  const onCilckOutside = e => {
    if (
      postSettingModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      onCancel();
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
            <StButtonList>
              <StButton
                name="remove"
                onClick={() => {
                  dispatch(closePopup('postSettingModal'));
                  toast('TEST');
                }}
              >
                토스트 트리거
              </StButton>
            </StButtonList>
            {currentUid === uid && (
              <StButtonList>
                <StButton name="remove" onClick={onRemovePost}>
                  삭제(준비중)
                </StButton>
              </StButtonList>
            )}
            {currentUid !== uid && (
              <StButtonList>
                <StButton name="follow" onClick={onToggleFollow}>
                  팔로우 취소
                </StButton>
              </StButtonList>
            )}
            <StButtonList>
              <StButton name="bookmark" onClick={onClickBookmark}>
                {isSaved() ? '북마크 취소' : '북마크'}
              </StButton>
            </StButtonList>
            {currentUid === uid && (
              <StButtonList>
                <StButton
                  name="toggle-heart-count"
                  onClick={onToggleHeartCount}
                >
                  좋아요 수 숨기기(준비중)
                </StButton>
              </StButtonList>
            )}
            {currentUid === uid && (
              <StButtonList>
                <StButton name="toggle-input" onClick={onToggleCommentInput}>
                  댓글 기능 해제(준비중)
                </StButton>
              </StButtonList>
            )}
            <StButtonList>
              <StButton name="copy-link" onClick={onClickCopyLink}>
                링크 복사(준비중)
              </StButton>
            </StButtonList>
            <StButtonList>
              <StButton name="move-page" onClick={onMoveSinglePostPage}>
                게시물로 이동
              </StButton>
            </StButtonList>
          </ul>
        </StSettingBox>
        <StSettingBox>
          <ul>
            <StButtonList>
              <StButton name="cancel" onClick={onCancel}>
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
