import React, {
  // useEffect,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router';
import PostModalPortal from '../../PostModalPortal';
import { Upload } from '@styled-icons/boxicons-regular/Upload';
import {
  firebaseAuth,
  firestore,
  firebaseStorage,
} from '../../services/firebase';
import UploadImageInput from './UploadImageInput';
import ImagePreview from './ImagePreview';
import Textarea from './Textarea';
import CommentSetting from './CommentSetting';
import PlaceSearch from './PlaceSearch';
import PlaceAutoComplete from './PlaceAutoComplete';

const NewPost = ({ closeModal }) => {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const [subLocation, setSubLocation] = useState('');
  const [autoCompleteState, setAutoCompleteState] = useState(false);
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
      // .doc(`${date}`)
      .doc()
      .set({
        images: filenames,
        date,
        text,
        location,
        subLocation,
        isPossibleComment,
        heartCount: 0,
        bookmarkCount: 0,
        comments: [],
      });

    // 4. get doc.id
    let idx;
    await firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .orderBy('date', 'desc')
      .limit(1)
      .get()
      .then(docs => {
        docs.forEach(doc => (idx = doc.id));
      });

    // 5. upload images to storage
    uploadImagesToStorage(uid, idx);
    console.log('success upload to storage');

    // 6. close modal
    // setImages([]);
    // setLocation(null);
    // setIsPossibleComment(false);
    // setText('');
    closeModal();
    console.log('새 게시물이 작성되었습니다');
    history.push('/');
  };

  // upload images to firebase storage
  const uploadImagesToStorage = (uid, idx) => {
    images.forEach(image => {
      firebaseStorage.ref(`/${uid}/${idx}/${image.file.name}`).put(image.file);
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
    setAutoCompleteState(true);
  };
  // Remove location
  const removeLocation = () => {
    setLocation(false);
  };

  // Commnet setting toggle
  const handleToggle = () => {
    setIsPossibleComment(!isPossibleComment);
  };

  const prev = () => {
    setAutoCompleteState(false);
  };

  return (
    <PostModalPortal>
      <StModal>
        <StNewPostBox>
          <StHeader>
            <h2>{autoCompleteState ? '장소 검색' : '새 게시물'}</h2>
          </StHeader>
          {autoCompleteState ? (
            <PlaceAutoComplete
              setLocation={setLocation}
              setSubLocation={setSubLocation}
              setAutoCompleteState={setAutoCompleteState}
            />
          ) : (
            <>
              <StUploadSection>
                <UploadImageInput addImage={addImage}>
                  <StUploadIcon width={2} height={2} />
                </UploadImageInput>
              </StUploadSection>
              <StImagePreviewSection>
                <ImagePreview images={images}>
                  <StUploadIcon width={3} height={3} />
                </ImagePreview>
              </StImagePreviewSection>
              <StTextareaSection>
                <Textarea text={text} addText={addText} />
              </StTextareaSection>
              <StLocationSection>
                <PlaceSearch
                  location={location}
                  subLocation={subLocation}
                  removeLocation={removeLocation}
                  addLocation={addLocation}
                />
              </StLocationSection>
              <StCommentSettingSection>
                <CommentSetting
                  isPossibleComment={isPossibleComment}
                  handleToggle={handleToggle}
                />
              </StCommentSettingSection>
            </>
          )}
          <StFooter>
            {autoCompleteState ? (
              <StNewPostButton onClick={prev}>뒤로</StNewPostButton>
            ) : (
              <>
                <StNewPostButton onClick={closeModal}>취소</StNewPostButton>
                <StNewPostButton onClick={createPost}>공유</StNewPostButton>
              </>
            )}
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
  min-height: 61.5rem;
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

const StUploadIcon = styled(Upload)`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  font-weight: bolder;
  cursor: pointer;
`;

const StImagePreviewSection = styled.section`
  ${baseStyle}
`;

const StTextareaSection = styled.section`
  ${baseStyle}
  width: 100%;
  height: auto;
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

export default NewPost;
