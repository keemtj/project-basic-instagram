import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from '../../Component/Edit/EditProfile';
import useToast from '../../Hooks/useToast';
import { currentUserData } from '../../Modules/user';
import {
  firebaseAuth,
  firebaseStorage,
  firestore,
} from '../../services/firebase';
import { updateCurrentUserData } from '../../services/firestore';

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
  const [toast] = useToast();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const [imageLoading, setImageLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const {
    displayName: currentDisplayName,
    email: currentEmail,
    photoURL: currentPhotoURL,
    username: currentUsername,
    phone: currentPhone,
    presentation: currentPresentation,
    uid,
  } = currentUser;

  const isChange = () => {
    return !(
      currentDisplayName === displayName &&
      username === currentUsername &&
      email === currentEmail &&
      phone === currentPhone &&
      presentation === currentPresentation
    );
  };

  const preventSubmit = e => e.preventDefault();
  const updateProfileData = async e => {
    e.preventDefault();
    setDataLoading(true);
    try {
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          displayName: displayName !== '' ? displayName : currentDisplayName,
          username: username !== '' ? username : currentUsername,
          phone: phone !== '' ? phone : currentPhone,
          email: email !== '' ? email : currentEmail,
          presentation:
            presentation !== '' ? presentation : currentPresentation,
        });
      await firebaseAuth.currentUser.updateEmail(
        email !== '' ? email : currentEmail,
      );
      await firestore
        .collection('follow')
        .doc(uid)
        .update({
          displayName: displayName !== '' ? displayName : currentDisplayName,
        });
      updateCurrentUserData(dispatch, currentUserData);
      toast('프로필 정보가 변경되었습니다.');
      setDataLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateProfileImage = ({ target }) => {
    [target.files].forEach(image => {
      const uploadTask = firebaseStorage.ref(`/${uid}/profile`).put(image[0]);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          console.log('Upload is ' + progress + '%');
          console.log('업로드중에 taskState:', snapshot.state);
          setImageLoading(true);
        },
        e => console.log(e),
        async () => {
          const urlResult = await uploadTask.snapshot.ref.getDownloadURL();
          const photoURL = await Promise.resolve(urlResult);
          await firestore.collection('users').doc(uid).update({ photoURL });
          if (uploadTask.snapshot.state === 'success') {
            updateCurrentUserData(dispatch, currentUserData);
            setImageLoading(false);
            toast('프로필 이미지가 변경되었습니다.');
          }
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
        '사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.',
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
    dp({ type: 'INITIAL_VALUE', data: currentUser });
  }, [dp, currentUser]);

  return (
    <EditProfile
      inputList={inputList}
      currentDisplayName={currentDisplayName}
      photoURL={currentPhotoURL}
      onChangeInput={onChangeInput}
      imageLoading={imageLoading}
      presentation={presentation}
      onChangePresentation={onChangePresentation}
      handleKeyPress={handleKeyPress}
      dataLoading={dataLoading}
      preventSubmit={preventSubmit}
      updateProfileData={updateProfileData}
      updateProfileImage={updateProfileImage}
      isChange={isChange()}
    />
  );
};

export default EditProfileContainer;
