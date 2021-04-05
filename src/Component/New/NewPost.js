import React from 'react';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import ModalPortal from '../../ModalPortal';

const NewPost = ({ closeModal }) => {
  const history = useHistory();
  const images = [
    'images/default_profile.png',
    'images/default_profile.png',
    'images/default_profile.png',
    // 'images/default_profile.png',
    // 'images/default_profile.png',
    // 'images/default_profile.png',
  ];

  const uploadImage = () => {
    console.log('upload image');
  };
  console.log(uploadImage);

  const addPost = () => {
    console.log('새 게시물이 작성되었습니다');
    closeModal();
    history.push('/');
  };

  return (
    <ModalPortal>
      <StModal>
        <StNewPostBox>
          <StHeader>
            <h2>새 게시물</h2>
          </StHeader>
          <StUpload>
            <label htmlFor="upload">사진 업로드</label>
            <input
              id="upload"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              hidden
            />
          </StUpload>
          <StImagePreviewWrapper>
            <StImagePreview>
              {images?.map((image, index) => (
                <img key={index} src={image} alt="image" />
              ))}
            </StImagePreview>
          </StImagePreviewWrapper>
          <StTextarea placeholder="문구 입력..." />
          <StLocation>
            {/* 지도 api, googlemaps? kakaomaps? navermaps? */}
            {/* geolocation api */}
            <div>위치 추가 버튼</div>
            <div>[강남구 역삼동]</div>
          </StLocation>
          <StFooter>
            <StButton onClick={closeModal}>취소</StButton>
            <StButton onClick={addPost}>공유</StButton>
          </StFooter>
        </StNewPostBox>
      </StModal>
    </ModalPortal>
  );
};

const baseStyle = css`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
  padding: 2rem;
`;

const StModal = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StNewPostBox = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};
  border-radius: 4px;
  width: 50rem;
  height: auto;
  /* display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center; */
`;

const StHeader = styled.header`
  ${baseStyle}
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.5rem;
`;

const StUpload = styled.div`
  ${baseStyle}
`;

const StImagePreviewWrapper = styled.div`
  ${baseStyle}
  padding: 1rem;
`;

const StImagePreview = styled.div`
  display: flex;
  overflow: auto;
  & > img + img {
    margin-left: 1rem;
  }
`;

const StTextarea = styled.textarea`
  border: none;
  ${baseStyle}
  resize: none;
  height: 5.5rem;
  outline: none;
`;

const StLocation = styled.div`
  ${baseStyle}
`;

const StFooter = styled.footer`
  ${baseStyle}
  padding: 1rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.5rem;
  position: absolute;
  top: 0;
`;

const StButton = styled.button`
  /* input에 채워져있을 때 */
  /* background: #0095f6; */
  color: ${({ theme }) => theme.inactiveBlue};
  color: #0095f6;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  & + & {
    margin-left: 1rem;
  }
`;

export default NewPost;
