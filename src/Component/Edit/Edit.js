import React from 'react';
import styled from 'styled-components';
import EditNavigation from './EditNavigation';
import EditRouter from '../../Router/EditRouter';

const Edit = () => {
  return (
    <>
      <StEditWrapper>
        <StEdit>
          <StEditNavigationSection>
            <EditNavigation />
          </StEditNavigationSection>
          <StEditSection>
            <EditRouter />
          </StEditSection>
        </StEdit>
      </StEditWrapper>
    </>
  );
};

const StEditWrapper = styled.div`
  margin-top: 5.5rem;
  flex-grow: 1;
  padding: 2rem;
  height: calc(100vh - 17.5rem);
  max-height: calc(100vh - 17.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
`;

const StEdit = styled.main`
  background: white;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 3px;
  width: 95rem;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
`;

const StEditNavigationSection = styled.section`
  width: 33rem;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.gray};
`;

const StEditSection = styled.section`
  width: 100%;
  height: 100%;
`;

export default Edit;
