import React from 'react';
import styled from 'styled-components';

const ProfileImage = ({
  src,
  alt = 'default image',
  width,
  height,
  username,
  children,
}) => {
  return (
    <StProfileImageWrapper>
      <StProfileImage src={src} alt={alt} width={width} height={height} />
      {children ? children : <StUsername>{username}</StUsername>}
    </StProfileImageWrapper>
  );
};

const StProfileImageWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StProfileImage = styled.img`
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 50%;
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
`;

const StUsername = styled.div`
  margin-left: 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

export default ProfileImage;
