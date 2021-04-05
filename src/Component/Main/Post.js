import React from 'react';
import styled, { css } from 'styled-components';
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Chat } from '@styled-icons/bootstrap/Chat';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';
import Carousel from '../Global/Carousel';

const Post = ({ post }) => {
  const icons = [
    { icon: <Heart /> },
    { icon: <Chat /> },
    { icon: <PaperPlane /> },
    { icon: <Bookmark /> },
  ];
  const images = [
    'https://s6.favim.com/orig/140415/black-cute-girl-grunge-Favim.com-1669287.jpg',
    'https://www.studyheights.com/uploads/quizzCategory/a98500a459e1b0bfbbfa43bf9da1e9b7.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FoDXeLRXEqA2o02I2JPgz2VhDb1vyuFAKQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FoDXeLRXEqA2o02I2JPgz2VhDb1vyuFAKQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FoDXeLRXEqA2o02I2JPgz2VhDb1vyuFAKQ&usqp=CAU',
  ];
  const heartCount = 17;

  const posttext = {
    id: 'username1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti quis reiciendis nulla, ipsa aspernatur qui praesentium nostrum, commodi adipisci harum, quod quisquam. Minima id ullam doloribus blanditiis at neque!',
  };
  const [more, setMore] = React.useState(true);
  const onClickMore = () => {
    setMore(!more);
  };
  const comments = [
    { id: 'eun1010', comment: '좋아요' },
    { id: 'pnh1123', comment: 'i love it' },
    { id: 'kjh5555', comment: 'nice photo!' },
    { id: 'lms1234', comment: 'goooooood' },
  ];

  return (
    <StArticle>
      <StHeader>
        <div>
          <StProfileImage
            src="images/default_profile.png"
            alt="default_image"
          />
          <div>{post.username}</div>
        </div>
        <button style={{ width: '2rem' }}>
          {/* modal trigger */}
          <ThreeDots />
        </button>
      </StHeader>
      <StImagesSection>
        <Carousel images={images} pagenation />
      </StImagesSection>
      <StSectionNav>
        {icons.map((icon, index) => (
          <span key={index}>{icon.icon}</span>
        ))}
      </StSectionNav>
      <StHeartCount>좋아요 {heartCount}개</StHeartCount>
      <StTextBox>
        <StText more={more}>
          <StUsername>{`${posttext.id}`}</StUsername> {`${posttext.text}`}{' '}
        </StText>
        <StMoreToggle onClick={onClickMore} more={more}>
          {more ? '더 보기' : '숨기기'}
        </StMoreToggle>
      </StTextBox>
      <StCommentsBox>
        {comments.length > 2 && (
          <StMoreComments>댓글 {comments.length}개 모두 보기</StMoreComments>
        )}
        {comments.slice(0, 2).map((comment, index) => (
          <div key={index}>
            <StUsername>{comment.id}</StUsername> <span>{comment.comment}</span>
          </div>
        ))}
      </StCommentsBox>
      <StDate>1일전</StDate>
      <StChatCommentLabel>
        <button>
          <StEmojiSmile />
        </button>
        <StCommentInput type="text" placeholder="댓글 달기..." />
        <StCommentButton type="submit">게시</StCommentButton>
      </StChatCommentLabel>
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
  width: ${({ more }) => (more ? '70%' : '100%')};
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
