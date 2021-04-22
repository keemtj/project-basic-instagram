import React from 'react';
import styled from 'styled-components';

const ProfileImage = ({
  src,
  alt = 'default image',
  width,
  height,
  marginLeft,
  fontSize,
  username,
  children,
}) => {
  return (
    <StProfileImageWrapper>
      <StProfileImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={() => console.log('이미지 클릭 -> 유저 페이지로 이동')}
      />
      {children ? (
        children
      ) : (
        <StUsername
          marginLeft={marginLeft}
          fontSize={fontSize}
          onClick={() => console.log('이미지 클릭 -> 유저 페이지로 이동')}
        >
          {username}
        </StUsername>
      )}
    </StProfileImageWrapper>
  );
};

const StProfileImageWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StProfileImage = styled.img`
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 50%;
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StUsername = styled.div`
  margin-left: ${({ marginLeft }) => marginLeft}rem;
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default ProfileImage;
