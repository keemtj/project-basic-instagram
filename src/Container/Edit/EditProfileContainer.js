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
      toast('????????? ????????? ?????????????????????.');
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
          console.log('??????????????? taskState:', snapshot.state);
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
            toast('????????? ???????????? ?????????????????????.');
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
      category: '??????',
      placeholder: '??????',
      value: `${username}`,
    },
    {
      advice:
        '???????????? ??????, ?????? ?????? ???????????? ?????? ??? ???????????? ????????? ????????? ???????????? ???????????? ????????? ?????? ??? ????????? ???????????????.',
      position: 'down',
    },
    {
      id: 'displayName',
      category: '????????? ??????',
      placeholder: '????????? ??????',
      value: `${displayName}`,
    },
    {
      advice: `???????????? ?????? 14??? ????????? ????????? ????????? ?????? ${currentDisplayName}(???)??? ????????? ??? ????????????.`,
      position: 'down',
    },
    {
      advice:
        '??????????????? ???????????? ?????? ????????? ????????? ???????????? ???????????? ?????? ????????? ???????????????. ?????? ??????????????? ???????????? ????????????.',
      position: 'up',
      advice2: '????????????',
    },
    {
      id: 'email',
      category: '?????????',
      placeholder: '?????????',
      value: `${email}`,
    },
    {
      id: 'phone',
      category: '????????????',
      placeholder: '????????????',
      value: `${phone}`,
    },
  ];

  useEffect(() => {
    document.title = '????????? ?????? ??? Instagram';
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
