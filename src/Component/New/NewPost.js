import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Upload } from '@styled-icons/boxicons-regular/Upload';
import { firebase, firestore, firebaseStorage } from '../../services/firebase';
import { generatedId, updatePostsData } from '../../services/firestore';
import { closePopup } from '../../Modules/popup';
import { updatePosts } from '../../Modules/posts';
import NewPostPortal from '../../NewPostPortal';
import UploadImageInput from './UploadImageInput';
import ImagePreview from './ImagePreview';
import Textarea from './Textarea';
import CommentSetting from './CommentSetting';
import PlaceSearch from './PlaceSearch';
import PlaceAutoComplete from './PlaceAutoComplete';
import useToast from '../../Hooks/useToast';

const NewPost = ({ setProgress }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user.currentUser);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const [subLocation, setSubLocation] = useState('');
  const [autoCompleteState, setAutoCompleteState] = useState(false);
  const [isPossibleComment, setIsPossibleComment] = useState(false);
  const [text, setText] = useState('');
  const [toast] = useToast();
  const closeModal = () => {
    console.log('close new post!');
    dispatch(closePopup('newPostModal'));
  };

  // FIXME: create new post
  const createPost = () => {
    const postId = generatedId();
    addPostDataToFirestore(uid, postId);
    uploadImagesToStorage(uid, postId, images);
    closeModal();
  };

  // add post data to firestore
  const addPostDataToFirestore = (uid, postId) => {
    firestore
      .collection('posts')
      .doc(uid)
      .collection('my-posts')
      .doc(postId)
      .set({
        id: postId,
        uid,
        date: Date.now(),
        text,
        location,
        subLocation,
        isPossibleComment,
        heartCount: 0,
        bookmarkCount: 0,
        comments: [],
        hearts: [],
        bookmarks: [],
        imagesArray: [],
      });
  };

  // upload images to firebase storage
  const uploadImagesToStorage = (uid, postId, images) => {
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
        async () => {
          const urlResult = await uploadTask.snapshot.ref.getDownloadURL();
          const url = await Promise.resolve(urlResult);
          const metadataResult = await uploadTask.snapshot.ref.getMetadata();
          const { name, timeCreated } = await Promise.resolve(metadataResult);
          await firestore
            .collection('posts')
            .doc(uid)
            .collection('my-posts')
            .doc(postId)
            .update({
              imagesArray: firebase.firestore.FieldValue.arrayUnion({
                url,
                name,
                timeCreated,
              }),
            });
          console.log('TASK STATE:', uploadTask.snapshot.state);
          if (uploadTask.snapshot.state === 'success') {
            await updatePostsData(dispatch, updatePosts);
            setProgress(0);
            toast('새 게시물이 작성되었습니다.');
          }
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
    return () => {
      // 이전 title로 변경
      document.title = title;
    };
  }, []);
  return (
    <NewPostPortal>
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
              <StNewPostButton name="prev" onClick={prev}>
                뒤로
              </StNewPostButton>
            ) : (
              <>
                <StNewPostButton
                  type="button"
                  name={'cancel'}
                  onClick={closeModal}
                >
                  취소
                </StNewPostButton>
                <StNewPostButton
                  type="button"
                  onClick={images.length ? createPost : undefined}
                  isExist={images.length}
                >
                  공유
                </StNewPostButton>
              </>
            )}
          </StFooter>
        </StNewPostBox>
      </StModal>
    </NewPostPortal>
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
  color: ${({ theme, isExist }) =>
    isExist ? theme.activeBlue : theme.inactiveBlue};
  color: ${({ theme, name }) => name === 'cancel' && theme.activeBlue};
  color: ${({ theme, name }) => name === 'prev' && theme.activeBlue};
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
