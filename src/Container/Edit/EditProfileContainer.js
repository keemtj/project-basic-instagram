import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import EditProfile from '../../Component/Edit/EditProfile';
import { firebaseStorage, firestore } from '../../services/firebase';

/**
 * FIXME: Need to fix code
 *
 * TODO: firebaseAuth check(email, password)
 * ! passowrd -> EditPasswordContainer component
 * TODO: current user data of firestore
 * TODO: current user's profile image
 *
 * NOTE default URL, preview URL, photo URL
 * @param defaultProfile '/images/default_profile.png'
 * @param previewURL preview image
 * @param photoURL changed image
 * @param file image's metadata
 * @param timeCreated -> displayName, email
 */

const initialState = {
  displayName: '',
  username: '',
  phone: '',
  email: '',
  presentation: '',
};

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_VALUE':
      return {
        displayName: action.data.displayName || '',
        username: action.data.username || '',
        phone: action.data.phone || '',
        email: action.data.email || '',
        presentation: action.data.presentation || '',
      };
    case 'SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'RESET_VALUE':
      return {
        displayName: '',
        username: '',
        phone: '',
        email: '',
        presentation: '',
      };
    default:
      return state;
  }
};

const EditProfileContainer = () => {
  const [state, dp] = useReducer(editReducer, initialState);
  const { displayName, username, phone, email, presentation } = state;
  // const [uploadState, setUploadState] = React.useState('');

  const currentUserData = useSelector(state => state.user.user);
  const {
    displayName: currentDisplayName,
    email: currentEmail,
    photoURL: currentPhotoURL,
    username: currentUsername,
    phone: currentPhone,
    presentation: currentPresentation,
    uid,
  } = currentUserData;

  const updateProfileData = async e => {
    e.preventDefault();
    await firestore
      .collection('users')
      .doc(uid)
      .update({
        displayName: displayName !== '' ? displayName : currentDisplayName,
        username: username !== '' ? username : currentUsername,
        phone: phone !== '' ? phone : currentPhone,
        email: email !== '' ? email : currentEmail,
        presentation: presentation !== '' ? presentation : currentPresentation,
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const updateProfileImage = ({ target }) => {
    [target.files].forEach(image => {
      console.log(image);
      const uploadTask = firebaseStorage.ref(`/${uid}/profile`).put(image[0]);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          console.log('Upload is ' + progress + '%');
          console.log('업로드중에 taskState:', snapshot.state);
        },
        e => console.log(e),
        async () => {
          const urlResult = await uploadTask.snapshot.ref.getDownloadURL();
          const photoURL = await Promise.resolve(urlResult);
          await firestore.collection('users').doc(uid).update({ photoURL });
          // reload대신에 토스트 dispatch('프로필이미지변경')
          // currentUserData 새로가져오기
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
      );
    });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    dp({ type: 'SET_VALUE', name, value });
  };

  const onChangePresentation = ({ target }) => {
    const { name, value } = target;
    dp({ type: 'SET_VALUE', name, value });
  };

  const inputList = [
    {
      id: 'username',
      category: '이름',
      placeholder: '이름',
      value: `${username}`,
    },
    {
      advice:
        '사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.',
      position: 'down',
    },
    {
      id: 'displayName',
      category: '사용자 이름',
      placeholder: '사용자 이름',
      value: `${displayName}`,
    },
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
    {
      id: 'email',
      category: '이메일',
      placeholder: '이메일',
      value: `${email}`,
    },
    {
      id: 'phone',
      category: '전화번호',
      placeholder: '전화번호',
      value: `${phone}`,
    },
  ];

  useEffect(() => {
    document.title = '프로필 편집 • Instagram';
    dp({ type: 'INITIAL_VALUE', data: currentUserData });
  }, [dp, currentUserData]);

  return (
    <EditProfile
      inputList={inputList}
      currentDisplayName={currentDisplayName}
      photoURL={currentPhotoURL}
      onChangeInput={onChangeInput}
      presentation={presentation}
      onChangePresentation={onChangePresentation}
      handleKeyPress={handleKeyPress}
      updateProfileData={updateProfileData}
      updateProfileImage={updateProfileImage}
    />
  );
};

export default EditProfileContainer;
