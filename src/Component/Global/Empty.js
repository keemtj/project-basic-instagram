import React from 'react';
import styled from 'styled-components';
import { Grid } from '@styled-icons/feather/Grid';
import { Heart } from '@styled-icons/feather/Heart';
import { Bookmark } from '@styled-icons/feather/Bookmark';

const NoData = ({ isNoData }) => {
  return (
    <StEmpty isNoData={isNoData}>
      <StHeader>게시물 없음</StHeader>
      <StText isNoData={isNoData}>더이상 게시물이 존재하지 않습니다.</StText>
    </StEmpty>
  );
};

const EmptyPost = () => {
  return (
    <StEmpty>
      <StIconWrapper>
        <StGrid />
      </StIconWrapper>
      <StHeader>게시물 없음</StHeader>
      <StText>업로드한 게시물이 존재하지 않습니다.</StText>
    </StEmpty>
  );
};

const EmptyHeart = () => {
  return (
    <StEmpty>
      <StIconWrapper>
        <StHeartIcon />
      </StIconWrapper>
      <StHeader>좋아요</StHeader>
      <StText>
        마음에 드는 사진에 좋아요를 눌러주세요. 콘텐츠에 좋아요를 누르면 다른
        사람에게 알림이 전송되나, 좋아요한 콘텐츠는 회원님만 볼 수 있습니다.
      </StText>
    </StEmpty>
  );
};

const EmptySaved = () => {
  return (
    <StEmpty>
      <StIconWrapper>
        <StBookmarkIcon />
      </StIconWrapper>
      <StHeader>저장</StHeader>
      <StText>
        다시 보고 싶은 사진을 저장하세요. 콘텐츠를 저장해도 다른 사람에게 알림이
        전송되지 않으며, 저장된 콘텐츠는 회원님만 볼 수 있습니다.
      </StText>
    </StEmpty>
  );
};

const StEmpty = styled.article`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: ${({ isNoData }) => (isNoData ? '60rem' : '100%')};
  height: ${({ isNoData }) => (isNoData ? '10rem' : '30rem')};
`;

const StIconWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StGrid = styled(Grid)`
  width: 3rem;
  height: 3rem;
`;

const StHeartIcon = styled(Heart)`
  width: 3rem;
  height: 3rem;
`;

const StBookmarkIcon = styled(Bookmark)`
  width: 3rem;
  height: 3rem;
`;

const StHeader = styled.header`
  margin-top: 2rem;
  font-size: 4rem;
  font-weight: 200;
`;

const StText = styled.p`
  margin-top: 2rem;
  width: 35rem;
  font-size: ${({ isNoData }) => (isNoData ? '1.6rem' : '1.4rem')};
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
`;

export { NoData, EmptyPost, EmptyHeart, EmptySaved };
