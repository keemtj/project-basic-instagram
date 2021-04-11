import React, {
  // useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router';
import PostModalPortal from '../../PostModalPortal';
import { Upload } from '@styled-icons/boxicons-regular/Upload';
import { Location } from '@styled-icons/entypo/Location';
import { Close } from '@styled-icons/evaicons-solid/Close';
import {
  firebaseAuth,
  firestore,
  firebaseStorage,
} from '../../services/firebase';
import SearchPlace from './SearchPlace';

const NewPost = ({ closeModal }) => {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [isPossibleComment, setIsPossibleComment] = useState(false);
  const [text, setText] = useState('');
  const history = useHistory();

  // create post
  const createPost = async () => {
    // 0. get uid of currentUser
    const { uid } = firebaseAuth.currentUser;
    // 1. get filenames
    const filenames = images.map(image => image.file.name);
    // 2. get size of posts data
    const allDocs = await firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .get();
    const size = allDocs.size;
    console.log('sizeeeeeeeeeee', size);
    // 3. create post
    const date = Date.now();
    await firestore
      .collection('posts') // collection
      .doc(uid)
      .collection('my-posts') // subcollection
      .doc(`${date}`)
      .set({
        images: filenames,
        date,
        text,
        location,
        isPossibleComment,
        heartCount: 0,
        bookmarkCount: 0,
        comments: [],
      });

    // 4. upload images to storage
    uploadImagesToStorage(uid, size);
    console.log('success upload to storage');

    // 4. close modal
    // setImages([]);
    // setLocation(null);
    // setIsPossibleComment(false);
    // setText('');
    closeModal();
    console.log('새 게시물이 작성되었습니다');
    history.push('/');
  };

  // upload images to firebase storage
  const uploadImagesToStorage = (uid, size) => {
    images.forEach(image => {
      firebaseStorage.ref(`/${uid}/${size}/${image.file.name}`).put(image.file);
    });
    console.log('upload images to storage');
  };

  // Add images
  const addImage = ({ target }) => {
    let files = [];
    Array.from(target.files).forEach(file => {
      const url = URL.createObjectURL(file);
      files.push({ file, url });
    });
    setImages([...images, ...files]);
  };

  // Textareas
  const addText = ({ target }) => {
    setText(target.value);
  };
  // Add location
  const addLocation = () => {
    console.log('place search input');
    setLocation('강남구 역삼동');
  };
  // Remove location
  const removeLocation = () => {
    setLocation(false);
  };

  // Commnet setting toggle
  const handleToggle = () => {
    setIsPossibleComment(!isPossibleComment);
  };

  return (
    <PostModalPortal>
      <StModal>
        <StNewPostBox>
          <StHeader>
            <h2>새 게시물</h2>
          </StHeader>
          <StUploadSection>
            <div>이미지 업로드</div>
            <label htmlFor="upload" onChange={addImage}>
              <StUploadIcon width={2} height={2} />
              <input
                id="upload"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                multiple
                hidden
              />
            </label>
          </StUploadSection>
          <StImagePreviewSection>
            {images.length ? (
              <StImagePreview>
                {images.map((image, index) => {
                  return (
                    <StImage
                      key={index}
                      src={image.url}
                      alt={image.file.name}
                    />
                  );
                })}
              </StImagePreview>
            ) : (
              <div>
                <StImagePreviewLabel htmlFor="upload">
                  <StIconWrapper>
                    <StUploadIcon width={3} height={3} />
                  </StIconWrapper>
                  <StText>업로드된 사진이 여기에 표시됩니다.</StText>
                  <input
                    id="upload"
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    multiple
                    hidden
                  />
                </StImagePreviewLabel>
              </div>
            )}
          </StImagePreviewSection>
          <StTextareaSection>
            <StTextareaTitle>문구 입력</StTextareaTitle>
            <StTextarea
              placeholder="문구를 입력하세요."
              value={text}
              onChange={addText}
            />
          </StTextareaSection>
          <StLocationSection>
            <div>위치 추가</div>
            {/* 지도 api, googlemaps? kakaomaps? navermaps? */}
            {/* geolocation api */}
            {location ? (
              <StLocation>
                <div>{location}</div>
                <StRemoveLocation type="button" onClick={removeLocation}>
                  <Close />
                </StRemoveLocation>
              </StLocation>
            ) : (
              <StAddLocation type="button" onClick={addLocation}>
                <StLocationIcon />
              </StAddLocation>
            )}
          </StLocationSection>
          <StCommentSettingSection>
            <StCommentTitle>댓글 기능 해제</StCommentTitle>
            <StToggle checked={isPossibleComment}>
              <input
                type="checkbox"
                checked={isPossibleComment}
                onChange={handleToggle}
                hidden
              />
              <StCircle checked={isPossibleComment} />
            </StToggle>
          </StCommentSettingSection>
          <SearchPlace />
          <StFooter>
            <StNewPostButton onClick={closeModal}>취소</StNewPostButton>
            <StNewPostButton onClick={createPost}>공유</StNewPostButton>
          </StFooter>
        </StNewPostBox>
      </StModal>
    </PostModalPortal>
  );
};

const baseStyle = css`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.gray8};
  padding: 2rem 2rem;
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
  border-radius: 5px;
  width: 50rem;
  height: auto;
  transform: translateY(0%);
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

const StUploadSection = styled.section`
  ${baseStyle}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const StIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
`;

const StUploadIcon = styled(Upload)`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  font-weight: bolder;
  cursor: pointer;
`;

const StImagePreviewSection = styled.section`
  ${baseStyle}
`;

const StImagePreview = styled.div`
  display: flex;
  overflow: auto;
  & > img + img {
    margin-left: 1rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StImagePreviewLabel = styled.label`
  display: flex;
  background: ${({ theme }) => theme.gray2};
  width: 100%;
  height: 25rem;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StImage = styled.img`
  width: 25rem;
  height: 25rem;
`;

const StText = styled.div`
  margin-top: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

const StTextareaSection = styled.section`
  ${baseStyle}
  width: 100%;
  height: auto;
`;

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

const StLocationSection = styled.section`
  ${baseStyle}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const StLocationIcon = styled(Location)`
  width: 1.6rem;
  height: 1.6rem;
`;

const StLocation = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 400;
`;

const StAddLocation = styled.button`
  cursor: pointer;
  outline: none;
`;

const StRemoveLocation = styled.button`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  outline: none;
`;

const StFooter = styled.footer`
  ${baseStyle}
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.5rem;
  position: absolute;
  top: 0;
`;

const StNewPostButton = styled.button`
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

const StCommentSettingSection = styled.section`
  ${baseStyle}
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StCommentTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const StToggle = styled.label`
  display: flex;
  align-items: center;
  border-radius: 2rem;
  width: 3.6rem;
  height: 2rem;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease;
  background: ${({ checked, theme }) =>
    checked ? theme.activeBlue : theme.gray5};
`;

const StCircle = styled.span`
  position: absolute;
  left: 0.2rem;
  background: white;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  transition: all 0.4s ease;
  transform: ${({ checked }) => checked && 'translate3d(1.6rem, 0, 0)'};
`;

// export default React.memo(NewPost);
export default NewPost;
