import React from 'react';
import styled from 'styled-components';
import DirectRouter from '../../Router/DirectRouter';
import { PencilSquare } from '@styled-icons/bootstrap/PencilSquare';
import RoomContainer from '../../Container/Direct/RoomContainer';

const Direct = ({ displayName, onClickNewDirect, rooms, partners }) => {
  return (
    <StDirect>
      <StDirectBox>
        <StInboxSection>
          <StInboxHeader>
            <StDisplayName>{displayName}</StDisplayName>
            <StNewDirectButton onClick={onClickNewDirect}>
              <PencilSquare />
            </StNewDirectButton>
          </StInboxHeader>
          <StRooms>
            {rooms?.map((room, index) => {
              const partner = partners.find(user =>
                room.participant.includes(user.uid),
              );
              return (
                <RoomContainer key={index} room={room} partner={partner} />
              );
            })}
          </StRooms>
        </StInboxSection>
        <StChatSection>
          <DirectRouter />
        </StChatSection>
      </StDirectBox>
    </StDirect>
  );
};

const StDirect = styled.main`
  margin-top: 5.5rem;
  flex-grow: 1;
  padding: 2rem;
  height: calc(100vh - 5.5rem);
  max-height: calc(100vh - 5.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
`;

const StDirectBox = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 4px;
  width: 95rem;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const StInboxSection = styled.section`
  width: 40%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.gray};
`;

const StInboxHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 1rem 2rem;
  height: 6.5rem;
  min-height: 6.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
`;

const StDisplayName = styled.h2`
  flex-grow: 1;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

const StNewDirectButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  outline: none;
`;

const StRooms = styled.ul`
  width: 100%;
  height: calc(100% - 5.5rem);
  overflow: scroll;
`;

const StChatSection = styled.section`
  width: 60%;
  height: 100%;
`;

export default Direct;
