import React, { useEffect, useState } from 'react';
import NewPost from '../../Component/New/NewPost';
import {
  firebaseAuth,
  firestore,
  firebaseStorage,
} from '../../services/firebase';

const NewPostContainer = ({ closeModal, setProgress }) => {
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
    <NewPost
      closeModal={closeModal}
      createPost={createPost}
      addImage={addImage}
      addText={addText}
      addLocation={addLocation}
      removeLocation={removeLocation}
      handleToggle={handleToggle}
      prev={prev}
      setSubLocation={setSubLocation}
      autoCompleteState={autoCompleteState}
      setLocation={setLocation}
      setAutoCompleteState={setAutoCompleteState}
      images={images}
      text={text}
      subLocation={subLocation}
      isPossibleComment={isPossibleComment}
    />
  );
};

export default NewPostContainer;
