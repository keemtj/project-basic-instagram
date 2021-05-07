import React from 'react';
import styled, { css } from 'styled-components';

const EditProfile = () => {
  // Event
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const onEditProfileSubmit = e => {
    e.preventDefault();
    console.log('프로필 변경사항 저장!');
  };

  const currentDisplayName = 'admin';
  const inputList = [
    { id: 'username', text: '이름' },
    {
      advice:
        '사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.',
      position: 'down',
    },
    { id: 'displayName', text: '사용자 이름' },
    {
      advice: `대부분의 경우 14일 이내에 사용자 이름을 다시 ${currentDisplayName}(으)로 변경할 수 있습니다.`,
      position: 'down',
    },
    {
      advice:
        '비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인 정보를 입력하세요. 공개 프로필에는 포함되지 않습니다.',
      position: 'up',
      advice2: '개인정보',
    },
    { sid: 'email', text: '이메일' },
    { id: 'phone', text: '전화번호' },
  ];

  return (
    <StEditProfileWrapper>
      <StEditProfileImage>
        <StAside>
          <StLabel htmlFor="upload">
            <StImage src={'/images/default_profile2.jpg'} />
          </StLabel>
        </StAside>
        <StProfileImageBox>
          <StDisplayName>admin</StDisplayName>
          <StProfileImageButton htmlFor="upload">
            프로필 사진 바꾸기
          </StProfileImageButton>
          <input
            type="file"
            id="upload"
            accept="image/jpeg,  image/png, image/jpg"
            hidden
          />
        </StProfileImageBox>
      </StEditProfileImage>
      <StEditProfileForm onSubmit={onEditProfileSubmit}>
        {inputList.map(({ id, text, advice, advice2, position }, index) => (
          <StEditProfileFormBlock key={index}>
            <StEditProfileFormAside>
              {advice ? (
                <div />
              ) : (
                <StEditProfileFormLabel htmlFor={id}>
                  {text}
                </StEditProfileFormLabel>
              )}
            </StEditProfileFormAside>
            <StEditProfileFormDiv>
              {advice ? (
                <StEditProfileAdvice position={position}>
                  {advice2 && (
                    <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                      {advice2}
                    </div>
                  )}
                  <div>{advice}</div>
                </StEditProfileAdvice>
              ) : (
                <StEditProfileFormInput
                  type="text"
                  id={id}
                  placeholder={id === 'displayName' ? 'admin' : text}
                  autoComplete="off"
                  onKeyPress={handleKeyPress}
                />
              )}
            </StEditProfileFormDiv>
          </StEditProfileFormBlock>
        ))}
        <StEditProfileFormBlock>
          <StEditProfileFormAside>
            <StEditProfileFormLabel htmlFor="presentation">
              소개
            </StEditProfileFormLabel>
          </StEditProfileFormAside>
          <StEditProfileFormDiv>
            <StEditProfileFormTextarea type="text" id="presentation" />
          </StEditProfileFormDiv>
        </StEditProfileFormBlock>
        <StEditProfileFormBlock>
          <StEditProfileFormAside />
          <StEditProfileFormDiv>
            <StSubmitButton type="submit">제출</StSubmitButton>
          </StEditProfileFormDiv>
        </StEditProfileFormBlock>
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
  overflow: scroll;
`;

// NOTE 프로필 이미지 변경 styled-component
const StEditProfileImage = styled.div`
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

const StLabel = styled.label`
  width: 5.5rem;
  height: 5.5rem;
  cursor: pointer;
`;

const StImage = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  object-fit: cover;
  border: none;
  border-radius: 50%;
`;

const StProfileImageBox = styled.div`
  width: 100%;
  height: 5.5rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
`;

const StDisplayName = styled.h2`
  font-size: 2rem;
`;

const StProfileImageButton = styled.label`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.activeBlue};
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
`;

// NOTE 데이터 변경 styled-component
const StEditProfileForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

// common
const StEditProfileFormBlock = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`;

const StEditProfileFormAside = styled.aside`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  vertical-align: top;
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
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
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

const StEditProfileAdvice = styled.div`
  width: 70%;
  height: fit-content;
  font-size: 1.2rem;
  margin: ${({ position }) =>
    position === 'down' ? '-3rem 0rem 0rem' : '1.5rem 0rem 0rem'};
  color: ${({ theme }) => theme.darkGray};
  line-height: 1.2;
`;

const StEditProfileFormTextarea = styled.textarea`
  width: 70%;
  height: 7rem;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 5px;
  padding: 1rem;
  margin-top: 1rem;
  font-family: inherit;
  color: ${({ theme }) => theme.black};
  font-size: 1.6rem;
  resize: vertical;
`;

const StSubmitButton = styled.button`
  border: none;
  border-radius: 4px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  width: fit-content;
  background: ${({ theme }) => theme.activeBlue};
  color: ${({ theme }) => theme.white};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
`;

export default EditProfile;
