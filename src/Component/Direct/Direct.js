import React from 'react';
import styled from 'styled-components';
import DirectItem from './DirectItem';
import { NewMessage } from '@styled-icons/entypo/NewMessage';
import DirectRouter from '../../Router/directRouter';
import { Link } from 'react-router-dom';

const Direct = () => {
  const directs = [1, 2, 3, 4];

  return (
    <StDirect>
      <StDirectBox>
        <StInboxSection>
          <StInboxHeader>
            <StUsername>username</StUsername>
            <StNewDirectButton>
              <NewMessage />
            </StNewDirectButton>
          </StInboxHeader>
          <StInbox>
            {directs.map((dmId, index) => (
              <StLink to={`/direct/${dmId}`} key={index}>
                <DirectItem />
              </StLink>
            ))}
          </StInbox>
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
  background: #fafafa;
`;

const StDirectBox = styled.div`
  background: white;
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 4px;
  width: 95rem;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const StInboxSection = styled.section`
  width: 40%;
  height: 100%;
  border-right: 1px solid rgba(219, 219, 219, 1);
`;

const StInboxHeader = styled.header`
  height: 5.5rem;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 1rem;
`;

const StUsername = styled.h2`
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

const StInbox = styled.ul`
  padding: 0.5rem 0rem;
  height: calc(100% - 5.5rem);
  overflow: scroll;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const StChatSection = styled.section`
  width: 60%;
  height: 100%;
`;

export default Direct;
