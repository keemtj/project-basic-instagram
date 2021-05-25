import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft } from '@styled-icons/entypo/ChevronLeft';
import { ChevronRight } from '@styled-icons/entypo/ChevronRight';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Chat } from '@styled-icons/bootstrap/Chat';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';
import { closePopup } from '../../Modules/popup';
import PostPortal from '../../PostPortal';
import Carousel from '../Global/Carousel';
import ProfileImage from '../Global/ProfileImage';
import { getPost } from '../../Modules/posts';

const icons = [
  { icon: <Heart /> },
  { icon: <Chat /> },
  { icon: <PaperPlane /> },
  { icon: <Bookmark /> },
];

const PostModal = ({
  photoURL,
  displayName,
  location,
  imagesArray,
  heartCount,
  more,
  text,
  onClickMore,
  isPossibleComment,
  comments,
  timeElapsed,
  postUid,
  postId,
}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { postModal: postModalState } = useSelector(state => state.popup);

  const handlePrev = () => {
    console.log('prev~');
  };

  const handleNext = () => {
    console.log('next~');
  };

  const onCloseButton = () => {
    dispatch(closePopup('postModal'));
  };

  const onClickOutside = e => {
    if (
      postModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(closePopup('postModal'));
    }
  };

  useEffect(() => {
    dispatch(getPost({ postUid, postId }));
  }, [postUid, postId]);

  useEffect(() => {
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <PostPortal>
      <StPostModalWrapper>
        <StPostBoxBlock ref={modalRef}>
          <StImagesSection>
            <Carousel imagesArray={imagesArray} pagenation />
          </StImagesSection>
          <StPostSubDataSection>
            <StHeader>
              <ProfileImage
                src={
                  photoURL === '' || !photoURL
                    ? '/images/default_profile.png'
                    : photoURL
                }
                alt={'temp'}
                width={3}
                height={3}
              >
                <div>
                  <StDisplayName>
                    {'displayName'}
                    {displayName}
                  </StDisplayName>
                  {location && <StLocation>{location}</StLocation>}
                </div>
              </ProfileImage>
            </StHeader>
            <StTextBox>
              <StText more={more}>
                <StUsername>{displayName}</StUsername> {text}{' '}
              </StText>
              {text?.length > 70 && (
                <StMoreToggle onClick={onClickMore} more={more}>
                  {more ? '더 보기' : '숨기기'}
                </StMoreToggle>
              )}
            </StTextBox>
            {!isPossibleComment && (
              <StCommentsBox>
                {comments?.length > 2 && (
                  <StMoreComments>
                    댓글 {comments.length}개 모두 보기
                  </StMoreComments>
                )}
                {comments?.slice(0, 2).map((comment, index) => (
                  <div key={index}>
                    <StUsername>{comment.id}</StUsername>{' '}
                    <span>{comment.comment}</span>
                  </div>
                ))}
              </StCommentsBox>
            )}
            <StSectionNav>
              {icons.map((icon, index) => (
                <span key={index}>{icon.icon}</span>
              ))}
            </StSectionNav>
            {heartCount > 0 ? (
              <StHeartCount>좋아요 {heartCount}개</StHeartCount>
            ) : (
              <StHeartCount>가장 먼저 좋아요를 눌러주세요</StHeartCount>
            )}
            <StDate>
              {'1일 전'}
              {timeElapsed}
            </StDate>
            {!isPossibleComment && (
              <StChatCommentLabel>
                <button>
                  <StEmojiSmile />
                </button>
                <StCommentInput type="text" placeholder="댓글 달기..." />
                <StCommentButton type="submit">게시</StCommentButton>
              </StChatCommentLabel>
            )}
          </StPostSubDataSection>
          <StSlideButton type="button" role="prev" onClick={handlePrev}>
            <StPrevButton />
          </StSlideButton>
          <StSlideButton type="button" role="next" onClick={handleNext}>
            <StNextButton />
          </StSlideButton>
        </StPostBoxBlock>
        <StCloseButton type="button" onClick={onCloseButton}>
          <CloseOutline />
        </StCloseButton>
      </StPostModalWrapper>
    </PostPortal>
  );
};

const StPostModalWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StPostBoxBlock = styled.main`
  background: ${({ theme }) => theme.white};
  width: 95rem;
  height: 65%;
  display: flex;
  flex-flow: row nowrap;
`;

const StImagesSection = styled.section`
  /* temp */
  min-width: 61.5rem;
  min-height: 61.5rem;
  background: yellowgreen;
  border-right: 1px solid ${({ theme }) => theme.gray};
`;

const StPostSubDataSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  padding: 0rem 1.5rem;
  width: 100%;
  height: 5.5rem;
  & > div {
    display: flex;
    align-items: center;
    & > div {
      margin-left: 1.5rem;
    }
  }
  font-size: 1.4rem;
  font-weight: 600;
`;

const StDisplayName = styled.h2`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StLocation = styled.div`
  margin-top: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
`;

const StTextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.5rem;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  word-break: break-all;
`;

const StText = styled.div`
  width: ${({ more }) => (more ? '90%' : '100%')};
  line-height: 1.3;
  ${({ more }) =>
    more &&
    css`
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

const StUsername = styled.span`
  font-weight: 600;
`;

const StMoreToggle = styled.span`
  margin-left: ${({ more }) => (more ? '0.5rem' : '0')};
  color: ${({ theme }) => theme.darkGray};
  line-height: 1.3;
  cursor: pointer;
`;

const StCommentsBox = styled.section`
  width: 100%;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  & > div {
    margin-top: 0.5rem;
  }
`;

const StMoreComments = styled.div`
  color: ${({ theme }) => theme.darkGray};
`;

const StSectionNav = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0rem 1.5rem;
  & > span {
    width: 2.5rem;
    height: 2.5rem;
  }
  & > span + span {
    margin-left: 1.5rem;
  }
  & > :last-child {
    margin-left: auto;
  }
`;

const StHeartCount = styled.div`
  width: 100%;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const StDate = styled.div`
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

const StChatCommentLabel = styled.label`
  border-top: 1px solid ${({ theme }) => theme.gray};
  padding: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StEmojiSmile = styled(EmojiSmile)`
  width: 3rem;
`;

const StCommentInput = styled.input`
  border: none;
  background: ${({ theme }) => theme.white};
  margin-left: 1.5rem;
  width: 100%;
  outline: none;
`;

const StCommentButton = styled.button`
  width: 4rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.activeBlue};
`;

const buttonStyle = css`
  width: 4rem;
  height: 4rem;
  color: ${({ theme }) => theme.gray8};
  cursor: pointer;
  text-shadow: 5px 5px ${({ theme }) => theme.black};
`;

const StSlideButton = styled.div`
  position: absolute;
  top: calc(50% - 2rem);
  right: ${({ role }) => role === 'next' && 'calc((100vw - 95rem) / 2 - 4rem)'};
  left: ${({ role }) => role === 'prev' && 'calc((100vw - 95rem) / 2 - 4rem)'};

  width: 4rem;
  height: 4rem;
`;

const StNextButton = styled(ChevronRight)`
  ${buttonStyle}
`;

const StPrevButton = styled(ChevronLeft)`
  ${buttonStyle}
`;

const StCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.white};
  font-size: 2rem;
  cursor: pointer;
`;

export default PostModal;
