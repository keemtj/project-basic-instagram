import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ProfileImage from '../Global/ProfileImage';
import { calcTimeStamp } from '../../lib/calcTime';

const Room = ({ onClickRoom, id, timeStamp, msg, displayName, photoURL }) => {
  return (
    <StRoom onClick={onClickRoom}>
      <StLink to={`/direct/${id}`} activeClassName={'active'}>
        <ProfileImage src={photoURL} alt={displayName} width={6} height={6}>
          <StRoomPreview>
            <StDisplayName>{displayName}</StDisplayName>
            <StMsgInfo>
              <StMsgPreview>{msg}</StMsgPreview>
            </StMsgInfo>
            <StTimeStamp>{calcTimeStamp(timeStamp)}</StTimeStamp>
          </StRoomPreview>
        </ProfileImage>
      </StLink>
    </StRoom>
  );
};

const StRoom = styled.li`
  width: 100%;
  line-height: 1.3;
  font-size: 1.4rem;
  cursor: pointer;
  position: relative;
`;

const StLink = styled(NavLink)`
  display: inline-block;
  padding: 1rem 2rem;
  width: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  &:hover {
    background: ${({ theme }) => theme.gray5};
    ::before {
      height: 100%;
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border-left: 2px solid ${({ theme }) => theme.gray8};
    }
  }
  &:active {
    background: ${({ theme }) => theme.gray8};
  }
  &.active {
    ::before {
      height: 100%;
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border-left: 2px solid ${({ theme }) => theme.black};
    }
  }
`;

const StRoomPreview = styled.div`
  margin-left: 1rem;
`;

const StDisplayName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

const StMsgInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: 1.4rem;
  word-break: break-all;
`;

const StMsgPreview = styled.div`
  width: 90%;
  line-height: 1.2;
  color: ${({ theme }) => theme.darkGray};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StTimeStamp = styled.div`
  color: ${({ theme }) => theme.darkGray};
`;

export default Room;
