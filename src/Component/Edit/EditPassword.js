import React from 'react';
import styled, { css } from 'styled-components';
import Loading from '../Global/Loading';

const EditPassword = ({
  isChange,
  inputList,
  displayName,
  photoURL,
  handleKeyPress,
  getASecureRandomPassword,
  preventSubmit,
  onEditPasswordSubmit,
  isLoading,
  error,
}) => {
  return (
    <StEditPasswordWrapper>
      <StEditPasswordImage>
        <StAside>
          <StImage src={photoURL} />
        </StAside>
        <StPasswordImageBox>
          <StDisplayName>{displayName}</StDisplayName>
        </StPasswordImageBox>
      </StEditPasswordImage>
      <StEditPasswordForm
        onSubmit={isChange ? onEditPasswordSubmit : preventSubmit}
      >
        {inputList.map(({ id, text, placeholder, value }, index) => (
          <StEditPasswordFormBlock key={index}>
            <StEditPasswordFormAside>
              <StEditPasswordFormLabel htmlFor={id}>
                {text}
              </StEditPasswordFormLabel>
            </StEditPasswordFormAside>
            <StEditPasswordFormDiv>
              <StEditPasswordFormInput
                type="password"
                placeholder={placeholder}
                id={id}
                name={id}
                autoComplete="off"
                value={value}
                onChange={getASecureRandomPassword}
                onKeyPress={handleKeyPress}
              />
            </StEditPasswordFormDiv>
          </StEditPasswordFormBlock>
        ))}
        <StEditPasswordFormBlock>
          <StEditPasswordFormAside />
          <StEditPasswordFormDiv>
            {error && <StErrorBox>{error}</StErrorBox>}
            <StSubmitButton type="submit" isChange={isChange}>
              {isLoading ? (
                <Loading isLoading={isLoading} isSubmit />
              ) : (
                '비밀번호 변경'
              )}
            </StSubmitButton>
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
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
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
  &::placeholder {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.darkGray};
  }
`;

const StErrorBox = styled.div`
  padding: 0.5rem 0rem 1rem;
  color: ${({ theme }) => theme.heart};
  font-size: 1.4rem;
  font-weight: 500;
  word-break: keep-all;
`;

const StSubmitButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: 10.5rem;
  background: ${({ isChange, theme }) =>
    isChange ? theme.activeBlue : theme.inactiveBlue};
  color: ${({ theme }) => theme.white};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
`;

export default EditPassword;
