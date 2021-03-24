import React from 'react';
import styled, { css } from 'styled-components';
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Chat } from '@styled-icons/bootstrap/Chat';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';
import { EmojiSmile } from '@styled-icons/bootstrap/EmojiSmile';

const Post = ({ post }) => {
  const images = ['image1'];
  const icons = [
    { icon: <Heart /> },
    { icon: <Chat /> },
    { icon: <PaperPlane /> },
    { icon: <Bookmark /> },
  ];
  const heartCount = 17;

  const posttext = {
    id: 'username1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima deleniti quis reiciendis nulla, ipsa aspernatur qui praesentium nostrum, commodi adipisci harum, quod quisquam. Minima id ullam doloribus blanditiis at neque!',
    text2:
      '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세.',
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
          <ThreeDots />
        </button>
      </StHeader>
      <StImagesSection>
        {images.map((_, index) => (
          <StImage
            key={index}
            src="https://source.unsplash.com/random/500x500"
            alt="post"
          />
        ))}
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
        <div>
          <StUsername>{comments[0].id}</StUsername>{' '}
          <span>{comments[0].comment}</span>
        </div>
        <div>
          <StUsername>{comments[1].id}</StUsername>{' '}
          <span>{comments[1].comment}</span>
        </div>
      </StCommentsBox>
      <div style={{ padding: '1rem 1.5rem' }}>1일전</div>
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
  border: 1px solid rgba(219, 219, 219, 1);
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
  border-bottom: 1px solid rgba(219, 219, 219, 1);
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
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const StImagesSection = styled.section`
  width: 100%;
`;

const StImage = styled.img`
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
  color: #828282;
  line-height: 1.3;
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
  color: #828282;
`;

const StChatCommentLabel = styled.label`
  border-top: 1px solid rgba(219, 219, 219, 1);
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
  background: #fafafa;
  margin-left: 1.5rem;
  width: 100%;
  outline: none;
`;

const StCommentButton = styled.button`
  width: 4rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0095f6;
`;

export default Post;
