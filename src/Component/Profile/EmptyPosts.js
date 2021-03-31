import React from 'react';
import styled from 'styled-components';

const EmptyPosts = () => {
  return (
    <StEmptyPosts>
      <StExampleImageWrapper>
        <StExampleImage
          src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg"
          alt="example"
        />
      </StExampleImageWrapper>
      <StPostIntroWrapper>
        <div>소중한 순간을 포착하여 공유해보세요.</div>
        <div>앱을 다운로드하고 첫 사진이나 동영상을 공유해보세요.</div>
        <StDownloadWrapper>
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_korean-ko.png/4a5c9d62d51b.png"
            alt="download at app store "
          />
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_korean-ko.png/f155b664a93b.png"
            alt="download at google play"
          />
        </StDownloadWrapper>
      </StPostIntroWrapper>
    </StEmptyPosts>
  );
};

const StEmptyPosts = styled.article`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  border-radius: 4px;
  background-color: white;
  overflow: hidden;
`;

const StExampleImageWrapper = styled.div`
  width: 40%;
`;

const StExampleImage = styled.img`
  width: 100%;
`;

const StPostIntroWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 600;
  & > :nth-child(2) {
    margin-top: 1rem;
    font-size: 1.6rem;
    font-weight: normal;
  }
`;

const StDownloadWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 2rem;
  & > img {
    width: 15rem;
  }
  & > img + img {
    margin-left: 1rem;
  }
`;
export default EmptyPosts;
