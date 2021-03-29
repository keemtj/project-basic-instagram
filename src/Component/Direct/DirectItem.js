import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../Global/ProfileImage';
import { Dot } from '@styled-icons/bootstrap/Dot';

const DirectItem = () => {
  return (
    <StDirectItem>
      <ProfileImage
        src="/images/default_profile.png"
        alt="default profile"
        width={5.5}
        height={5.5}
      >
        <StPreviewbox>
          <div>username</div>
          <StMsgInfo>
            msg <StDot />
            5일
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
    background: rgba(219, 219, 219, 0.1);
  }
  &:active {
    background: rgba(219, 219, 219, 0.5);
  }
`;

const StPreviewbox = styled.div`
  margin-left: 1rem;
`;

const StMsgInfo = styled.div`
  color: #828282;
`;

const StDot = styled(Dot)`
  width: 1rem;
  height: 1rem;
`;

export default DirectItem;
