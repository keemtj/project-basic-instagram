import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { Dot } from '@styled-icons/bootstrap/Dot';

const DirectItem = ({ chat }) => {
  return (
    <StDirectItem>
      <ProfileImage
        src="/images/default_profile.png"
        alt="default profile"
        width={6}
        height={6}
      >
        <StPreviewbox>
          <div>{chat.username}</div>
          <StMsgInfo>
            msg <StDot />
            {chat.lastTimeStamp}일전
          </StMsgInfo>
        </StPreviewbox>
      </ProfileImage>
    </StDirectItem>
  );
};

const StDirectItem = styled.li`
  line-height: 1.3;
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.gray2};
  }
  &:active {
    background: ${({ theme }) => theme.gray5};
  }
`;

const StPreviewbox = styled.div`
  margin-left: 1rem;
`;

const StMsgInfo = styled.div`
  color: ${({ theme }) => theme.darkGray};
`;

const StDot = styled(Dot)`
  width: 1rem;
  height: 1rem;
`;

export default DirectItem;
