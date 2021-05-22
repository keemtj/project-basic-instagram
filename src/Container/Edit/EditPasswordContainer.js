import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditPassword from '../../Component/Edit/EditPassword';
import { firebaseAuth } from '../../services/firebase';

const EditPasswordContainer = () => {
  const { displayName, photoURL } = useSelector(state => state.user.user);
  const [input, setInput] = React.useState({
    newPassword: '',
    checkNewPassword: '',
    error: null,
  });

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const getASecureRandomPassword = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const onEditPasswordSubmit = e => {
    e.preventDefault();
    if (input.newPassword !== input.checkNewPassword) {
      setInput({
        ...input,
        error: '두 비밀번호가 일치하는지 확인하세요.',
      });
      console.log('두 비밀번호가 일치하는지 확인하세요.');
    } else {
      try {
        const user = firebaseAuth.currentUser;
        const newPassword = input.newPassword;
        user.updatePassword(newPassword);
        setInput({ newPassword: '', checkNewPassword: '', error: null });
        // reload대신에 토스트 팝업
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        setInput({ ...input, error });
      }
    }
  };

  const inputList = [
    { id: 'newPassword', text: '새 비밀번호', value: `${input.newPassword}` },
    {
      id: 'checkNewPassword',
      text: '새 비밀번호 확인',
      value: `${input.checkNewPassword}`,
    },
  ];

  useEffect(() => {
    document.title = '비밀번호 변경 • Instagram';
  }, []);

  return (
    <EditPassword
      inputList={inputList}
      displayName={displayName}
      photoURL={photoURL}
      handleKeyPress={handleKeyPress}
      getASecureRandomPassword={getASecureRandomPassword}
      onEditPasswordSubmit={onEditPasswordSubmit}
    />
  );
};

export default EditPasswordContainer;
