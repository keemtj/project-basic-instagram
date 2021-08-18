import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Spinner8 } from '@styled-icons/icomoon/Spinner8';
import { CheckCircle } from '@styled-icons/fa-regular/CheckCircle';

const Uploading = ({ uploadState }) => {
  return (
    <StUploading>
      <StCheckBlock>
        {uploadState === 'running' && (
          <>
            <StSpinner uploadState={uploadState} />
            <StText />
          </>
        )}
        {uploadState === 'success' && (
          <>
            <StCheck />
            <StText>게시물이 업로드되었습니다</StText>
          </>
        )}
      </StCheckBlock>
    </StUploading>
  );
};

const StUploading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55.5rem;
`;

const StCheckBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
`;

const StText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  font-size: 2rem;
  font-weight: 200;
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StSpinner = styled(Spinner8)`
  width: 7rem;
  color: ${({ theme }) => theme.gray};
  animation: ${({ uploadState }) =>
    uploadState === 'running' &&
    css`
      ${rotate} 1s linear infinite;
    `};
`;

const StCheck = styled(CheckCircle)`
  width: 7rem;
  color: ${({ theme }) => theme.activeBlue};
`;

export default Uploading;
