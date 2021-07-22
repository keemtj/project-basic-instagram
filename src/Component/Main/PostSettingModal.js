import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useToast from '../../Hooks/useToast';
import { activePostData, closePopup } from '../../Modules/popup';
import { updateMainPosts } from '../../Modules/posts';
import PostSettingPortal from '../../Portals/PostSettingPortal';
import { removeImagesByPostData } from '../../services/firebaseStorage';
import { removePostData, updatePostsData } from '../../services/firestore';

const PostSettingModal = () => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [toast] = useToast();

  const { newPost } = useSelector(state => state.posts);
  const { postSettingModal: postSettingModalState } = useSelector(
    state => state.popup,
  );
  const { uid: currentUserUid } = useSelector(state => state.user.currentUser);
  const { followers } = useSelector(state => state.user.currentUserFollowData);
  const { uid, id, imagesArray } = useSelector(state => state.popup.activePost);

  const onRemovePost = async () => {
    const newPostIds = newPost.map(post => post.id);
    await removePostData(uid, id, followers); // db삭제
    await removeImagesByPostData(imagesArray, uid, id); // image삭제
    await updatePostsData(dispatch, updateMainPosts, newPostIds); // onSnapshot
    dispatch(closePopup('postSettingModal'));
    toast('게시글이 삭제되었습니다.');
  };

  const isSaved = () => false;
  const onClickBookmark = async () => {
    console.log('북마크/북마크 취소');
    // if (!isSaved()) {
    //   console.log('Saved!');
    //   const result = await addBookmarkData(id);
    //   if (result === 'error') {
    //     toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
    //   }
    // } else {
    //   console.log('Deleted!');
    //   const result = await removeBookmarkData(id);
    //   if (result === 'error') {
    //     toast('이미 삭제되었거나 존재하지 않는 게시물입니다.');
    //   }
    // }
    // observeMainPost(dispatch, updateMainPosts, id);
  };

  const onToggleCommentInput = () => {
    console.log('댓글 인풋 on/off');
  };

  const onClickCopyLink = () => {
    console.log('포스트 링크 복사');
  };

  const onMovePostPage = () => {
    console.log('포스트 페이지로 이동');
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
            <StButtonList onClick={onClickBookmark}>
              <StButton>{isSaved() ? '북마크 취소' : '북마크'}</StButton>
            </StButtonList>
            {currentUserUid === uid && (
              <StButtonList>
                <StButton>좋아요 수 숨기기(준비중)</StButton>
              </StButtonList>
            )}
            {currentUserUid === uid && (
              <StButtonList onClick={onToggleCommentInput}>
                <StButton>댓글 기능 해제</StButton>
              </StButtonList>
            )}
            <StButtonList onClick={onClickCopyLink}>
              <StButton>링크 복사</StButton>
            </StButtonList>
            <StButtonList onClick={onMovePostPage}>
              <StButton>게시물로 이동(준비중)</StButton>
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
