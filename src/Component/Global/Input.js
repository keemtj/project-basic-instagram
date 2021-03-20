import React from 'react';
import styled from 'styled-components';

const Input = ({ type, placeholder, value, onChange, ...rest }) => {
  return (
    <StInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

const StInput = styled.input`
  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 3px;
  background-color: #fafafa;
  width: 27rem;
  height: 3.8rem;
  padding: 0.5rem 1rem;
  & + & {
    margin-top: 0.7rem;
  }
`;

export default Input;
