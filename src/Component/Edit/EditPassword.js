import React from 'react';
import styled, { css } from 'styled-components';

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

  const onEditPasswordSubmit = e => {
    e.preventDefault();
    console.log('비밀번호 변경사항 저장!');
  };

  return (
    <StEditPasswordWrapper>
      <StEditPasswordImage>
        <StAside>
          <StImage src={'/images/default_Profile.png'} />
        </StAside>
        <StPasswordImageBox>
          <StDisplayName>admin</StDisplayName>
        </StPasswordImageBox>
      </StEditPasswordImage>
      <StEditPasswordForm onSubmit={onEditPasswordSubmit}>
        {inputList.map(({ id, text }, index) => (
          <StEditPasswordFormBlock key={index}>
            <StEditPasswordFormAside>
              <StEditPasswordFormLabel htmlFor={id}>
                {text}
              </StEditPasswordFormLabel>
            </StEditPasswordFormAside>
            <StEditPasswordFormDiv>
              <StEditPasswordFormInput
                type="password"
                id={id}
                autoComplete="off"
                onKeyPress={handleKeyPress}
              />
            </StEditPasswordFormDiv>
          </StEditPasswordFormBlock>
        ))}
        <StEditPasswordFormBlock>
          <StEditPasswordFormAside />
          <StEditPasswordFormDiv>
            <StSubmitButton type="submit">비밀번호 변경</StSubmitButton>
          </StEditPasswordFormDiv>
        </StEditPasswordFormBlock>
      </StEditPasswordForm>
    </StEditPasswordWrapper>
  );
};

const StEditPasswordWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

// NOTE 프로필 이미지 styled-component
const StEditPasswordImage = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 3rem;
  width: 100%;
`;

const StAside = styled.aside`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-right: 3rem;
  width: 25rem;
  height: 5.5rem;
`;

const StImage = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  object-fit: cover;
  border: none;
  border-radius: 50%;
`;

const StPasswordImageBox = styled.div`
  width: 100%;
  height: 5.5rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
`;

const StDisplayName = styled.h2`
  font-size: 2.2rem;
`;

// NOTE 데이터 변경 styled-component
const StEditPasswordForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

const StEditPasswordFormBlock = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  /* margin-top: 1rem; */
`;

const StEditPasswordFormAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 3rem;
  width: 25rem;
  height: 5.5rem;
`;

const StEditPasswordFormLabel = styled.label`
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

const StEditPasswordFormDiv = styled.div`
  width: 100%;
  height: auto;
  min-height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StEditPasswordFormInput = styled.input`
  width: 70%;
  height: 3.5rem;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5px;
  background: ${({ theme }) => theme.gray2};
  padding: 0rem 1rem;
  color: ${({ theme }) => theme.black};
  font-size: 1.6rem;
  &:focus {
    background: none;
  }
`;

const StSubmitButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: fit-content;
  background: ${({ theme }) => theme.activeBlue};
  color: ${({ theme }) => theme.white};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
`;

export default EditPassword;
