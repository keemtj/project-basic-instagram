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
  hover,
  ...rest
}) => {
  return (
    <StProfileImageWrapper>
      <StProfileImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        hover={hover}
        onClick={rest.onClick ? rest.onClick : undefined}
      />
      {children ? (
        children
      ) : (
        <StUsername
          hover={hover}
          marginLeft={marginLeft}
          fontSize={fontSize}
          onClick={rest.onClick}
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
  object-fit: cover;
  &:hover {
    /* cursor: ${({ hover }) => (hover ? 'pointer' : 'default')}; */
    cursor: pointer;
    text-decoration: ${({ hover }) => (hover ? 'underline' : 'none')};
  }
`;

const StUsername = styled.div`
  margin-left: ${({ marginLeft }) => marginLeft}rem;
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: 600;
  &:hover {
    /* cursor: ${({ hover }) => (hover ? 'pointer' : 'default')}; */
    cursor: pointer;
    text-decoration: ${({ hover }) => (hover ? 'underline' : 'none')};
  }
`;

export default ProfileImage;
