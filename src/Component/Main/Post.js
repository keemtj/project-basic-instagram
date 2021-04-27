import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Chat } from '@styled-icons/bootstrap/Chat';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';
import Carousel from '../Global/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getPostImagesToStorage } from '../../Modules/post';

const icons = [
  { icon: <Heart /> },
  { icon: <Chat /> },
  { icon: <PaperPlane /> },
  { icon: <Bookmark /> },
];

const Post = ({ post }) => {
  const { data: srcs } = useSelector(state => state.post);
  console.log(srcs);
  const dispatch = useDispatch();
  const {
    images,
    heartCount,
    text,
    isPossibleComment,
    comments,
    date,
    location,
    displayName,
    uid,
    id,
  } = post;

  // TODO: 경과 시간 계산 함수
  const getTimeElapsed = date => {
    const start = new Date(date);
    const end = Date.now();
    const sec = Math.floor((end - start) / 1000); // 경과시간, 초
    const min = Math.floor((end - start) / 1000 / 60); // 경과시간, 분
    const hour = Math.floor((end - start) / 1000 / 60 / 60); // 경과시간, 시간
    const day = Math.floor((end - start) / 1000 / 60 / 60 / 24); // 경과시간, 일
    const elapsed =
      sec >= 60
        ? min >= 60
          ? hour >= 24
            ? day + '일전'
            : hour + '시간 전'
          : min + '분 전'
        : '방금 전';
    return elapsed;
  };

  // TODO: 게시글 더보기, 숨기기 함수
  const [more, setMore] = useState(true);
  const onClickMore = () => {
    setMore(!more);
  };

  useEffect(() => {
    /**
     * TODO: get images to firebaseStorage
     * FIXME: firebaseStorage 및 dispatch
     * @param uid The uid of the user who posted this post.
     * @param id  Doc.id pointing to this post.
     * @param name The filenames of the images in this post.
     */
    dispatch(getPostImagesToStorage({ uid, id, images }));
  }, []);

  return (
    <StArticle>
      <StHeader>
        <div>
          <StProfileImage
            src="images/default_profile.png"
            alt="default_image"
          />
          <div>
            <div>{displayName}</div>
            {location && <StLocation>{location}</StLocation>}
          </div>
        </div>
        <button style={{ width: '2rem' }}>
          {/* modal trigger */}
          <ThreeDots />
        </button>
      </StHeader>
      <StImagesSection>
        <Carousel srcs={srcs} images={images} pagenation />
      </StImagesSection>
      <StSectionNav>
        {icons.map((icon, index) => (
          <span key={index}>{icon.icon}</span>
        ))}
      </StSectionNav>
      {heartCount > 0 && <StHeartCount>좋아요 {heartCount}개</StHeartCount>}
      <StTextBox>
        <StText more={more}>
          <StUsername>{displayName}</StUsername> {text}{' '}
        </StText>
        {text.length > 70 && (
          <StMoreToggle onClick={onClickMore} more={more}>
            {more ? '더 보기' : '숨기기'}
          </StMoreToggle>
        )}
      </StTextBox>
      {!isPossibleComment && (
        <StCommentsBox>
          {comments.length > 2 && (
            <StMoreComments>댓글 {comments.length}개 모두 보기</StMoreComments>
          )}
          {comments.slice(0, 2).map((comment, index) => (
            <div key={index}>
              <StUsername>{comment.id}</StUsername>{' '}
              <span>{comment.comment}</span>
            </div>
          ))}
        </StCommentsBox>
      )}
      <StDate>{getTimeElapsed(date)}</StDate>
      {!isPossibleComment && (
        <StChatCommentLabel>
          <button>
            <StEmojiSmile />
          </button>
          <StCommentInput type="text" placeholder="댓글 달기..." />
          <StCommentButton type="submit">게시</StCommentButton>
        </StChatCommentLabel>
      )}
    </StArticle>
  );
};

const StArticle = styled.article`
  border: 1px solid ${({ theme }) => theme.gray};
  background: ${({ theme }) => theme.white};
  border-radius: 3px;
  margin-bottom: 6rem;
  width: 62rem;
  height: fit-content;
  display: flex;
  flex-flow: column nowrap;
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

const StProfileImage = styled.img`
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const StLocation = styled.div`
  margin-top: 0.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.darkGray};
`;

const StImagesSection = styled.section`
  width: 100%;
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

const StDate = styled.div`
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.darkGray};
`;

const StMoreComments = styled.div`
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

export default Post;
