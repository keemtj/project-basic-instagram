import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { InformationCircle } from '@styled-icons/ionicons-outline/InformationCircle';
import { InformationCircle as InformationCircleFill } from '@styled-icons/ionicons-solid/InformationCircle';

const MessageHeader = ({
  directDetailsState,
  displayName,
  photoURL,
  onClickDetails,
}) => {
  return (
    <StMessageHeader>
      {directDetailsState ? (
        <>
          <StDetailsTitle>상세 정보</StDetailsTitle>
          <StFillIcons onClick={onClickDetails} />
        </>
      ) : (
        <>
          <ProfileImage
            src={photoURL}
            width={2.5}
            height={2.5}
            marginLeft={1}
            fontSize={1.5}
            username={displayName}
          />
          <StIcons onClick={onClickDetails} />
        </>
      )}
    </StMessageHeader>
  );
};

const StMessageHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem;
  height: 6.5rem;
  min-height: 6.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  position: relative;
`;

const StDetailsTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
`;

const StIcons = styled(InformationCircle)`
  width: 3rem;
  height: 3rem;
  margin-left: auto;
  cursor: pointer;
  position: absolute;
  right: 2rem;
`;

const StFillIcons = styled(InformationCircleFill)`
  width: 3rem;
  height: 3rem;
  margin-left: auto;
  cursor: pointer;
  position: absolute;
  right: 2rem;
`;

export default MessageHeader;
