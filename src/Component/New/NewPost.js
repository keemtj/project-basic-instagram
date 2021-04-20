import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
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

const NewPost = ({ closeModal, setProgress }) => {
  const [postId, setPostId] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const [subLocation, setSubLocation] = useState('');
  const [autoCompleteState, setAutoCompleteState] = useState(false);
  const [isPossibleComment, setIsPossibleComment] = useState(false);
  const [text, setText] = useState('');

  // FIXME: create new post
  const createPost = () => {
    // Todo: get uid by currentUser
    const { uid } = firebaseAuth.currentUser;
    // Todo: get filenames by images
    const filenames = images.map(image => image.file.name);
    // Todo: add datas to firestore
    addPostDataToFirestore(uid, postId, filenames);
    // Todo: upload images to storage
    uploadImagesToStorage(uid, postId, images);
    // Todo: close modal
    console.log('새 게시물이 작성되었습니다');
    closeModal();
  };

  // add post data to firestore
  const addPostDataToFirestore = (uid, postId, filenames) => {
    firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .doc(postId)
      .set({
        images: filenames,
        date: Date.now(), // 1970~ 2021.4.1
        text,
        location,
        subLocation,
        isPossibleComment,
        heartCount: 0,
        bookmarkCount: 0,
        comments: [],
      });
  };

  // upload images to firebase storage
  const uploadImagesToStorage = (uid, postId) => {
    images.forEach(image => {
      const uploadTask = firebaseStorage
        .ref(`/${uid}/${postId}/${image.file.name}`)
        .put(image.file);
      // TaskState: "Error" | "Running" | "Success"
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          console.log('Upload is ' + progress + '%');
          console.log('업로드중에 taskState:', snapshot.state);
          setProgress(progress);
        },
        e => console.log(e),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(() => {
            console.log(
              '업로드를 완료했을 때 taskState:',
              uploadTask.snapshot.state,
            );
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          });
        },
      );
    });
  };

  // Add images
  const addImage = ({ target }) => {
    let datas = [];
    [...target.files].forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      datas.push({ file, previewUrl });
    });
    setImages([...images, ...datas]);
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

  useEffect(() => {
    const title = document.title;
    document.title = '새 게시물 작성 • Instagram';
    // Todo: generate Post id
    const generatedId = firestore.collection('posts').doc().id;
    setPostId(generatedId);
    return () => {
      // 이전 title로 변경
      document.title = title;
    };
  }, []);

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