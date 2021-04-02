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
      <StProfileImage src={src} alt={alt} width={width} height={height} />
      {children ? (
        children
      ) : (
        <StUsername marginLeft={marginLeft} fontSize={fontSize}>
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
`;

const StUsername = styled.div`
  margin-left: ${({ marginLeft }) => marginLeft}rem;
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: 600;
`;

export default ProfileImage;
