import React from 'react';
import styled from 'styled-components';

const EditProfile = () => {
  const onEditProfile = e => {
    e.preventDefault();
    console.log('프로필 변경사항 저장!');
  };

  return (
    <StEditProfileWrapper>
      {/* <StProfileImage>
        <StProfileImageAside>
          <label htmlFor="upload">
            <StImage src={'/images/default_profile.png'} />
          </label>
        </StProfileImageAside>
        <StProfileImageBox>
          <h2>admin</h2>
          <label htmlFor="upload">프로필 사진 바꾸기</label>
          <input
            type="file"
            id="upload"
            accept="image/jpeg,  image/png, image/jpg"
            hidden
          />
        </StProfileImageBox>
      </StProfileImage> */}
      <StForm onSubmit={onEditProfile}>
        <StItemWrapper>
          <StItemLabel>
            <StLabel htmlFor="username">이름</StLabel>
          </StItemLabel>
          <StItem>
            <StInput type="text" id="username" autoComplete="off" />
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel />
          <StItem>
            사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을
            사용하여 회원님의 계정을 찾을 수 있도록 도와주세요. 이름은 14일 안에
            두 번만 변경할 수 있습니다.
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel>
            <StLabel htmlFor="displayName">사용자 이름</StLabel>
          </StItemLabel>
          <StItem>
            <StInput type="text" id="displayName" autoComplete="off" />
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel />
          <StItem>
            대부분의 경우 14일 이내에 사용자 이름을 다시 admin(으)로 변경할 수
            있습니다.
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel />
          <StItem>
            <div>개인 정보</div>
            비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인 정보를
            입력하세요. 공개 프로필에는 포함되지 않습니다.
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel>
            <StLabel htmlFor="presentation">소개</StLabel>
          </StItemLabel>
          <StItem>
            <StTextarea type="text" id="presentation" autoComplete="off" />
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel>
            <StLabel htmlFor="email">이메일</StLabel>
          </StItemLabel>
          <StItem>
            <StInput type="email" id="email" autoComplete="off" />
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel>
            <StLabel htmlFor="tel">전화 번호</StLabel>
          </StItemLabel>
          <StItem>
            <StInput type="tel" id="tel" />
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel>
            <StLabel>성별</StLabel>
          </StItemLabel>
          <StItem>
            <StRadioLabel htmlFor="man">
              남성
              <StRadioInput
                type="radio"
                id="man"
                name="gender"
                value="남성"
                checked
              />
            </StRadioLabel>
            <StRadioLabel htmlFor="woman">
              여성
              <StRadioInput
                type="radio"
                id="woman"
                name="gender"
                value="여성"
              />
            </StRadioLabel>
            <StRadioLabel htmlFor="fit">
              맞춤 성별
              <StRadioInput
                type="radio"
                id="fit"
                name="gender"
                value="선택하지 않음"
              />
            </StRadioLabel>
            <StRadioLabel htmlFor="none">
              밝히고 싶지 않음
              <StRadioInput
                type="radio"
                id="none"
                name="gender"
                value="선택하지 않음"
              />
            </StRadioLabel>
          </StItem>
        </StItemWrapper>
        <StItemWrapper>
          <StItemLabel />
          <StItem>
            <button type="submit">제출</button>
          </StItem>
        </StItemWrapper>
      </StForm>
    </StEditProfileWrapper>
  );
};

// NOTE 데이터 변경 styled-component
// NOTE 프로필 이미지 변경 styled-component
const StEditProfileWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100%;
  padding: 3rem 0rem;
`;

// const StProfileImage = styled.div`
//   border: 1px solid red;
//   display: flex;
//   flex-flow: row nowrap;
// `;

// const StProfileImageAside = styled.aside`
//   border: 1px solid orange;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   margin-right: 5rem;
//   width: 20rem;
//   height: 5rem;
// `;

// const StProfileImageBox = styled.div`
//   width: 100%;
//   flex-grow: 1;
//   height: 5rem;
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: flex-start;
//   justify-content: center;
//   border: 1px solid red;
// `;

// const StImage = styled.img`
//   width: 4rem;
//   border: none;
//   border-radius: 50%;
// `;

const StForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid red;
`;

const StItemWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StItemLabel = styled.div`
  width: 20rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const StItem = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StLabel = styled.label``;
const StInput = styled.input``;
const StTextarea = styled.textarea``;
const StRadioLabel = styled.label``;
const StRadioInput = styled.input``;

export default EditProfile;
