import React from 'react';
import styled, { css } from 'styled-components';

// --> styled-components renaming
const EditPassword = () => {
  const inputList = [
    { id: 'prevPassword', text: '이전 비밀번호' },
    { id: 'newPassword', text: '새 비밀번호' },
    { id: 'checkNewPassword', text: '새 비밀번호 확인' },
  ];

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const onEditProfileSubmit = e => {
    e.preventDefault();
    console.log('비밀번호 변경사항 저장!');
  };

  return (
    <StEditProfileWrapper>
      <StEditProfileForm onSubmit={onEditProfileSubmit}>
        {inputList.map(({ id, text }, index) => (
          <StEditProfileFormBlock key={index}>
            <StEditProfileFormAside>
              <StEditProfileFormLabel htmlFor={id}>
                {text}
              </StEditProfileFormLabel>
            </StEditProfileFormAside>
            <StEditProfileFormDiv>
              <StEditProfileFormInput
                type="text"
                id={id}
                placeholder={id === 'displayName' ? 'admin' : text}
                autoComplete="off"
                onKeyPress={handleKeyPress}
              />
            </StEditProfileFormDiv>
          </StEditProfileFormBlock>
        ))}
      </StEditProfileForm>
    </StEditProfileWrapper>
  );
};

const StEditProfileWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const StEditProfileForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

const StEditProfileFormBlock = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin-top: 1rem;
`;

const StEditProfileFormAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 3rem;
  width: 25rem;
  height: 5.5rem;
`;

const StEditProfileFormLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.6rem;
  font-weight: 600;
  ${({ htmlFor }) =>
    htmlFor === 'presentation' &&
    css`
      margin-top: -1rem;
    `}
`;

const StEditProfileFormDiv = styled.div`
  width: 100%;
  height: auto;
  min-height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StEditProfileFormInput = styled.input`
  width: 70%;
  height: 3.5rem;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5px;
  padding: 0rem 1rem;
  color: ${({ theme }) => theme.black};
  font-size: 1.6rem;
  &::placeholder {
    color: ${({ theme, id }) =>
      id === 'displayName' ? theme.black : theme.darkGray};
    font-size: 1.6rem;
    font-weight: 300;
  }
`;
// --> styled-components renaming

export default EditPassword;
