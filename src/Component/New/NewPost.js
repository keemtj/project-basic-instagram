import React from 'react';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import ModalPortal from '../../ModalPortal';

const NewPost = ({ closeModal }) => {
  const history = useHistory();
  const images = ['images/default_profile.png', 'images/default_profile.png'];
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
          <StImagePreview>
            {(images || []).map((image, index) => (
              <img key={index} src={image} alt="image" />
            ))}
          </StImagePreview>
          <StTextarea
            placeholder="문구 입력..."
            value={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid veritatis atque suscipit. Voluptas voluptatem, debitis itaque dolores velit deleniti consequatur alias reprehenderit repudiandae sit? Asperiores molestiae voluptatibus modi tempora. Dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid veritatis atque suscipit. Voluptas voluptatem, debitis itaque dolores velit deleniti consequatur alias reprehenderit repudiandae sit? Asperiores molestiae voluptatibus modi tempora. Dolorem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid veritatis atque suscipit. Voluptas voluptatem, debitis itaque dolores velit deleniti consequatur alias reprehenderit repudiandae sit? Asperiores molestiae voluptatibus modi tempora. Dolorem.'
            }
            readOnly={false}
          />
          {/* 지도 api, googlemaps? kakaomaps? navermaps? */}
          <StLocation>
            <div>위치 추가 버튼</div>
            <div>[강남구 역삼동]</div>
          </StLocation>
          <StFooter>
            <StButton onClick={closeModal}>취소</StButton>
            {'\n'}
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
  background: rgba(0, 0, 0, 0.95);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StNewPostBox = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 4px;
  width: 50rem;
  height: auto;
`;

const StHeader = styled.header`
  ${baseStyle}
`;

const StUpload = styled.div`
  ${baseStyle}
`;
const StImagePreview = styled.div`
  ${baseStyle}
  & > img + img {
    margin-left: 1rem;
  }
`;

const StTextarea = styled.textarea`
  ${baseStyle}
  border: none;
  resize: none;
  height: 20rem;
`;

const StLocation = styled.div`
  ${baseStyle}
`;

const StFooter = styled.footer`
  ${baseStyle}
  border-bottom: none;
`;

const StButton = styled.button`
  /* input에 채워져있을 때 */
  /* background: #0095f6; */
  background: ${({ theme }) => theme.inactiveBlue};
  width: 10rem;
  height: 3rem;
  border-radius: 3px;
  margin-top: 1.5rem;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
`;

export default NewPost;
