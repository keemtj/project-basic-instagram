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
import { calcTimeElapsed } from '../../lib/calcTimeElapsed';

const icons = [
  { icon: <Heart /> },
  { icon: <Chat /> },
  { icon: <PaperPlane /> },
  { icon: <Bookmark /> },
];

const PostModal = ({ myPosts, myBookmarks, myHearts, searchUserPosts }) => {
  console.log(myPosts, myBookmarks, myHearts, searchUserPosts);
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

  const comments = [
    {
      id: 'captain',
      comment: 'hihihihihihihihihihihihihihihihihihi',
      date: '2021-3-12',
    },
    { id: 'widow', comment: 'hihihihihihihihihihi', date: '2021-3-15' },
    {
      id: 'rocky',
      comment: 'hihihihihihihihihihihihihihihihihihihihihihihihihihi',
      date: '2021-3-20',
    },
    { id: 'ironman', comment: 'hihihihihihihihihihihihi', date: '2021-4-10' },
    {
      id: 'spiderman',
      comment: 'hihihihihihihihihihihihihihihihi',
      date: '2021-5-10',
    },
    { id: 'marble', comment: 'hihihihihihihihi', date: '2021-5-11' },
    { id: 'dr_strange', comment: 'hihihihihihi', date: '2021-5-16' },
  ];

  const onClickOutside = e => {
    if (
      postModalState &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      console.log('outside?');
      dispatch(closePopup('postModal'));
    }
  };

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
            <Carousel imagesArray={myPosts[0]?.imagesArray} pagenation pos />
          </StImagesSection>
          <StPostSubDataSection>
            <StHeader>
              <ProfileImage
                src={'/images/default_profile.png'}
                alt={'temp'}
                width={3.5}
                height={3.5}
              >
                <div>
                  <StDisplayName>{'displayName'}</StDisplayName>
                  {myPosts[0]?.location && (
                    <StLocation>{myPosts[0]?.location}</StLocation>
                  )}
                </div>
              </ProfileImage>
            </StHeader>
            <StTextBox>
              <StText>
                {/* {post?.text} */}
                {`⭐ | When your Setup looks so clean and
                neat, your day will become more inspired and creative. Don't you
                agree?
                ➖➖➖➖➖➖➖➖➖➖➖➖
                Follow for more amazing content
                | Follow Us | 👉 @hermeshitech
                | Follow Us | 👉 @hermeshitech
                | Follow Us | 👉 @hermeshitech 
                ➖➖➖➖➖➖➖➖➖➖➖➖⠀ 
                📸 | Credits: @nvzion 
                🏅 | Tag a Friend down below⠀ 
                👇 | Comment Your Thoughts here
                ➖➖➖➖➖➖➖➖➖➖➖➖⠀
                #hermeshitech
                #techlifestyle #desksetups #setupinspiration
                #workspaceinspiration #productivespaces #myworkspace
                #designyourworkspace #minimalismsource #workspacedesign
                #minimalsetups #beautyoftechnology #designoffice #deskgoals
                #officeinspiration #techsetup #dreamdesks #woodendesktop
                #macbookpro #setup #pcsetup
                `}
              </StText>
              <StCommentsBox>
                {/* {post?.comments?.map((comment, index) => ( */}
                {comments?.map((comment, index) => (
                  <div
                    key={index}
                    style={{
                      marginTop: '2rem',
                      display: 'flex',
                    }}
                  >
                    {/* <div key={index}>
                    <StUsername>{comment.id}</StUsername>{' '}
                    <span>{comment.comment}</span>
                  </div> */}
                    <div>
                      <img
                        src={'/images/default_profile.png'}
                        alt={'temp'}
                        style={{
                          borderRadius: '50%',
                          width: '3.5rem',
                          height: '3.5rem',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexFlow: 'column',
                      }}
                    >
                      <div></div>
                      <div
                        style={{
                          marginLeft: '1.5rem',
                          lineHeight: '1.4',
                          height: 'fit-content',
                        }}
                      >
                        <StUsername>{comment.id}</StUsername>{' '}
                        <span>{comment.comment}</span>
                      </div>
                      <div
                        style={{
                          paddingLeft: '1.5rem',
                          marginTop: '0.5rem',
                          fontSize: '1.1rem',
                          color: 'gray',
                        }}
                      >
                        {calcTimeElapsed(comment.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </StCommentsBox>
            </StTextBox>
            <StSectionNav>
              {icons.map((icon, index) => (
                <span key={index}>{icon.icon}</span>
              ))}
            </StSectionNav>
            {myPosts[0]?.heartCount > 0 ? (
              <StHeartCount>좋아요 {myPosts[0]?.heartCount}개</StHeartCount>
            ) : (
              <StHeartCount>가장 먼저 좋아요를 눌러주세요</StHeartCount>
            )}
            <StDate>{calcTimeElapsed(myPosts[0]?.date)}</StDate>
            {!myPosts[0]?.isPossibleComment && (
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
  display: flex;
  flex-flow: row nowrap;
  width: 95rem;
  height: 59.9rem;
  background: ${({ theme }) => theme.white};
`;

const StImagesSection = styled.section`
  display: flex;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.gray};
  width: 100%;
  max-width: 60rem;
`;

const StPostSubDataSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 35rem;
`;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  padding: 1.5rem;
  width: 100%;
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
  flex-flow: column nowrap;
  align-items: flex-start;
  height: 100%;
  padding: 1.5rem;
  overflow: scroll;
  font-size: 1.4rem;
  word-break: break-all;
`;

const StText = styled.div`
  width: 100%;
  line-height: 1.3;
`;

const StUsername = styled.span`
  font-weight: 600;
`;

const StCommentsBox = styled.article`
  width: 100%;
  font-size: 1.4rem;
  & > div {
    margin-top: 0.5rem;
  }
`;

const StSectionNav = styled.article`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
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
  border-top: 1px solid ${({ theme }) => theme.gray};
`;

const StHeartCount = styled.div`
  width: 100%;
  padding: 0rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const StDate = styled.div`
  padding: 1.5rem;
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
