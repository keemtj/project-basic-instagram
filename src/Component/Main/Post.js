import React from 'react';
import styled from 'styled-components';
import { ThreeDots } from '@styled-icons/bootstrap/ThreeDots';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { PaperPlane } from '@styled-icons/ionicons-outline/PaperPlane';
import { Chat } from '@styled-icons/bootstrap/Chat';
import { Bookmark } from '@styled-icons/bootstrap/Bookmark';

const Post = ({ post }) => {
  const images = ['image1'];
  const icons = [
    { icon: <Heart /> },
    { icon: <Chat /> },
    { icon: <PaperPlane /> },
    { icon: <Bookmark /> },
  ];
  const heartCount = 2;

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
      <section>
        <div>좋아요 {heartCount}개</div>
        <div>username</div>
        <div>
          <span>username</span> <span>text</span>
        </div>
        <div>1일전</div>
      </section>
      <input type="text" placeholder="댓글 달기..." />
    </StArticle>
  );
};

const StArticle = styled.article`
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 3px;
  margin-bottom: 6rem;
  width: 62rem;
  height: fit-content;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  padding: 0rem 1.5rem;
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

export default Post;
