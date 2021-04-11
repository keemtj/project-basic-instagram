import React from 'react';
import styled from 'styled-components';

const Textarea = ({ text, addText }) => {
  return (
    <>
      <StTextareaTitle>문구 입력</StTextareaTitle>
      <StTextarea
        placeholder="문구를 입력하세요."
        value={text}
        onChange={addText}
      />
    </>
  );
};

const StTextareaTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const StTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  padding: 0rem;
  border: none;
  resize: none;
  outline: none;
  color: ${({ theme }) => theme.black};
  font-family: inherit;
  font-size: 1.3rem;
`;

export default Textarea;
