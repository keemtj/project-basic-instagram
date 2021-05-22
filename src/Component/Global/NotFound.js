import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const NotFound = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  React.useEffect(() => {
    document.title = '페이지를 찾을 수 없습니다 • Instagram';
  });

  return (
    <StNotFound>
      <StH2>죄송합니다. 페이지를 사용할 수 없습니다.</StH2>
      <StP>
        클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.{' '}
        <StGoHome onClick={goBack}>Instagram으로 돌아가기.</StGoHome>
      </StP>
    </StNotFound>
  );
};

const StNotFound = styled.div`
  margin-top: 5.5rem;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.background};
  & > h2,
  & > p {
    margin-top: 3rem;
  }
`;

const StH2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;

const StP = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
`;

const StGoHome = styled.button`
  font-size: inherit;
  font-weight: inherit;
  color: ${({ theme }) => theme.google};
  cursor: pointer;
`;
export default NotFound;
