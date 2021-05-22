import React from 'react';
import styled, { css } from 'styled-components';

const EditProfile = ({
  inputList,
  currentDisplayName,
  photoURL,
  onChangeInput,
  presentation,
  onChangePresentation,
  handleKeyPress,
  updateProfileData,
  updateProfileImage,
}) => {
  return (
    <StEditProfileWrapper>
      <StEditProfileImage>
        <StAside>
          <StLabel htmlFor="edit">
            <StImage src={photoURL} />
          </StLabel>
        </StAside>
        <StProfileImageBox>
          <StDisplayName>{currentDisplayName}</StDisplayName>
          <StProfileImageButton htmlFor="edit">
            프로필 사진 바꾸기
          </StProfileImageButton>
          <input
            id="edit"
            type="file"
            accept="image/jpeg,  image/png, image/jpg"
            onChange={updateProfileImage}
            hidden
          />
        </StProfileImageBox>
      </StEditProfileImage>
      <StEditProfileForm onSubmit={updateProfileData}>
        {inputList.map(
          (
            { id, category, placeholder, value, advice, advice2, position },
            index,
          ) => (
            <StEditProfileFormBlock key={index}>
              <StEditProfileFormAside>
                {advice ? (
                  <div />
                ) : (
                  <StEditProfileFormLabel htmlFor={id}>
                    {category}
                  </StEditProfileFormLabel>
                )}
              </StEditProfileFormAside>
              <StEditProfileFormDiv>
                {advice ? (
                  <StEditProfileAdvice position={position}>
                    {advice2 && (
                      <div
                        style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}
                      >
                        {advice2}
                      </div>
                    )}
                    <div>{advice}</div>
                  </StEditProfileAdvice>
                ) : (
                  <StEditProfileFormInput
                    type="text"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    autoComplete="off"
                    value={value}
                    onChange={onChangeInput}
                    onKeyPress={handleKeyPress}
                  />
                )}
              </StEditProfileFormDiv>
            </StEditProfileFormBlock>
          ),
        )}
        <StEditProfileFormBlock>
          <StEditProfileFormAside>
            <StEditProfileFormLabel htmlFor="presentation">
              소개
            </StEditProfileFormLabel>
          </StEditProfileFormAside>
          <StEditProfileFormDiv>
            <StEditProfileFormTextarea
              type="text"
              id="presentation"
              name="presentation"
              value={presentation}
              onChange={onChangePresentation}
              onKeyPress={handleKeyPress}
            />
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
    color: ${({ theme }) => theme.darkGray};
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
  &::placeholder {
    color: ${({ theme }) => theme.darkGray};
  }
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
